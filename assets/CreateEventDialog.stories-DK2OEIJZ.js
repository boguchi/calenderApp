import{r as m}from"./vue.esm-bundler-DWKVGBk9.js";import"./index-BiReTpIz.js";import{w as v,u as d}from"./index-BYX12aAs.js";import{C as o}from"./CreateEventDialog-CzrwW2pv.js";import{m as u}from"./eventList-NT971c22.js";import"./entry-preview-BoFYPFXK.js";import"./ExpandItem-DsYvdv7r.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./pinia-D1zkhqT9.js";const B={title:"Components/CreateEventDialog",component:o},t={render:e=>({setup(){const n=m();return{args:e,selectedValue:n}},components:{CreateEventDialog:o},template:`
    <CreateEventDialog v-model="selectedValue">
      open dialog
    </CreateEventDialog>
    `}),args:{event:u[0]},play:async({canvasElement:e})=>{const r=v(e).getByText("open dialog");await d.click(r)}},a={render:e=>({setup(){const n=m();return{args:e,selectedValue:n}},components:{CreateEventDialog:o},template:`
    <CreateEventDialog v-model="selectedValue">
      open dialog
    </CreateEventDialog>
    `}),args:{newEventDate:new Date},play:async({canvasElement:e})=>{const r=v(e).getByText("open dialog");await d.click(r)}};var s,c,l;t.parameters={...t.parameters,docs:{...(s=t.parameters)==null?void 0:s.docs,source:{originalSource:`{
  render: args => ({
    setup() {
      const selectedValue = ref();
      return {
        args,
        selectedValue
      };
    },
    components: {
      CreateEventDialog
    },
    template: \`
    <CreateEventDialog v-model="selectedValue">
      open dialog
    </CreateEventDialog>
    \`
  }),
  args: {
    event: mockEventList[0]
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByText('open dialog');
    await userEvent.click(trigger);
  }
}`,...(l=(c=t.parameters)==null?void 0:c.docs)==null?void 0:l.source}}};var i,g,p;a.parameters={...a.parameters,docs:{...(i=a.parameters)==null?void 0:i.docs,source:{originalSource:`{
  render: args => ({
    setup() {
      const selectedValue = ref();
      return {
        args,
        selectedValue
      };
    },
    components: {
      CreateEventDialog
    },
    template: \`
    <CreateEventDialog v-model="selectedValue">
      open dialog
    </CreateEventDialog>
    \`
  }),
  args: {
    newEventDate: new Date()
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByText('open dialog');
    await userEvent.click(trigger);
  }
}`,...(p=(g=a.parameters)==null?void 0:g.docs)==null?void 0:p.source}}};const T=["Default","新規作成"];export{t as Default,T as __namedExportsOrder,B as default,a as 新規作成};
