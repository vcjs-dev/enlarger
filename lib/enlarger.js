var k = Object.defineProperty;
var d = Object.getOwnPropertySymbols;
var E = Object.prototype.hasOwnProperty, b = Object.prototype.propertyIsEnumerable;
var m = (t, i, e) => i in t ? k(t, i, { enumerable: !0, configurable: !0, writable: !0, value: e }) : t[i] = e, p = (t, i) => {
  for (var e in i || (i = {}))
    E.call(i, e) && m(t, e, i[e]);
  if (d)
    for (var e of d(i))
      b.call(i, e) && m(t, e, i[e]);
  return t;
};
var r = (t, i, e) => (m(t, typeof i != "symbol" ? i + "" : i, e), e);
import { css as l, addClass as v } from "fourdom";
var h = /* @__PURE__ */ ((t) => (t.getContainerError = "container element is missing.", t.getMaskElError = "mask element is missing.", t.getEnlargerMainElError = "enlarger main element is missing.", t.getMagnifyContainerError = "magnify container element is missing.", t.getMagnifyImgElError = "magnify img element is missing.", t))(h || {});
class C {
  constructor(i) {
    r(this, "userOptions", {
      container: "",
      src: ""
    });
    r(this, "options", {
      container: "",
      src: "",
      alt: "",
      width: 0,
      height: 0,
      resizeable: !1,
      magnifyImgScaleUpTimes: 2,
      maskColor: "rgba(255, 255, 255, 0.2)",
      maskTimesSmallerThanImage: 2,
      maskCursor: "crosshair",
      maskBorderColor: "#bbbbbb",
      maskBorderWidth: "1px",
      maskBorderStyle: "solid"
    });
    r(this, "maskWidth", 0);
    r(this, "maskHeight", 0);
    r(this, "maskVisible", !1);
    r(this, "imgNaturalWidth", 0);
    r(this, "imgNaturalHeight", 0);
    r(this, "magnifyImgWidthScaleUpTimes", 1);
    r(this, "magnifyImgHeightScaleUpTimes", 1);
    r(this, "containerEl", null);
    r(this, "resizeObserver", null);
    this.userOptions = p({}, i), this.maskVisibleListener = this.maskVisibleListener.bind(this), this.magnifyListener = this.magnifyListener.bind(this), this.getImageNaturalSize(i.src, () => {
      this.initResizeObserver(), this.render();
    });
  }
  setOptions(i) {
    return this.userOptions = Object.assign(this.userOptions, i), this.render(), this;
  }
  setWidth(i) {
    return this.userOptions = Object.assign(this.userOptions, { width: i }), this.render(), this;
  }
  setHeight(i) {
    return this.userOptions = Object.assign(this.userOptions, { height: i }), this.render(), this;
  }
  initResizeObserver() {
    this.resizeObserver = new ResizeObserver((i) => {
      for (const e of i) {
        const s = e.target;
        this.setWidth(s.offsetWidth);
      }
    }), this.resizeObserver.observe(this.getContainer());
  }
  initOptions() {
    const i = this.userOptions;
    this.options = Object.assign(this.options, i), this.magnifyImgWidthScaleUpTimes = i != null && i.width ? this.imgNaturalWidth / i.width : this.options.magnifyImgScaleUpTimes, this.options.width = (i == null ? void 0 : i.width) || this.imgNaturalWidth / this.magnifyImgWidthScaleUpTimes, this.magnifyImgHeightScaleUpTimes = i != null && i.height ? this.imgNaturalHeight / i.height : this.magnifyImgWidthScaleUpTimes, this.options.height = (i == null ? void 0 : i.height) || this.imgNaturalHeight / this.magnifyImgHeightScaleUpTimes, this.maskWidth = this.options.width / this.options.maskTimesSmallerThanImage, this.maskHeight = this.options.width / this.options.maskTimesSmallerThanImage;
  }
  initCSSVars() {
    const i = this.getContainer(), e = this.options.resizeable ? "auto" : `${this.options.width}px`, s = this.options.resizeable ? "auto" : `${this.options.height}px`;
    l(i, {
      "--enlarger-width": e,
      "--enlarger-height": s,
      "--enlarger-mask-color": this.options.maskColor,
      "--enlarger-mask-width": `${this.maskWidth}px`,
      "--enlarger-mask-height": `${this.maskHeight}px`,
      "--enlarger-mask-border-width": this.options.maskBorderWidth,
      "--enlarger-mask-border-color": this.options.maskBorderColor,
      "--enlarger-mask-border-style": this.options.maskBorderStyle,
      "--enlarger-mask-cursor": this.options.maskCursor,
      "--enlarger-magnify-position-left": `${this.options.width + 10}px`,
      "--enlarger-magnify-width": `${this.maskWidth * this.magnifyImgWidthScaleUpTimes}px`,
      "--enlarger-magnify-height": `${this.maskHeight * this.magnifyImgHeightScaleUpTimes}px`,
      "--enlarger-magnify-img-width": `${this.imgNaturalWidth}px`,
      "--enlarger-magnify-img-height": `${this.imgNaturalHeight}px`
    });
  }
  getImageNaturalSize(i, e) {
    const s = new Image();
    s.src = i, s.onload = () => {
      this.imgNaturalWidth = s.naturalWidth || s.width, this.imgNaturalHeight = s.naturalHeight || s.height, e && e();
    };
  }
  getContainer() {
    if (this.containerEl)
      return this.containerEl;
    try {
      this.containerEl = typeof this.userOptions.container == "string" ? document.querySelector(this.userOptions.container) : this.userOptions.container;
    } catch (i) {
      throw Error(h.getContainerError);
    }
    return this.containerEl;
  }
  getMaskEl() {
    const i = this.getContainer().querySelector(".enlarger-main__mask");
    if (!i)
      throw Error(h.getMaskElError);
    return i;
  }
  getEnlargerMainEl() {
    const i = this.getContainer().querySelector(".enlarger-main");
    if (!i)
      throw Error(h.getEnlargerMainElError);
    return i;
  }
  getMagnifyContainer() {
    const i = this.getContainer().querySelector(".enlarger-magnify");
    if (!i)
      throw Error(h.getMagnifyContainerError);
    return i;
  }
  getMagnifyImgEl() {
    const i = this.getContainer().querySelector(".enlarger-magnify__img");
    if (!i)
      throw Error(h.getMagnifyImgElError);
    return i;
  }
  maskVisibleListener() {
    this.maskVisible = !this.maskVisible, l(this.getMaskEl(), {
      display: this.maskVisible ? "block" : "none"
    }), l(this.getMagnifyContainer(), {
      display: this.maskVisible ? "block" : "none"
    });
  }
  magnifyListener(i) {
    const e = this.getContainer(), s = this.getEnlargerMainEl(), n = this.getMaskEl(), g = this.getMagnifyImgEl(), u = i.pageX - e.offsetLeft, y = i.pageY - e.offsetTop, c = e.offsetWidth - n.offsetWidth, f = e.offsetHeight - n.offsetHeight;
    let a = u - n.offsetWidth / 2, o = y - n.offsetHeight / 2;
    a <= 0 && (a = 0), a >= c && (a = c), o < 0 && (o = 0), o >= f && (o = f), n.style.left = a + "px", n.style.top = o + "px", g.style.left = -a / s.offsetWidth * g.offsetWidth + "px", g.style.top = -o / s.offsetHeight * g.offsetHeight + "px";
  }
  registorListeners() {
    const i = this.getEnlargerMainEl();
    this.removeListeners(), i.addEventListener("mouseover", this.maskVisibleListener), i.addEventListener("mouseout", this.maskVisibleListener), i.addEventListener("mousemove", this.magnifyListener);
  }
  removeListeners() {
    const i = this.getEnlargerMainEl();
    i.removeEventListener("mouseover", this.maskVisibleListener), i.removeEventListener("mouseout", this.maskVisibleListener), i.removeEventListener("mousemove", this.magnifyListener);
  }
  render() {
    this.initOptions(), this.initCSSVars();
    const i = this.getContainer();
    v(i, "enlarger-container");
    const e = `
      <div class="enlarger-main">
        <img src="${this.options.src}" alt="${this.options.alt}" class="enlarger-main__img" />
        <div class="enlarger-main__mask"></div>
      </div>
      <div class="enlarger-magnify">
        <img src="${this.options.src}" alt="${this.options.alt}" class="enlarger-magnify__img" />
      </div>
    `;
    i.innerHTML = e, this.registorListeners();
  }
  destory() {
    var i;
    this.removeListeners(), (i = this.resizeObserver) == null || i.unobserve(this.getContainer());
  }
}
const w = (t) => new C(t);
export {
  C as Enlarger,
  w as createEnlarger
};
