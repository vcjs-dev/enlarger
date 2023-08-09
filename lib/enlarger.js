var p = Object.defineProperty;
var u = (t, i, e) => i in t ? p(t, i, { enumerable: !0, configurable: !0, writable: !0, value: e }) : t[i] = e;
var r = (t, i, e) => (u(t, typeof i != "symbol" ? i + "" : i, e), e);
import { css as m, addClass as y } from "fourdom";
var g = /* @__PURE__ */ ((t) => (t.getContainerError = "container element is missing.", t.getMaskElError = "mask element is missing.", t.getEnlargerMainElError = "enlarger main element is missing.", t.getMagnifyContainerError = "magnify container element is missing.", t.getMagnifyImgElError = "magnify img element is missing.", t))(g || {});
class E {
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
      magnifyImgScaleUpTimes: 2,
      maskColor: "rgba(255, 255, 255, 0.2)",
      maskWidth: 0,
      maskHeight: 0,
      maskCursor: "crosshair",
      maskBorderColor: "#bbb",
      maskBorderWidth: "1px",
      maskBorderStyle: "solid"
    });
    r(this, "maskVisible", !1);
    r(this, "imgNaturalWidth", 0);
    r(this, "imgNaturalHeight", 0);
    r(this, "magnifyImgWidthScaleUpTimes", 1);
    r(this, "magnifyImgHeightScaleUpTimes", 1);
    r(this, "containerEl", null);
    this.userOptions = i, this.maskVisibleListener = this.maskVisibleListener.bind(this), this.magnifyListener = this.magnifyListener.bind(this), this.getImageNaturalSize(i.src, () => {
      this.render();
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
  initOptions() {
    const i = this.userOptions;
    this.options = Object.assign(this.options, i), this.magnifyImgWidthScaleUpTimes = i != null && i.width ? this.imgNaturalWidth / i.width : this.options.magnifyImgScaleUpTimes, this.options.width = (i == null ? void 0 : i.width) || this.imgNaturalWidth / this.magnifyImgWidthScaleUpTimes, this.magnifyImgHeightScaleUpTimes = i != null && i.height ? this.imgNaturalHeight / i.height : this.magnifyImgWidthScaleUpTimes, this.options.height = (i == null ? void 0 : i.height) || this.imgNaturalHeight / this.magnifyImgHeightScaleUpTimes, this.options.maskWidth = this.options.maskWidth || this.options.width / 2, this.options.maskHeight = this.options.maskHeight || this.options.width / 2;
  }
  initCSSVars() {
    const i = this.getContainer();
    m(i, {
      "--enlarger-width": `${this.options.width}px`,
      "--enlarger-height": `${this.options.height}px`,
      "--enlarger-mask-color": this.options.maskColor,
      "--enlarger-mask-width": `${this.options.maskWidth}px`,
      "--enlarger-mask-height": `${this.options.maskHeight}px`,
      "--enlarger-mask-border-width": this.options.maskBorderWidth,
      "--enlarger-mask-border-color": this.options.maskBorderColor,
      "--enlarger-mask-border-style": this.options.maskBorderStyle,
      "--enlarger-mask-cursor": this.options.maskCursor,
      "--enlarger-magnify-width": `${this.options.maskWidth * this.magnifyImgWidthScaleUpTimes}px`,
      "--enlarger-magnify-height": `${this.options.maskHeight * this.magnifyImgHeightScaleUpTimes}px`,
      "--enlarger-magnify-img-width": `${this.imgNaturalWidth}px`,
      "--enlarger-magnify-img-height": `${this.imgNaturalHeight}px`
    });
  }
  getImageNaturalSize(i, e) {
    const s = new Image();
    s.src = i, this.imgNaturalWidth = s.naturalWidth || s.width, this.imgNaturalHeight = s.naturalHeight || s.height, s.onload = () => {
      e && e();
    };
  }
  getContainer() {
    if (this.containerEl)
      return this.containerEl;
    try {
      this.containerEl = typeof this.userOptions.container == "string" ? document.querySelector(this.userOptions.container) : this.userOptions.container;
    } catch (i) {
      throw Error(g.getContainerError);
    }
    return this.containerEl;
  }
  getMaskEl() {
    const i = this.getContainer().querySelector(".enlarger-main__mask");
    if (!i)
      throw Error(g.getMaskElError);
    return i;
  }
  getEnlargerMainEl() {
    const i = this.getContainer().querySelector(".enlarger-main");
    if (!i)
      throw Error(g.getEnlargerMainElError);
    return i;
  }
  getMagnifyContainer() {
    const i = this.getContainer().querySelector(".enlarger-magnify");
    if (!i)
      throw Error(g.getMagnifyContainerError);
    return i;
  }
  getMagnifyImgEl() {
    const i = this.getContainer().querySelector(".enlarger-magnify__img");
    if (!i)
      throw Error(g.getMagnifyImgElError);
    return i;
  }
  maskVisibleListener() {
    this.maskVisible = !this.maskVisible, m(this.getMaskEl(), {
      display: this.maskVisible ? "block" : "none"
    }), m(this.getMagnifyContainer(), {
      display: this.maskVisible ? "block" : "none"
    });
  }
  magnifyListener(i) {
    const e = this.getContainer(), s = this.getEnlargerMainEl(), n = this.getMaskEl(), h = this.getMagnifyImgEl(), d = i.pageX - e.offsetLeft, f = i.pageY - e.offsetTop, l = e.offsetWidth - n.offsetWidth, c = e.offsetHeight - n.offsetHeight;
    let a = d - n.offsetWidth / 2, o = f - n.offsetHeight / 2;
    a <= 0 && (a = 0), a >= l && (a = l), o < 0 && (o = 0), o >= c && (o = c), n.style.left = a + "px", n.style.top = o + "px", h.style.left = -a / s.offsetWidth * h.offsetWidth + "px", h.style.top = -o / s.offsetHeight * h.offsetHeight + "px";
  }
  registorListeners() {
    const i = this.getEnlargerMainEl();
    i.addEventListener("mouseover", this.maskVisibleListener), i.addEventListener("mouseout", this.maskVisibleListener), i.addEventListener("mousemove", this.magnifyListener);
  }
  removeListeners() {
    const i = this.getEnlargerMainEl();
    i.removeEventListener("mouseover", this.maskVisibleListener), i.removeEventListener("mouseout", this.maskVisibleListener), i.removeEventListener("mousemove", this.magnifyListener);
  }
  render() {
    this.initOptions(), this.initCSSVars();
    const i = this.getContainer();
    y(i, "enlarger-container");
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
    this.removeListeners();
  }
}
const C = (t) => new E(t);
export {
  E as Enlarger,
  C as createEnlarger
};
