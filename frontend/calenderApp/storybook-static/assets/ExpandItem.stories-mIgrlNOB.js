import"./index-BiReTpIz.js";import{E as s}from"./ExpandItem-BGkMNyRk.js";import{r as i}from"./vue.esm-bundler-DWKVGBk9.js";import"./entry-preview-BoFYPFXK.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const d={title:"Components/ExpandItem",component:s},n={render:c=>({setup(){const e=i(!1);return{args:c,isShow:e,click:()=>{e.value=!e.value}}},components:{ExpandItem:s},template:`
    <Button @click="click">click</button>
    <ExpandItem :is-show="isShow">
      inner contents<br />
      inner contents<br />
      inner contents<br />
      inner contents<br />
      inner contents<br />
      inner contents<br />
      inner contents<br />
      inner contents<br />
      inner contents<br />
      inner contents
    </ExpandItem>
    `}),args:{}};var t,r,o;n.parameters={...n.parameters,docs:{...(t=n.parameters)==null?void 0:t.docs,source:{originalSource:`{
  render: args => ({
    setup() {
      const isShow = ref(false);
      const click = () => {
        isShow.value = !isShow.value;
      };
      return {
        args,
        isShow,
        click
      };
    },
    components: {
      ExpandItem
    },
    template: \`
    <Button @click="click">click</button>
    <ExpandItem :is-show="isShow">
      inner contents<br />
      inner contents<br />
      inner contents<br />
      inner contents<br />
      inner contents<br />
      inner contents<br />
      inner contents<br />
      inner contents<br />
      inner contents<br />
      inner contents
    </ExpandItem>
    \`
  }),
  args: {
    // isShow: false
  }
}`,...(o=(r=n.parameters)==null?void 0:r.docs)==null?void 0:o.source}}};const f=["Default"];export{n as Default,f as __namedExportsOrder,d as default};
