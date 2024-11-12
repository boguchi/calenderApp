import{r as s}from"./vue.esm-bundler-DWKVGBk9.js";import"./index-BiReTpIz.js";import{S as a}from"./SelectBox-CME6QlQO.js";import"./entry-preview-BoFYPFXK.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const p={title:"Components/SelectBox",component:a},e={render:o=>({setup(){const r=s();return{args:o,selectedValue:r}},components:{SelectBox:a},template:`
    <SelectBox v-model="selectedValue">
      selected: {{ selectedValue }}
    </SelectBox>
    `}),args:{options:[{title:"title1",value:"value1"},{title:"title2",value:"value2"},{title:"title3",value:"value3"}],defaultValue:"value2"}};var t,l,n;e.parameters={...e.parameters,docs:{...(t=e.parameters)==null?void 0:t.docs,source:{originalSource:`{
  render: args => ({
    setup() {
      const selectedValue = ref();
      return {
        args,
        selectedValue
      };
    },
    components: {
      SelectBox
    },
    template: \`
    <SelectBox v-model="selectedValue">
      selected: {{ selectedValue }}
    </SelectBox>
    \`
  }),
  args: {
    options: [{
      title: 'title1',
      value: 'value1'
    }, {
      title: 'title2',
      value: 'value2'
    }, {
      title: 'title3',
      value: 'value3'
    }],
    defaultValue: 'value2'
  }
}`,...(n=(l=e.parameters)==null?void 0:l.docs)==null?void 0:n.source}}};const v=["Default"];export{e as Default,v as __namedExportsOrder,p as default};
