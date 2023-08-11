;(function (t, i) {
  typeof exports == 'object' && typeof module != 'undefined'
    ? i(exports, require('fourdom'))
    : typeof define == 'function' && define.amd
    ? define(['exports', 'fourdom'], i)
    : ((t = typeof globalThis != 'undefined' ? globalThis : t || self),
      i((t.Enlarger = {}), t.fourdom))
})(this, function (t, i) {
  'use strict'
  var C = Object.defineProperty
  var v = Object.getOwnPropertySymbols
  var I = Object.prototype.hasOwnProperty,
    W = Object.prototype.propertyIsEnumerable
  var p = (t, i, r) =>
      i in t
        ? C(t, i, { enumerable: !0, configurable: !0, writable: !0, value: r })
        : (t[i] = r),
    E = (t, i) => {
      for (var r in i || (i = {})) I.call(i, r) && p(t, r, i[r])
      if (v) for (var r of v(i)) W.call(i, r) && p(t, r, i[r])
      return t
    }
  var g = (t, i, r) => (p(t, typeof i != 'symbol' ? i + '' : i, r), r)
  var r = ((s) => (
      (s.getContainerError = 'container element is missing.'),
      (s.getMagnifierElError = 'magnifier element is missing.'),
      (s.getEnlargerImageWrapperElError =
        'enlarger image wrapper element is missing.'),
      (s.getPreviewContainerError = 'preview container element is missing.'),
      (s.getPreviewImgElError = 'preview <img /> element is missing.'),
      s
    ))(r || {}),
    o = ((s) => (
      (s.enlargerContainerClassName = 'enlarger-container'),
      (s.enlargerImageWrapperClassName = 'enlarger-image'),
      (s.enlargerImageClassName = 'enlarger-image__inner'),
      (s.enlargerPreviewClassName = 'enlarger-preview'),
      (s.enlargerPreviewImageClassName = 'enlarger-preview__inner'),
      (s.enlargerMagnifierClassName = 'enlarger-image__magnifier'),
      s
    ))(o || {})
  class c {
    constructor(e) {
      g(this, 'userOptions', { container: '', src: '' })
      g(this, 'options', {
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
      g(this, 'magnifierWidth', 0)
      g(this, 'magnifierHeight', 0)
      g(this, 'magnifierVisible', !1)
      g(this, 'imgNaturalWidth', 0)
      g(this, 'imgNaturalHeight', 0)
      g(this, 'widthMagnification', 1)
      g(this, 'heightMagnification', 1)
      g(this, 'containerEl', null)
      g(this, 'resizeObserver', null)
      ;(this.userOptions = E({}, e)),
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
        for (const n of e) {
          const a = n.target
          this.options.autoSize && this.setWidth(a.offsetWidth)
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
        n = this.options.autoSize ? 'auto' : `${this.options.width}px`,
        a = this.options.autoSize ? 'auto' : `${this.options.height}px`
      i.css(e, {
        '--enlarger-width': n,
        '--enlarger-height': a,
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
    getImageNaturalSize(e, n) {
      const a = new Image()
      ;(a.src = e),
        (a.onload = () => {
          ;(this.imgNaturalWidth = a.naturalWidth || a.width),
            (this.imgNaturalHeight = a.naturalHeight || a.height),
            n && n()
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
        throw Error(r.getContainerError)
      }
      return this.containerEl
    }
    getMagnifierEl() {
      const e = this.getContainer().querySelector(
        `.${o.enlargerMagnifierClassName}`,
      )
      if (!e) throw Error(r.getMagnifierElError)
      return e
    }
    getEnlargerImageWrapperEl() {
      const e = this.getContainer().querySelector(
        `.${o.enlargerImageWrapperClassName}`,
      )
      if (!e) throw Error(r.getEnlargerImageWrapperElError)
      return e
    }
    getPreviewEl() {
      const e = this.getContainer().querySelector(
        `.${o.enlargerPreviewClassName}`,
      )
      if (!e) throw Error(r.getPreviewContainerError)
      return e
    }
    getPreviewImgEl() {
      const e = this.getContainer().querySelector(
        `.${o.enlargerPreviewImageClassName}`,
      )
      if (!e) throw Error(r.getPreviewImgElError)
      return e
    }
    magnifierVisibleListener() {
      ;(this.magnifierVisible = !this.magnifierVisible),
        i.css(this.getMagnifierEl(), {
          display: this.magnifierVisible ? 'block' : 'none',
        }),
        i.css(this.getPreviewEl(), {
          display: this.magnifierVisible ? 'block' : 'none',
        })
    }
    previewListener(e) {
      const n = this.getContainer(),
        a = this.getEnlargerImageWrapperEl(),
        h = this.getMagnifierEl(),
        f = this.getPreviewImgEl(),
        b = e.pageX - n.offsetLeft,
        y = e.pageY - n.offsetTop,
        d = n.offsetWidth - h.offsetWidth,
        u = n.offsetHeight - h.offsetHeight
      let l = b - h.offsetWidth / 2,
        m = y - h.offsetHeight / 2
      l <= 0 && (l = 0),
        l >= d && (l = d),
        m < 0 && (m = 0),
        m >= u && (m = u),
        (h.style.left = l + 'px'),
        (h.style.top = m + 'px'),
        (f.style.left = (-l / a.offsetWidth) * f.offsetWidth + 'px'),
        (f.style.top = (-m / a.offsetHeight) * f.offsetHeight + 'px')
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
      i.addClass(e, o.enlargerContainerClassName)
      const n = `
      <div class="${o.enlargerImageWrapperClassName}">
        <img src="${this.options.src}" alt="${this.options.alt}" class="${o.enlargerImageClassName}" />
        <div class="${o.enlargerMagnifierClassName}"></div>
      </div>
      <div class="${o.enlargerPreviewClassName}">
        <img src="${this.options.src}" alt="${this.options.alt}" class="${o.enlargerPreviewImageClassName}" />
      </div>
    `
      ;(e.innerHTML = n), this.registorListeners()
    }
    destory() {
      var e
      this.removeListeners(),
        (e = this.resizeObserver) == null || e.unobserve(this.getContainer())
    }
  }
  const w = (s) => new c(s),
    L = ''
  ;(t.Enlarger = c),
    (t.createEnlarger = w),
    Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' })
})
