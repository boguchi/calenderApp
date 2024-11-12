import{d as w,u as B,a as S,c as m,r as A,w as H,o as M,b as d,e as y,f as v,F as b,g,n as c,h as o,t as W,j as $}from"./vue.esm-bundler-DWKVGBk9.js";import{C as q}from"./CalenderItem-DmOQP4MF.js";import{g as D,a as _,b as E,c as N}from"./date-CA4HnE_D.js";import{_ as Q}from"./_plugin-vue_export-helper-DlAUqK2U.js";const x=w({__name:"CalenderTable",props:{year:{},monthIndex:{},eventList:{}},emits:["calenderItemOnClick","calenderItemOnFocused"],setup(e,{emit:h}){B(a=>({"2db2ee58":F.value}));const I=h,l=S(),k=m(()=>["日","月","火","水","木","金","土"]),F=m(()=>_(e.year,e.monthIndex)/7),i=m(()=>{const a=D(e.year,e.monthIndex),r=E(e.year,e.monthIndex),t=N(e.year,e.monthIndex),T=_(e.year,e.monthIndex);return[...Array(T).keys()].map(C=>({key:C})).map((C,s)=>{let n;return s<a.getDay()?n=new Date(e.year,e.monthIndex-1,t.getDate()+s):s>=a.getDay()+r.getDate()?n=new Date(e.year,e.monthIndex+1,s-(a.getDay()+r.getDate())+1):n=new Date(e.year,e.monthIndex,s-a.getDay()+1),{...C,date:n,dating:n.getDate(),isToday:n.toDateString()===new Date().toDateString(),dayType:n.getDay()===0?"holiday":n.getDay()===6?"saturday":void 0}})}),L=m(()=>i.value?i.value.map(a=>{const r=e.eventList.filter(t=>a.date.toDateString()===new Date(t.startDate).toDateString());return{...a,eventList:r,isFocused:a.key===u.value}}):[]),u=A(),f=()=>{const a=i.value.findIndex(r=>r.isToday);a?u.value=a:u.value=D(e.year,e.monthIndex).getDay()};H(()=>[e.year,e.monthIndex],f);const O=a=>{a.isFocused?I("calenderItemOnClick",a):(I("calenderItemOnFocused",a),u.value=a.key)};return M(()=>{f()}),(a,r)=>(d(),y("div",{class:c(o(l).CalenderTable)},[v("ul",{class:c(o(l).CalenderTable__dayHeader)},[(d(!0),y(b,null,g(k.value,t=>(d(),y("li",{key:t,class:c(o(l).CalenderTable__day)},W(t),3))),128))],2),v("div",{class:c(o(l).CalenderTable__calenderItemWrap)},[(d(!0),y(b,null,g(L.value,t=>(d(),$(q,{key:t.key,dating:t.dating,isToday:t.isToday,dayType:t.dayType,eventList:t.eventList,isFocused:t.isFocused,class:c(o(l).CalenderTable__calenderItem),onCalenderItemOnClick:T=>O(t)},null,8,["dating","isToday","dayType","eventList","isFocused","class","onCalenderItemOnClick"]))),128))],2)],2))}}),V="_CalenderTable_vffo2_1",j="_CalenderTable__dayHeader_vffo2_5",z="_CalenderTable__day_vffo2_5",G="_CalenderTable__calenderItemWrap_vffo2_14",J="_CalenderTable__calenderItem_vffo2_14",K={CalenderTable:V,CalenderTable__dayHeader:j,CalenderTable__day:z,CalenderTable__calenderItemWrap:G,CalenderTable__calenderItem:J},P={$style:K},p=Q(x,[["__cssModules",P]]);x.__docgenInfo={exportName:"default",displayName:"CalenderTable",description:"",tags:{},props:[{name:"year",required:!0,type:{name:"number"}},{name:"monthIndex",required:!0,type:{name:"number"}},{name:"eventList",required:!0,type:{name:"Array",elements:[{name:"EventItemType"}]}}],events:[{name:"calenderItemOnClick"},{name:"calenderItemOnFocused"}],sourceFiles:["/home/runner/work/calenderApp/calenderApp/frontend/src/components/CalenderTable.vue"]};export{p as C};
