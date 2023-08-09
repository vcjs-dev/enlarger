"use strict";var y=Object.defineProperty;var u=(e,i,t)=>i in e?y(e,i,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[i]=t;var n=(e,i,t)=>(u(e,typeof i!="symbol"?i+"":i,t),t);Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const m=require("fourdom");var o=(e=>(e.getContainerError="container element is missing.",e.getMaskElError="mask element is missing.",e.getEnlargerMainElError="enlarger main element is missing.",e.getMagnifyContainerError="magnify container element is missing.",e.getMagnifyImgElError="magnify img element is missing.",e))(o||{});class f{constructor(i){n(this,"options",{container:"",src:"",alt:"",width:0,height:0,maskColor:"rgba(255, 255, 0, 0.4)",maskWidth:0,maskHeight:0,magnifyImgScaleUpTimes:2});n(this,"maskVisible",!1);n(this,"imgNaturalWidth",0);n(this,"imgNaturalHeight",0);n(this,"magnifyImgWidthScaleUpTimes",1);n(this,"magnifyImgHeightScaleUpTimes",1);n(this,"containerEl",null);this.options=Object.assign(this.options,i),this.maskVisibleListener=this.maskVisibleListener.bind(this),this.magnifyListener=this.magnifyListener.bind(this),this.getImageNaturalSize(this.options.src,()=>{this.magnifyImgWidthScaleUpTimes=i!=null&&i.width?this.imgNaturalWidth/i.width:this.options.magnifyImgScaleUpTimes,this.options.width=(i==null?void 0:i.width)||this.imgNaturalWidth/this.magnifyImgWidthScaleUpTimes,this.magnifyImgHeightScaleUpTimes=i!=null&&i.height?this.imgNaturalHeight/i.height:this.magnifyImgWidthScaleUpTimes,this.options.height=(i==null?void 0:i.height)||this.imgNaturalHeight/this.magnifyImgHeightScaleUpTimes,this.options.maskWidth=this.options.maskWidth||this.options.width/2,this.options.maskHeight=this.options.maskHeight||this.options.width/2,this.render()})}initCSSVars(){const i=this.getContainer();m.css(i,{"--enlarger-width":`${this.options.width}px`,"--enlarger-height":`${this.options.height}px`,"--enlarger-mask-color":this.options.maskColor,"--enlarger-mask-width":`${this.options.maskWidth}px`,"--enlarger-mask-height":`${this.options.maskHeight}px`,"--enlarger-magnify-width":`${this.options.maskWidth*this.magnifyImgWidthScaleUpTimes}px`,"--enlarger-magnify-height":`${this.options.maskHeight*this.magnifyImgHeightScaleUpTimes}px`,"--enlarger-magnify-img-width":`${this.imgNaturalWidth}px`,"--enlarger-magnify-img-height":`${this.imgNaturalHeight}px`})}getImageNaturalSize(i,t){const s=new Image;s.src=i,this.imgNaturalWidth=s.naturalWidth||s.width,this.imgNaturalHeight=s.naturalHeight||s.height,s.onload=()=>{t&&t()}}getContainer(){if(this.containerEl)return this.containerEl;try{this.containerEl=typeof this.options.container=="string"?document.querySelector(this.options.container):this.options.container}catch(i){throw Error(o.getContainerError)}return this.containerEl}getMaskEl(){const i=this.getContainer().querySelector(".enlarger-main__mask");if(!i)throw Error(o.getMaskElError);return i}getEnlargerMainEl(){const i=this.getContainer().querySelector(".enlarger-main");if(!i)throw Error(o.getEnlargerMainElError);return i}getMagnifyContainer(){const i=this.getContainer().querySelector(".enlarger-magnify");if(!i)throw Error(o.getMagnifyContainerError);return i}getMagnifyImgEl(){const i=this.getContainer().querySelector(".enlarger-magnify__img");if(!i)throw Error(o.getMagnifyImgElError);return i}maskVisibleListener(){this.maskVisible=!this.maskVisible,m.css(this.getMaskEl(),{display:this.maskVisible?"block":"none"}),m.css(this.getMagnifyContainer(),{display:this.maskVisible?"block":"none"})}magnifyListener(i){const t=this.getContainer(),s=this.getEnlargerMainEl(),r=this.getMaskEl(),h=this.getMagnifyImgEl(),d=i.pageX-t.offsetLeft,E=i.pageY-t.offsetTop,l=t.offsetWidth-r.offsetWidth,c=t.offsetHeight-r.offsetHeight;let a=d-r.offsetWidth/2,g=E-r.offsetHeight/2;a<=0&&(a=0),a>=l&&(a=l),g<0&&(g=0),g>=c&&(g=c),r.style.left=a+"px",r.style.top=g+"px",h.style.left=-a/s.offsetWidth*h.offsetWidth+"px",h.style.top=-g/s.offsetHeight*h.offsetHeight+"px"}registorListeners(){const i=this.getEnlargerMainEl();i.addEventListener("mouseover",this.maskVisibleListener),i.addEventListener("mouseout",this.maskVisibleListener),i.addEventListener("mousemove",this.magnifyListener)}removeListeners(){const i=this.getEnlargerMainEl();i.removeEventListener("mouseover",this.maskVisibleListener),i.removeEventListener("mouseout",this.maskVisibleListener),i.removeEventListener("mousemove",this.magnifyListener)}render(){const i=this.getContainer(),t=`
      <div class="enlarger-main">
        <img src="${this.options.src}" alt="${this.options.alt}" class="enlarger-main__img" />
        <div class="enlarger-main__mask"></div>
      </div>
      <div class="enlarger-magnify">
        <img src="${this.options.src}" alt="${this.options.alt}" class="enlarger-magnify__img" />
      </div>
    `;m.addClass(i,"enlarger-container"),this.initCSSVars(),i.innerHTML=t,this.registorListeners()}destory(){this.removeListeners()}}const k=e=>new f(e);exports.Enlarger=f;exports.createEnlarger=k;
