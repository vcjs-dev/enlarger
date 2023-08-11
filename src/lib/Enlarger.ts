import type {
  CreateEnlarger,
  EnlargerOptions,
  EnlargerInstance,
} from './interfaces/core'
import { ERRORS } from './ERRORS'
import { CONSTANTS } from './CONSTANTS'
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
    autoSize: false,
    magnification: 2,
    magnifierColor: 'rgba(255, 255, 255, 0.2)',
    magnifierSizeRatio: 0.5,
    magnifierCursor: 'crosshair',
    magnifierBorderColor: '#bbbbbb',
    magnifierBorderWidth: '1px',
    magnifierBorderStyle: 'solid',
  }

  magnifierWidth = 0
  magnifierHeight = 0
  magnifierVisible = false
  imgNaturalWidth = 0
  imgNaturalHeight = 0

  widthMagnification = 1
  heightMagnification = 1

  containerEl: HTMLElement | null = null

  resizeObserver: ResizeObserver | null = null

  constructor(opts: EnlargerOptions) {
    this.userOptions = { ...opts }

    this.magnifierVisibleListener = this.magnifierVisibleListener.bind(this)
    this.previewListener = this.previewListener.bind(this)

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
        this.options.autoSize && this.setWidth(target.offsetWidth)
      }
    })

    this.resizeObserver.observe(this.getContainer())
  }

  initOptions() {
    const opts = this.userOptions
    this.options = Object.assign(this.options, opts)

    this.widthMagnification = opts?.width
      ? this.imgNaturalWidth / opts.width
      : this.options.magnification

    this.options.width =
      opts?.width || this.imgNaturalWidth / this.widthMagnification

    this.heightMagnification = opts?.height
      ? this.imgNaturalHeight / opts.height
      : this.widthMagnification

    this.options.height =
      opts?.height || this.imgNaturalHeight / this.heightMagnification

    this.magnifierWidth = this.options.width * this.options.magnifierSizeRatio
    this.magnifierHeight = this.options.width * this.options.magnifierSizeRatio
  }

  initCSSVars() {
    const containerEl = this.getContainer()

    const width = this.options.autoSize ? 'auto' : `${this.options.width}px`
    const height = this.options.autoSize ? 'auto' : `${this.options.height}px`

    css(containerEl, {
      '--enlarger-width': width,
      '--enlarger-height': height,
      '--enlarger-magnifier-color': this.options.magnifierColor,
      '--enlarger-magnifier-width': `${this.magnifierWidth}px`,
      '--enlarger-magnifier-height': `${this.magnifierHeight}px`,
      '--enlarger-magnifier-border-width': this.options.magnifierBorderWidth,
      '--enlarger-magnifier-border-color': this.options.magnifierBorderColor,
      '--enlarger-magnifier-border-style': this.options.magnifierBorderStyle,
      '--enlarger-magnifier-cursor': this.options.magnifierCursor,
      '--enlarger-preview-position-left': `${this.options.width + 10}px`,
      '--enlarger-preview-width': `${
        this.magnifierWidth * this.widthMagnification
      }px`,
      '--enlarger-preview-height': `${
        this.magnifierHeight * this.heightMagnification
      }px`,
      '--enlarger-preview-img-width': `${this.imgNaturalWidth}px`,
      '--enlarger-preview-img-height': `${this.imgNaturalHeight}px`,
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

  getMagnifierEl() {
    const el = this.getContainer().querySelector(
      `.${CONSTANTS.enlargerMagnifierClassName}`,
    )

    if (!el) {
      throw Error(ERRORS.getMagnifierElError)
    }

    return el as HTMLElement
  }

  getEnlargerImageWrapperEl() {
    const el = this.getContainer().querySelector(
      `.${CONSTANTS.enlargerImageWrapperClassName}`,
    )

    if (!el) {
      throw Error(ERRORS.getEnlargerImageWrapperElError)
    }

    return el as HTMLElement
  }

  getPreviewEl() {
    const el = this.getContainer().querySelector(
      `.${CONSTANTS.enlargerPreviewClassName}`,
    )

    if (!el) {
      throw Error(ERRORS.getPreviewContainerError)
    }

    return el as HTMLElement
  }

  getPreviewImgEl() {
    const el = this.getContainer().querySelector(
      `.${CONSTANTS.enlargerPreviewImageClassName}`,
    )

    if (!el) {
      throw Error(ERRORS.getPreviewImgElError)
    }

    return el as HTMLImageElement
  }

  magnifierVisibleListener() {
    this.magnifierVisible = !this.magnifierVisible

    css(this.getMagnifierEl(), {
      display: this.magnifierVisible ? 'block' : 'none',
    })

    css(this.getPreviewEl(), {
      display: this.magnifierVisible ? 'block' : 'none',
    })
  }

  previewListener(e: MouseEvent) {
    const container = this.getContainer()
    const mainImgContainer = this.getEnlargerImageWrapperEl()
    const magnifierEl = this.getMagnifierEl()
    const magnifyImgEl = this.getPreviewImgEl()

    const disX = e.pageX - container.offsetLeft
    const disY = e.pageY - container.offsetTop

    const maxX = container.offsetWidth - magnifierEl.offsetWidth
    const maxY = container.offsetHeight - magnifierEl.offsetHeight

    let x = disX - magnifierEl.offsetWidth / 2
    let y = disY - magnifierEl.offsetHeight / 2

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

    magnifierEl.style.left = x + 'px'
    magnifierEl.style.top = y + 'px'

    magnifyImgEl.style.left =
      (-x / mainImgContainer.offsetWidth) * magnifyImgEl.offsetWidth + 'px'
    magnifyImgEl.style.top =
      (-y / mainImgContainer.offsetHeight) * magnifyImgEl.offsetHeight + 'px'
  }

  registorListeners() {
    const enlargerMainEl = this.getEnlargerImageWrapperEl()

    this.removeListeners()

    enlargerMainEl.addEventListener('mouseover', this.magnifierVisibleListener)
    enlargerMainEl.addEventListener('mouseout', this.magnifierVisibleListener)
    enlargerMainEl.addEventListener('mousemove', this.previewListener)
  }

  removeListeners() {
    const enlargerMainEl = this.getEnlargerImageWrapperEl()

    enlargerMainEl.removeEventListener(
      'mouseover',
      this.magnifierVisibleListener,
    )
    enlargerMainEl.removeEventListener(
      'mouseout',
      this.magnifierVisibleListener,
    )
    enlargerMainEl.removeEventListener('mousemove', this.previewListener)
  }

  render() {
    this.initOptions()
    this.initCSSVars()

    const containerEl = this.getContainer()

    addClass(containerEl, CONSTANTS.enlargerContainerClassName)

    const content = `
      <div class="${CONSTANTS.enlargerImageWrapperClassName}">
        <img src="${this.options.src}" alt="${this.options.alt}" class="${CONSTANTS.enlargerImageClassName}" />
        <div class="${CONSTANTS.enlargerMagnifierClassName}"></div>
      </div>
      <div class="${CONSTANTS.enlargerPreviewClassName}">
        <img src="${this.options.src}" alt="${this.options.alt}" class="${CONSTANTS.enlargerPreviewImageClassName}" />
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
