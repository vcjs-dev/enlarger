(function(e,t){typeof exports=="object"&&typeof module!="undefined"?t(exports,require("fourdom")):typeof define=="function"&&define.amd?define(["exports","fourdom"],t):(e=typeof globalThis!="undefined"?globalThis:e||self,t(e.Enlarger={},e.fourdom))})(this,function(e,t){"use strict";var E=Object.defineProperty;var k=(e,t,s)=>t in e?E(e,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[t]=s;var o=(e,t,s)=>(k(e,typeof t!="symbol"?t+"":t,s),s);var s=(r=>(r.getContainerError="container element is missing.",r.getMaskElError="mask element is missing.",r.getEnlargerMainElError="enlarger main element is missing.",r.getMagnifyContainerError="magnify container element is missing.",r.getMagnifyImgElError="magnify img element is missing.",r))(s||{});class c{constructor(i){o(this,"userOptions",{container:"",src:""});o(this,"options",{container:"",src:"",alt:"",width:0,height:0,magnifyImgScaleUpTimes:2,maskColor:"rgba(255, 255, 255, 0.2)",maskWidth:0,maskHeight:0,maskCursor:"crosshair",maskBorderColor:"#bbb",maskBorderWidth:"1px",maskBorderStyle:"solid"});o(this,"maskVisible",!1);o(this,"imgNaturalWidth",0);o(this,"imgNaturalHeight",0);o(this,"magnifyImgWidthScaleUpTimes",1);o(this,"magnifyImgHeightScaleUpTimes",1);o(this,"containerEl",null);this.userOptions=i,this.maskVisibleListener=this.maskVisibleListener.bind(this),this.magnifyListener=this.magnifyListener.bind(this),this.getImageNaturalSize(i.src,()=>{this.render()})}setOptions(i){return this.userOptions=Object.assign(this.userOptions,i),this.render(),this}setWidth(i){return this.userOptions=Object.assign(this.userOptions,{width:i}),this.render(),this}setHeight(i){return this.userOptions=Object.assign(this.userOptions,{height:i}),this.render(),this}initOptions(){const i=this.userOptions;this.options=Object.assign(this.options,i),this.magnifyImgWidthScaleUpTimes=i!=null&&i.width?this.imgNaturalWidth/i.width:this.options.magnifyImgScaleUpTimes,this.options.width=(i==null?void 0:i.width)||this.imgNaturalWidth/this.magnifyImgWidthScaleUpTimes,this.magnifyImgHeightScaleUpTimes=i!=null&&i.height?this.imgNaturalHeight/i.height:this.magnifyImgWidthScaleUpTimes,this.options.height=(i==null?void 0:i.height)||this.imgNaturalHeight/this.magnifyImgHeightScaleUpTimes,this.options.maskWidth=this.options.maskWidth||this.options.width/2,this.options.maskHeight=this.options.maskHeight||this.options.width/2}initCSSVars(){const i=this.getContainer();t.css(i,{"--enlarger-width":`${this.options.width}px`,"--enlarger-height":`${this.options.height}px`,"--enlarger-mask-color":this.options.maskColor,"--enlarger-mask-width":`${this.options.maskWidth}px`,"--enlarger-mask-height":`${this.options.maskHeight}px`,"--enlarger-mask-border-width":this.options.maskBorderWidth,"--enlarger-mask-border-color":this.options.maskBorderColor,"--enlarger-mask-border-style":this.options.maskBorderStyle,"--enlarger-mask-cursor":this.options.maskCursor,"--enlarger-magnify-width":`${this.options.maskWidth*this.magnifyImgWidthScaleUpTimes}px`,"--enlarger-magnify-height":`${this.options.maskHeight*this.magnifyImgHeightScaleUpTimes}px`,"--enlarger-magnify-img-width":`${this.imgNaturalWidth}px`,"--enlarger-magnify-img-height":`${this.imgNaturalHeight}px`})}getImageNaturalSize(i,n){const a=new Image;a.src=i,this.imgNaturalWidth=a.naturalWidth||a.width,this.imgNaturalHeight=a.naturalHeight||a.height,a.onload=()=>{n&&n()}}getContainer(){if(this.containerEl)return this.containerEl;try{this.containerEl=typeof this.userOptions.container=="string"?document.querySelector(this.userOptions.container):this.userOptions.container}catch(i){throw Error(s.getContainerError)}return this.containerEl}getMaskEl(){const i=this.getContainer().querySelector(".enlarger-main__mask");if(!i)throw Error(s.getMaskElError);return i}getEnlargerMainEl(){const i=this.getContainer().querySelector(".enlarger-main");if(!i)throw Error(s.getEnlargerMainElError);return i}getMagnifyContainer(){const i=this.getContainer().querySelector(".enlarger-magnify");if(!i)throw Error(s.getMagnifyContainerError);return i}getMagnifyImgEl(){const i=this.getContainer().querySelector(".enlarger-magnify__img");if(!i)throw Error(s.getMagnifyImgElError);return i}maskVisibleListener(){this.maskVisible=!this.maskVisible,t.css(this.getMaskEl(),{display:this.maskVisible?"block":"none"}),t.css(this.getMagnifyContainer(),{display:this.maskVisible?"block":"none"})}magnifyListener(i){const n=this.getContainer(),a=this.getEnlargerMainEl(),g=this.getMaskEl(),l=this.getMagnifyImgEl(),u=i.pageX-n.offsetLeft,y=i.pageY-n.offsetTop,d=n.offsetWidth-g.offsetWidth,f=n.offsetHeight-g.offsetHeight;let h=u-g.offsetWidth/2,m=y-g.offsetHeight/2;h<=0&&(h=0),h>=d&&(h=d),m<0&&(m=0),m>=f&&(m=f),g.style.left=h+"px",g.style.top=m+"px",l.style.left=-h/a.offsetWidth*l.offsetWidth+"px",l.style.top=-m/a.offsetHeight*l.offsetHeight+"px"}registorListeners(){const i=this.getEnlargerMainEl();i.addEventListener("mouseover",this.maskVisibleListener),i.addEventListener("mouseout",this.maskVisibleListener),i.addEventListener("mousemove",this.magnifyListener)}removeListeners(){const i=this.getEnlargerMainEl();i.removeEventListener("mouseover",this.maskVisibleListener),i.removeEventListener("mouseout",this.maskVisibleListener),i.removeEventListener("mousemove",this.magnifyListener)}render(){this.initOptions(),this.initCSSVars();const i=this.getContainer();t.addClass(i,"enlarger-container");const n=`
      <div class="enlarger-main">
        <img src="${this.options.src}" alt="${this.options.alt}" class="enlarger-main__img" />
        <div class="enlarger-main__mask"></div>
      </div>
      <div class="enlarger-magnify">
        <img src="${this.options.src}" alt="${this.options.alt}" class="enlarger-magnify__img" />
      </div>
    `;i.innerHTML=n,this.registorListeners()}destory(){this.removeListeners()}}const p=r=>new c(r),b="";e.Enlarger=c,e.createEnlarger=p,Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})});
