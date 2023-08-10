import type {
  CreateEnlarger,
  EnlargerOptions,
  EnlargerInstance,
} from './interfaces/core'
import { ERRORS } from './ERRORS'
import { addClass, css } from 'fourdom'

class Enlarger implements EnlargerInstance {
  userOptions: EnlargerOptions = {
    container: '',
    src: '',
  }

  options: Required<EnlargerOptions> = {
    container: '',
    src: '',
    alt: '',
    width: 0,
    height: 0,
    resizeable: false,
    magnifyImgScaleUpTimes: 2,
    maskColor: 'rgba(255, 255, 255, 0.2)',
    maskTimesSmallerThanImage: 2,
    maskCursor: 'crosshair',
    maskBorderColor: '#bbbbbb',
    maskBorderWidth: '1px',
    maskBorderStyle: 'solid',
  }

  maskWidth = 0
  maskHeight = 0
  maskVisible = false
  imgNaturalWidth = 0
  imgNaturalHeight = 0

  magnifyImgWidthScaleUpTimes = 1
  magnifyImgHeightScaleUpTimes = 1

  containerEl: HTMLElement | null = null

  resizeObserver: ResizeObserver | null = null

  constructor(opts: EnlargerOptions) {
    this.userOptions = { ...opts }

    this.maskVisibleListener = this.maskVisibleListener.bind(this)
    this.magnifyListener = this.magnifyListener.bind(this)

    this.getImageNaturalSize(opts.src, () => {
      this.initResizeObserver()
      this.render()
    })
  }

  setOptions(opts: Partial<EnlargerOptions>) {
    this.userOptions = Object.assign(this.userOptions, opts)
    this.render()
    return this
  }

  setWidth(width: number) {
    this.userOptions = Object.assign(this.userOptions, { width })
    this.render()
    return this
  }

  setHeight(height: number) {
    this.userOptions = Object.assign(this.userOptions, { height })
    this.render()
    return this
  }

  initResizeObserver() {
    this.resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const target = entry.target as HTMLElement
        this.setWidth(target.offsetWidth)
      }
    })

    this.resizeObserver.observe(this.getContainer())
  }

  initOptions() {
    const opts = this.userOptions
    this.options = Object.assign(this.options, opts)

    this.magnifyImgWidthScaleUpTimes = opts?.width
      ? this.imgNaturalWidth / opts.width
      : this.options.magnifyImgScaleUpTimes

    this.options.width =
      opts?.width || this.imgNaturalWidth / this.magnifyImgWidthScaleUpTimes

    this.magnifyImgHeightScaleUpTimes = opts?.height
      ? this.imgNaturalHeight / opts.height
      : this.magnifyImgWidthScaleUpTimes

    this.options.height =
      opts?.height || this.imgNaturalHeight / this.magnifyImgHeightScaleUpTimes

    this.maskWidth = this.options.width / this.options.maskTimesSmallerThanImage
    this.maskHeight =
      this.options.width / this.options.maskTimesSmallerThanImage
  }

  initCSSVars() {
    const containerEl = this.getContainer()

    const width = this.options.resizeable ? 'auto' : `${this.options.width}px`
    const height = this.options.resizeable ? 'auto' : `${this.options.height}px`

    css(containerEl, {
      '--enlarger-width': width,
      '--enlarger-height': height,
      '--enlarger-mask-color': this.options.maskColor,
      '--enlarger-mask-width': `${this.maskWidth}px`,
      '--enlarger-mask-height': `${this.maskHeight}px`,
      '--enlarger-mask-border-width': this.options.maskBorderWidth,
      '--enlarger-mask-border-color': this.options.maskBorderColor,
      '--enlarger-mask-border-style': this.options.maskBorderStyle,
      '--enlarger-mask-cursor': this.options.maskCursor,
      '--enlarger-magnify-position-left': `${this.options.width + 10}px`,
      '--enlarger-magnify-width': `${
        this.maskWidth * this.magnifyImgWidthScaleUpTimes
      }px`,
      '--enlarger-magnify-height': `${
        this.maskHeight * this.magnifyImgHeightScaleUpTimes
      }px`,
      '--enlarger-magnify-img-width': `${this.imgNaturalWidth}px`,
      '--enlarger-magnify-img-height': `${this.imgNaturalHeight}px`,
    })
  }

  getImageNaturalSize(src: string, cb?: () => void): void {
    const img = new Image()
    img.src = src

    img.onload = () => {
      this.imgNaturalWidth = img.naturalWidth || img.width
      this.imgNaturalHeight = img.naturalHeight || img.height

      cb && cb()
    }
  }

  getContainer() {
    if (this.containerEl) return this.containerEl

    try {
      this.containerEl =
        typeof this.userOptions.container === 'string'
          ? (document.querySelector(this.userOptions.container) as HTMLElement)
          : this.userOptions.container
    } catch (err) {
      throw Error(ERRORS.getContainerError)
    }

    return this.containerEl
  }

  getMaskEl() {
    const el = this.getContainer().querySelector('.enlarger-main__mask')

    if (!el) {
      throw Error(ERRORS.getMaskElError)
    }

    return el as HTMLElement
  }

  getEnlargerMainEl() {
    const el = this.getContainer().querySelector('.enlarger-main')

    if (!el) {
      throw Error(ERRORS.getEnlargerMainElError)
    }

    return el as HTMLElement
  }

  getMagnifyContainer() {
    const el = this.getContainer().querySelector('.enlarger-magnify')

    if (!el) {
      throw Error(ERRORS.getMagnifyContainerError)
    }

    return el as HTMLElement
  }

  getMagnifyImgEl() {
    const el = this.getContainer().querySelector('.enlarger-magnify__img')

    if (!el) {
      throw Error(ERRORS.getMagnifyImgElError)
    }

    return el as HTMLImageElement
  }

  maskVisibleListener() {
    this.maskVisible = !this.maskVisible

    css(this.getMaskEl(), {
      display: this.maskVisible ? 'block' : 'none',
    })

    css(this.getMagnifyContainer(), {
      display: this.maskVisible ? 'block' : 'none',
    })
  }

  magnifyListener(e: MouseEvent) {
    const container = this.getContainer()
    const mainImgContainer = this.getEnlargerMainEl()
    const maskEl = this.getMaskEl()
    const magnifyImgEl = this.getMagnifyImgEl()

    const disX = e.pageX - container.offsetLeft
    const disY = e.pageY - container.offsetTop

    const maxX = container.offsetWidth - maskEl.offsetWidth
    const maxY = container.offsetHeight - maskEl.offsetHeight

    let x = disX - maskEl.offsetWidth / 2
    let y = disY - maskEl.offsetHeight / 2

    if (x <= 0) {
      x = 0
    }
    if (x >= maxX) {
      x = maxX
    }
    if (y < 0) {
      y = 0
    }
    if (y >= maxY) {
      y = maxY
    }

    maskEl.style.left = x + 'px'
    maskEl.style.top = y + 'px'

    magnifyImgEl.style.left =
      (-x / mainImgContainer.offsetWidth) * magnifyImgEl.offsetWidth + 'px'
    magnifyImgEl.style.top =
      (-y / mainImgContainer.offsetHeight) * magnifyImgEl.offsetHeight + 'px'
  }

  registorListeners() {
    const enlargerMainEl = this.getEnlargerMainEl()

    this.removeListeners()

    enlargerMainEl.addEventListener('mouseover', this.maskVisibleListener)
    enlargerMainEl.addEventListener('mouseout', this.maskVisibleListener)
    enlargerMainEl.addEventListener('mousemove', this.magnifyListener)
  }

  removeListeners() {
    const enlargerMainEl = this.getEnlargerMainEl()

    enlargerMainEl.removeEventListener('mouseover', this.maskVisibleListener)
    enlargerMainEl.removeEventListener('mouseout', this.maskVisibleListener)
    enlargerMainEl.removeEventListener('mousemove', this.magnifyListener)
  }

  render() {
    this.initOptions()
    this.initCSSVars()

    const containerEl = this.getContainer()

    addClass(containerEl, 'enlarger-container')

    const content = `
      <div class="enlarger-main">
        <img src="${this.options.src}" alt="${this.options.alt}" class="enlarger-main__img" />
        <div class="enlarger-main__mask"></div>
      </div>
      <div class="enlarger-magnify">
        <img src="${this.options.src}" alt="${this.options.alt}" class="enlarger-magnify__img" />
      </div>
    `

    containerEl.innerHTML = content

    this.registorListeners()
  }

  destory() {
    this.removeListeners()
    this.resizeObserver?.unobserve(this.getContainer())
  }
}

const createEnlarger: CreateEnlarger = (opts) => {
  return new Enlarger(opts)
}

export { Enlarger, createEnlarger }
