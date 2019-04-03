<template>
    <div :id="divId" class = "col-sm-1 col-md-3" style = "display:flex;justify-content:center;align-items:center;background-color:rgba(255, 255, 255, .1);cursor: pointer">
      <div id="animation_container" class= "animat-frame-sm zoom-on-hover" style = "position:relative">
          <div class= "zoom-icon-container" style = "position:absolute;display:flex;width:100%; height:100%;align-contents:center;justify-content:center">
            <q-btn round flat style = "align-self:center" color="grey-3" size = "xl" @click = "sceneLoader(data.id)" icon = "play_circle_outline" class="actionButton"/>
          </div>
          <canvas :id = "canvasId" class = "" width="360" height="320"></canvas>
          <div id="dom_overlay_container" style ="background-black" >
          </div>
      </div>
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import {_glob} from 'src/assets/global'
export default {
  props: ['data', 'ind'],
  computed: {
    ...mapGetters(['modals']),
    canvasId () {
      return 'canvas' + this.ind
    },
    divId () {
      return 'scene' + this.ind
    }
  },
 data () {
  return {

  }
 },
 methods: {
  ...mapActions(['_modals', '_active']),
    sceneViewer(sceneId) {
      this._modals({'sceneViewer': {'open' : true, 'index': sceneId}});
    },
    sceneLoader(sceneId) {
      this._active({'scene': {'loader' : {'id': sceneId}}});
    },
    processScript(data) {
      let scr = document.createElement('script');
      let divId = this.divId
      scr.type = "text/javascript"
      scr.id = 'scripter' + this.ind
      data.init = this.preventiveString(data.init)
      scr.text = data.data
      document.getElementById(this.divId).appendChild(scr)
    },
    preventiveString (data) {
      data = this.findCanvas(data)
      data = this.resizeCanvas(data)
      data = this.makeResponsive(data)
      return data
    },
    makeResponsive(data){ 
      return _glob.map_responsive(data)
    },
    resizeCanvas (data) {
      return _glob.map_init_props(data, 480, 320)
    },
    findCanvas (data) {
      let matches = data.match(/"(.*?)"/g);
      matches.map(m => {
        if(m.includes("canvas")) {
          data = data.replace(m,'"' + this.canvasId + '"');
        }
      })
      return data;
    }
 },
 mounted () {  
  this.processScript(this.data)
  eval(this.data.init)
 }
}
</script>