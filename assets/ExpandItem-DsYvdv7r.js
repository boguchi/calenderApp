import{d as l,b as c,j as i,p as d,v as h,x as m,f,y as u,n as x,T as _,z as y}from"./vue.esm-bundler-DWKVGBk9.js";import{_ as E}from"./_plugin-vue_export-helper-DlAUqK2U.js";const s=l({__name:"ExpandItem",props:{isShow:{type:Boolean,default:!1}},setup(w){const o=e=>{e.style.height="0px"},n=e=>{const t=e.scrollHeight+"px";e.style.height=t},a=e=>{e.style.height="auto"},r=e=>{e.style.height=e.scrollHeight+"px",y(()=>{e.style.height="0px"})},p=e=>{e.style.height="auto"};return(e,t)=>(c(),i(_,{onBeforeEnter:o,onEnter:n,onAfterEnter:a,onBeforeLeave:r,onAfterLeave:p},{default:d(()=>[h(f("div",{class:x(e.$style.ExpandItem)},[u(e.$slots,"default")],2),[[m,e.isShow]])]),_:3}))}}),g="_ExpandItem_p0n24_1",I={ExpandItem:g},v={$style:I},k=E(s,[["__cssModules",v]]);s.__docgenInfo={exportName:"default",displayName:"ExpandItem",description:"",tags:{},props:[{name:"isShow",required:!0,type:{name:"boolean"}}],slots:[{name:"default"}],sourceFiles:["/home/runner/work/calenderApp/calenderApp/frontend/src/components/ExpandItem.vue"]};export{k as E};