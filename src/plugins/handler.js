import { _token, _user, ignoreRoutes } from 'src/assets/token'
import { _glob } from 'src/assets/global'
import { Loading } from 'quasar'
import { logginRoute } from 'src/assets/backend'
// import something here
import addTemplate from 'src/components/modals/addTemplate'
import selectColor from 'src/components/modals/selectColor'
import sceneViewer from 'src/components/modals/sceneViewer'
import confirm from 'src/components/modals/confirm'
import scriptLoader from 'src/components/loader/template'
import colorpicker from 'src/components/rightDrawer/colorpicker'
import canvas from 'src/components/rightDrawer/canvas'
import save from 'src/components/rightDrawer/save'
import miniCanvas from 'src/components/canvas/mini-canvas'
import midcanvas from 'src/components/canvas/md-canvas'
import sceneLoader from 'src/pages/dashboard/sceneLoader'
import infobox from 'src/pages/dashboard/info-box'
// leave the export, even if you don't use it
export default ({ app, router, Vue }) => {
  // something to do
  Vue.component('addTemplateModal', addTemplate);
  Vue.component('selectColorModal', selectColor);
  Vue.component('scriptLoader', scriptLoader);
  Vue.component('colorpicker', colorpicker);
  Vue.component('canvasSize', canvas);
  Vue.component('templateSave', save);
  Vue.component('mini-canvas', miniCanvas);
  Vue.component('sceneViewer', sceneViewer);
  Vue.component('sceneLoader', sceneLoader);
  Vue.component('midcanvas', midcanvas);
  Vue.component('infobox', infobox);
  Vue.component('confirm', confirm);

  app.watch = {
    '$route': function (from, to) {
      // if (_prod !== 'local' ) {
      //   if (window.location.protocol !== 'https:') {
      //     window.location.href = 'https://fm-dev.cirrus8.com.au/login'
      //   }
      // }
      let auth = _token.checkToken()
      if (!auth) {
        let redirect = true
        ignoreRoutes.map(_r => {
          if (from.path === _r) {
            redirect = false
          }
          if(to.path === _r) {
            redirect = false
          }
          if (from.path.indexOf('signedby') > -1) {
            redirect = false
          }
        })
        if (redirect) {
          window.location.href = '/login'
        }
      } else {
        if (_token.checkExpire()) {
          _token.release()
          _glob.notify('you have been logged out, please login again', 'negative')
          window.location.href = '/login'
        }
        if (from.path === '/' || from.path === '/login') {
          this.$router.push('/admin')
        }
        _user.storeUser(_user.getUser())
      }
      if (_token.checkPasswordStatus()) {
        this.$router.push('/home/settings/changepassword')
        _glob.notify('you are required to change your password', 'negative')
      }
      if (_token.deactivatedUser()) {
        this.$router.push('/deactivated')
      }
    }
  }
}
