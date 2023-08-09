import type {
  CreateEnlarger,
  EnlargerOptions,
  EnlargerInstance,
} from './interfaces/core'
import { ERRORS } from './ERRORS'
import { addClass, css } from 'fourdom'

class Enlarger implements EnlargerInstance {
  options: Required<EnlargerOptions> = {
    container: '',
    src: '',
    alt: '',
    width: 0,
    height: 0,
    maskColor: 'rgba(255, 255, 0, 0.4)',
    maskWidth: 0,
    maskHeight: 0,
    magnifyImgScaleUpTimes: 2,
  }

  maskVisible = false

  imgNaturalWidth = 0

  imgNaturalHeight = 0

  constructor(opts?: EnlargerOptions) {
    this.options = Object.assign(this.options, opts)

    this.maskVisibleListener = this.maskVisibleListener.bind(this)
    this.magnifyListener = this.magnifyListener.bind(this)

    this.getImageNaturalSize(this.options.src, () => {
      this.options.width =
        opts?.width ||
        this.imgNaturalWidth / this.options.magnifyImgScaleUpTimes

      this.options.height =
        opts?.height ||
        this.imgNaturalHeight / this.options.magnifyImgScaleUpTimes

      this.options.maskWidth = this.options.maskWidth || this.options.width / 2
      this.options.maskHeight =
        this.options.maskHeight || this.options.width / 2

      this.render()
    })
  }

  initCSSVars(): void {
    const containerEl = this.getContainer()
    css(containerEl, {
      '--enlarger-width': `${this.options.width}px`,
      '--enlarger-height': `${this.options.height}px`,
      '--enlarger-mask-color': this.options.maskColor,
      '--enlarger-mask-width': `${this.options.maskWidth}px`,
      '--enlarger-mask-height': `${this.options.maskHeight}px`,
      '--enlarger-magnify-width': `${
        this.options.maskWidth * this.options.magnifyImgScaleUpTimes
      }px`,
      '--enlarger-magnify-height': `${
        this.options.maskHeight * this.options.magnifyImgScaleUpTimes
      }px`,
      '--enlarger-magnify-img-width': `${this.imgNaturalWidth}px`,
      '--enlarger-magnify-img-height': `${this.imgNaturalHeight}px`,
    })
  }

  getImageNaturalSize(src: string, cb?: () => void): void {
    const img = new Image()
    img.src = src

    this.imgNaturalWidth = img.naturalWidth || img.width
    this.imgNaturalHeight = img.naturalHeight || img.height

    img.onload = () => {
      cb && cb()
    }
  }

  getContainer() {
    const el =
      typeof this.options.container === 'string'
        ? (document.querySelector(this.options.container) as HTMLElement)
        : this.options.container

    if (!el) {
      throw Error(ERRORS.getContainerError)
    }

    return el
  }

  getMaskEl() {
    const el = this.getContainer().querySelector('.enlarger-main__mask')

    if (!el) {
      throw Error('')
    }

    return el as HTMLElement
  }

  getEnlargerMainEl() {
    const el = this.getContainer().querySelector('.enlarger-main')

    if (!el) {
      throw Error('')
    }

    return el as HTMLElement
  }

  getMagnifyContainer() {
    const el = this.getContainer().querySelector('.enlarger-magnify')

    if (!el) {
      throw Error('')
    }

    return el as HTMLElement
  }

  getMagnifyImgEl() {
    const el = this.getContainer().querySelector('.enlarger-magnify__img')

    if (!el) {
      throw Error('')
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
    const containerEl = this.getContainer()

    const content = `
      <div class="enlarger-main">
        <img src="${this.options.src}" alt="${this.options.alt}" class="enlarger-main__img" />
        <div class="enlarger-main__mask"></div>
      </div>
      <div class="enlarger-magnify">
        <img src="${this.options.src}" alt="${this.options.alt}" class="enlarger-magnify__img" />
      </div>
    `

    addClass(containerEl, 'enlarger-container')

    this.initCSSVars()

    containerEl.innerHTML = content

    this.registorListeners()
  }

  destory() {
    this.removeListeners()
  }
}

const createEnlarger: CreateEnlarger = (opts) => {
  return new Enlarger(opts)
}

export { Enlarger, createEnlarger }
