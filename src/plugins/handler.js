// import something here
import addTemplate from 'src/components/modals/addTemplate'
import selectColor from 'src/components/modals/selectColor'
import scriptLoader from 'src/components/loader/template'
import colorpicker from 'src/components/rightDrawer/colorpicker'
// leave the export, even if you don't use it
export default ({ app, router, Vue }) => {
  // something to do
  Vue.component('addTemplateModal', addTemplate);
  Vue.component('selectColorModal', selectColor);
  Vue.component('scriptLoader', scriptLoader);
  Vue.component('colorpicker', colorpicker);
  
}
