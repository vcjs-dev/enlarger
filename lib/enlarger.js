var w = Object.defineProperty
var d = Object.getOwnPropertySymbols
var b = Object.prototype.hasOwnProperty,
  C = Object.prototype.propertyIsEnumerable
var m = (i, e, r) =>
    e in i
      ? w(i, e, { enumerable: !0, configurable: !0, writable: !0, value: r })
      : (i[e] = r),
  u = (i, e) => {
    for (var r in e || (e = {})) b.call(e, r) && m(i, r, e[r])
    if (d) for (var r of d(e)) C.call(e, r) && m(i, r, e[r])
    return i
  }
var s = (i, e, r) => (m(i, typeof e != 'symbol' ? e + '' : e, r), r)
import { css as f, addClass as y } from 'fourdom'
var h = /* @__PURE__ */ ((i) => (
    (i.getContainerError = 'container element is missing.'),
    (i.getMagnifierElError = 'magnifier element is missing.'),
    (i.getEnlargerImageWrapperElError =
      'enlarger image wrapper element is missing.'),
    (i.getPreviewContainerError = 'preview container element is missing.'),
    (i.getPreviewImgElError = 'preview <img /> element is missing.'),
    i
  ))(h || {}),
  n = /* @__PURE__ */ ((i) => (
    (i.enlargerContainerClassName = 'enlarger-container'),
    (i.enlargerImageWrapperClassName = 'enlarger-image'),
    (i.enlargerImageClassName = 'enlarger-image__inner'),
    (i.enlargerPreviewClassName = 'enlarger-preview'),
    (i.enlargerPreviewImageClassName = 'enlarger-preview__inner'),
    (i.enlargerMagnifierClassName = 'enlarger-image__magnifier'),
    i
  ))(n || {})
class I {
  constructor(e) {
    s(this, 'userOptions', {
      container: '',
      src: '',
    })
    s(this, 'options', {
      container: '',
      src: '',
      alt: '',
      width: 0,
      height: 0,
      autoSize: !1,
      magnification: 2,
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
    s(this, 'widthMagnification', 1)
    s(this, 'heightMagnification', 1)
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
      for (const r of e) {
        const t = r.target
        this.options.autoSize && this.setWidth(t.offsetWidth)
      }
    })),
      this.resizeObserver.observe(this.getContainer())
  }
  initOptions() {
    const e = this.userOptions
    ;(this.options = Object.assign(this.options, e)),
      (this.widthMagnification =
        e != null && e.width
          ? this.imgNaturalWidth / e.width
          : this.options.magnification),
      (this.options.width =
        (e == null ? void 0 : e.width) ||
        this.imgNaturalWidth / this.widthMagnification),
      (this.heightMagnification =
        e != null && e.height
          ? this.imgNaturalHeight / e.height
          : this.widthMagnification),
      (this.options.height =
        (e == null ? void 0 : e.height) ||
        this.imgNaturalHeight / this.heightMagnification),
      (this.magnifierWidth =
        this.options.width * this.options.magnifierSizeRatio),
      (this.magnifierHeight =
        this.options.width * this.options.magnifierSizeRatio)
  }
  initCSSVars() {
    const e = this.getContainer(),
      r = this.options.autoSize ? 'auto' : `${this.options.width}px`,
      t = this.options.autoSize ? 'auto' : `${this.options.height}px`
    f(e, {
      '--enlarger-width': r,
      '--enlarger-height': t,
      '--enlarger-magnifier-color': this.options.magnifierColor,
      '--enlarger-magnifier-width': `${this.magnifierWidth}px`,
      '--enlarger-magnifier-height': `${this.magnifierHeight}px`,
      '--enlarger-magnifier-border-width': this.options.magnifierBorderWidth,
      '--enlarger-magnifier-border-color': this.options.magnifierBorderColor,
      '--enlarger-magnifier-border-style': this.options.magnifierBorderStyle,
      '--enlarger-magnifier-cursor': this.options.magnifierCursor,
      '--enlarger-magnify-position-left': `${this.options.width + 10}px`,
      '--enlarger-magnify-width': `${
        this.magnifierWidth * this.widthMagnification
      }px`,
      '--enlarger-magnify-height': `${
        this.magnifierHeight * this.heightMagnification
      }px`,
      '--enlarger-magnify-img-width': `${this.imgNaturalWidth}px`,
      '--enlarger-magnify-img-height': `${this.imgNaturalHeight}px`,
    })
  }
  getImageNaturalSize(e, r) {
    const t = new Image()
    ;(t.src = e),
      (t.onload = () => {
        ;(this.imgNaturalWidth = t.naturalWidth || t.width),
          (this.imgNaturalHeight = t.naturalHeight || t.height),
          r && r()
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
      f(this.getMagnifierEl(), {
        display: this.magnifierVisible ? 'block' : 'none',
      }),
      f(this.getPreviewEl(), {
        display: this.magnifierVisible ? 'block' : 'none',
      })
  }
  previewListener(e) {
    const r = this.getContainer(),
      t = this.getEnlargerImageWrapperEl(),
      a = this.getMagnifierEl(),
      l = this.getPreviewImgEl(),
      v = e.pageX - r.offsetLeft,
      E = e.pageY - r.offsetTop,
      p = r.offsetWidth - a.offsetWidth,
      c = r.offsetHeight - a.offsetHeight
    let g = v - a.offsetWidth / 2,
      o = E - a.offsetHeight / 2
    g <= 0 && (g = 0),
      g >= p && (g = p),
      o < 0 && (o = 0),
      o >= c && (o = c),
      (a.style.left = g + 'px'),
      (a.style.top = o + 'px'),
      (l.style.left = (-g / t.offsetWidth) * l.offsetWidth + 'px'),
      (l.style.top = (-o / t.offsetHeight) * l.offsetHeight + 'px')
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
    y(e, n.enlargerContainerClassName)
    const r = `
      <div class="${n.enlargerImageWrapperClassName}">
        <img src="${this.options.src}" alt="${this.options.alt}" class="${n.enlargerImageClassName}" />
        <div class="${n.enlargerMagnifierClassName}"></div>
      </div>
      <div class="${n.enlargerPreviewClassName}">
        <img src="${this.options.src}" alt="${this.options.alt}" class="${n.enlargerPreviewImageClassName}" />
      </div>
    `
    ;(e.innerHTML = r), this.registorListeners()
  }
  destory() {
    var e
    this.removeListeners(),
      (e = this.resizeObserver) == null || e.unobserve(this.getContainer())
  }
}
const $ = (i) => new I(i)
export { I as Enlarger, $ as createEnlarger }
