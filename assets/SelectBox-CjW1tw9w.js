import{d as m,A as _,B as p,c as S,o as v,b as a,e as n,f as r,y as B,n as c,v as f,C as x,F as y,g as V,t as g}from"./vue.esm-bundler-DWKVGBk9.js";import{_ as C}from"./_plugin-vue_export-helper-DlAUqK2U.js";const M=["value"],d=m({__name:"SelectBox",props:_({options:{},defaultValue:{}},{modelValue:{},modelModifiers:{}}),emits:["update:modelValue"],setup(t){const u=p(t,"modelValue"),l=S({get(){return u.value},set(e){u.value=e}});return v(()=>{const e=t.options.find(s=>s.value===t.defaultValue);e?l.value=e.value:l.value=t.options[0].value}),(e,s)=>(a(),n("div",{class:c(e.$style.SelectBox)},[r("div",{class:c(e.$style.SelectBox__slotContents)},[B(e.$slots,"default")],2),f(r("select",{"onUpdate:modelValue":s[0]||(s[0]=o=>l.value=o),class:c(e.$style.SelectBox__select)},[(a(!0),n(y,null,V(e.options,(o,i)=>(a(),n("option",{key:i,value:o.value},g(o.title),9,M))),128))],2),[[x,l.value]])],2))}}),$="_SelectBox_swvom_1",w="_SelectBox__slotContents_swvom_4",k="_SelectBox__select_swvom_10",A={SelectBox:$,SelectBox__slotContents:w,SelectBox__select:k},F={$style:A},q=C(d,[["__cssModules",F]]);d.__docgenInfo={exportName:"default",displayName:"SelectBox",description:"",tags:{},props:[{name:"options",required:!0,type:{name:"Array",elements:[{name:"option"}]}},{name:"defaultValue",required:!1,type:{name:"any"}}],slots:[{name:"default"}],sourceFiles:["/home/runner/work/calenderApp/calenderApp/frontend/src/components/SelectBox.vue"]};export{q as S};