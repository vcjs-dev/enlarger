'use strict'
var w = Object.defineProperty
var d = Object.getOwnPropertySymbols
var b = Object.prototype.hasOwnProperty,
  C = Object.prototype.propertyIsEnumerable
var f = (i, e, t) =>
    e in i
      ? w(i, e, { enumerable: !0, configurable: !0, writable: !0, value: t })
      : (i[e] = t),
  u = (i, e) => {
    for (var t in e || (e = {})) b.call(e, t) && f(i, t, e[t])
    if (d) for (var t of d(e)) C.call(e, t) && f(i, t, e[t])
    return i
  }
var s = (i, e, t) => (f(i, typeof e != 'symbol' ? e + '' : e, t), t)
Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' })
const m = require('fourdom')
var h = ((i) => (
    (i.getContainerError = 'container element is missing.'),
    (i.getMagnifierElError = 'magnifier element is missing.'),
    (i.getEnlargerImageWrapperElError = 'enlarger main element is missing.'),
    (i.getPreviewContainerError = 'magnify container element is missing.'),
    (i.getPreviewImgElError = 'magnify img element is missing.'),
    i
  ))(h || {}),
  n = ((i) => (
    (i.enlargerContainerClassName = 'enlarger-container'),
    (i.enlargerImageWrapperClassName = 'enlarger-image'),
    (i.enlargerImageClassName = 'enlarger-image__inner'),
    (i.enlargerPreviewClassName = 'enlarger-preview'),
    (i.enlargerPreviewImageClassName = 'enlarger-preview__inner'),
    (i.enlargerMagnifierClassName = 'enlarger-image__magnifier'),
    i
  ))(n || {})
class E {
  constructor(e) {
    s(this, 'userOptions', { container: '', src: '' })
    s(this, 'options', {
      container: '',
      src: '',
      alt: '',
      width: 0,
      height: 0,
      autoSize: !1,
      magnifyImgScaleUpTimes: 2,
      magnifierColor: 'rgba(255, 255, 255, 0.2)',
      magnifierSizeRatio: 0.5,
      magnifierCursor: 'crosshair',
      magnifierBorderColor: '#bbbbbb',
      magnifierBorderWidth: '1px',
      magnifierBorderStyle: 'solid',
    })
    s(this, 'magnifierWidth', 0)
    s(this, 'magnifierHeight', 0)
    s(this, 'magnifierVisible', !1)
    s(this, 'imgNaturalWidth', 0)
    s(this, 'imgNaturalHeight', 0)
    s(this, 'magnifyImgWidthScaleUpTimes', 1)
    s(this, 'magnifyImgHeightScaleUpTimes', 1)
    s(this, 'containerEl', null)
    s(this, 'resizeObserver', null)
    ;(this.userOptions = u({}, e)),
      (this.magnifierVisibleListener =
        this.magnifierVisibleListener.bind(this)),
      (this.previewListener = this.previewListener.bind(this)),
      this.getImageNaturalSize(e.src, () => {
        this.initResizeObserver(), this.render()
      })
  }
  setOptions(e) {
    return (
      (this.userOptions = Object.assign(this.userOptions, e)),
      this.render(),
      this
    )
  }
  setWidth(e) {
    return (
      (this.userOptions = Object.assign(this.userOptions, { width: e })),
      this.render(),
      this
    )
  }
  setHeight(e) {
    return (
      (this.userOptions = Object.assign(this.userOptions, { height: e })),
      this.render(),
      this
    )
  }
  initResizeObserver() {
    ;(this.resizeObserver = new ResizeObserver((e) => {
      for (const t of e) {
        const r = t.target
        this.options.autoSize && this.setWidth(r.offsetWidth)
      }
    })),
      this.resizeObserver.observe(this.getContainer())
  }
  initOptions() {
    const e = this.userOptions
    ;(this.options = Object.assign(this.options, e)),
      (this.magnifyImgWidthScaleUpTimes =
        e != null && e.width
          ? this.imgNaturalWidth / e.width
          : this.options.magnifyImgScaleUpTimes),
      (this.options.width =
        (e == null ? void 0 : e.width) ||
        this.imgNaturalWidth / this.magnifyImgWidthScaleUpTimes),
      (this.magnifyImgHeightScaleUpTimes =
        e != null && e.height
          ? this.imgNaturalHeight / e.height
          : this.magnifyImgWidthScaleUpTimes),
      (this.options.height =
        (e == null ? void 0 : e.height) ||
        this.imgNaturalHeight / this.magnifyImgHeightScaleUpTimes),
      (this.magnifierWidth =
        this.options.width * this.options.magnifierSizeRatio),
      (this.magnifierHeight =
        this.options.width * this.options.magnifierSizeRatio)
  }
  initCSSVars() {
    const e = this.getContainer(),
      t = this.options.autoSize ? 'auto' : `${this.options.width}px`,
      r = this.options.autoSize ? 'auto' : `${this.options.height}px`
    m.css(e, {
      '--enlarger-width': t,
      '--enlarger-height': r,
      '--enlarger-magnifier-color': this.options.magnifierColor,
      '--enlarger-magnifier-width': `${this.magnifierWidth}px`,
      '--enlarger-magnifier-height': `${this.magnifierHeight}px`,
      '--enlarger-magnifier-border-width': this.options.magnifierBorderWidth,
      '--enlarger-magnifier-border-color': this.options.magnifierBorderColor,
      '--enlarger-magnifier-border-style': this.options.magnifierBorderStyle,
      '--enlarger-magnifier-cursor': this.options.magnifierCursor,
      '--enlarger-magnify-position-left': `${this.options.width + 10}px`,
      '--enlarger-magnify-width': `${
        this.magnifierWidth * this.magnifyImgWidthScaleUpTimes
      }px`,
      '--enlarger-magnify-height': `${
        this.magnifierHeight * this.magnifyImgHeightScaleUpTimes
      }px`,
      '--enlarger-magnify-img-width': `${this.imgNaturalWidth}px`,
      '--enlarger-magnify-img-height': `${this.imgNaturalHeight}px`,
    })
  }
  getImageNaturalSize(e, t) {
    const r = new Image()
    ;(r.src = e),
      (r.onload = () => {
        ;(this.imgNaturalWidth = r.naturalWidth || r.width),
          (this.imgNaturalHeight = r.naturalHeight || r.height),
          t && t()
      })
  }
  getContainer() {
    if (this.containerEl) return this.containerEl
    try {
      this.containerEl =
        typeof this.userOptions.container == 'string'
          ? document.querySelector(this.userOptions.container)
          : this.userOptions.container
    } catch (e) {
      throw Error(h.getContainerError)
    }
    return this.containerEl
  }
  getMagnifierEl() {
    const e = this.getContainer().querySelector(
      `.${n.enlargerMagnifierClassName}`,
    )
    if (!e) throw Error(h.getMagnifierElError)
    return e
  }
  getEnlargerImageWrapperEl() {
    const e = this.getContainer().querySelector(
      `.${n.enlargerImageWrapperClassName}`,
    )
    if (!e) throw Error(h.getEnlargerImageWrapperElError)
    return e
  }
  getPreviewEl() {
    const e = this.getContainer().querySelector(
      `.${n.enlargerPreviewClassName}`,
    )
    if (!e) throw Error(h.getPreviewContainerError)
    return e
  }
  getPreviewImgEl() {
    const e = this.getContainer().querySelector(
      `.${n.enlargerPreviewImageClassName}`,
    )
    if (!e) throw Error(h.getPreviewImgElError)
    return e
  }
  magnifierVisibleListener() {
    ;(this.magnifierVisible = !this.magnifierVisible),
      m.css(this.getMagnifierEl(), {
        display: this.magnifierVisible ? 'block' : 'none',
      }),
      m.css(this.getPreviewEl(), {
        display: this.magnifierVisible ? 'block' : 'none',
      })
  }
  previewListener(e) {
    const t = this.getContainer(),
      r = this.getEnlargerImageWrapperEl(),
      a = this.getMagnifierEl(),
      l = this.getPreviewImgEl(),
      v = e.pageX - t.offsetLeft,
      y = e.pageY - t.offsetTop,
      c = t.offsetWidth - a.offsetWidth,
      p = t.offsetHeight - a.offsetHeight
    let g = v - a.offsetWidth / 2,
      o = y - a.offsetHeight / 2
    g <= 0 && (g = 0),
      g >= c && (g = c),
      o < 0 && (o = 0),
      o >= p && (o = p),
      (a.style.left = g + 'px'),
      (a.style.top = o + 'px'),
      (l.style.left = (-g / r.offsetWidth) * l.offsetWidth + 'px'),
      (l.style.top = (-o / r.offsetHeight) * l.offsetHeight + 'px')
  }
  registorListeners() {
    const e = this.getEnlargerImageWrapperEl()
    this.removeListeners(),
      e.addEventListener('mouseover', this.magnifierVisibleListener),
      e.addEventListener('mouseout', this.magnifierVisibleListener),
      e.addEventListener('mousemove', this.previewListener)
  }
  removeListeners() {
    const e = this.getEnlargerImageWrapperEl()
    e.removeEventListener('mouseover', this.magnifierVisibleListener),
      e.removeEventListener('mouseout', this.magnifierVisibleListener),
      e.removeEventListener('mousemove', this.previewListener)
  }
  render() {
    this.initOptions(), this.initCSSVars()
    const e = this.getContainer()
    m.addClass(e, n.enlargerContainerClassName)
    const t = `
      <div class="${n.enlargerImageWrapperClassName}">
        <img src="${this.options.src}" alt="${this.options.alt}" class="${n.enlargerImageClassName}" />
        <div class="${n.enlargerMagnifierClassName}"></div>
      </div>
      <div class="${n.enlargerPreviewClassName}">
        <img src="${this.options.src}" alt="${this.options.alt}" class="${n.enlargerPreviewImageClassName}" />
      </div>
    `
    ;(e.innerHTML = t), this.registorListeners()
  }
  destory() {
    var e
    this.removeListeners(),
      (e = this.resizeObserver) == null || e.unobserve(this.getContainer())
  }
}
const I = (i) => new E(i)
exports.Enlarger = E
exports.createEnlarger = I
