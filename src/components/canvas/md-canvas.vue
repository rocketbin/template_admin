<template>
    <div :id="divId" class= "shadow-3" style = "display:flex;justify-content:center;align-items:center;background-color:rgba(255, 255, 255, .1);cursor: pointer;border-radius:5px">
      <div id="animation_container" class= "animat-frame-md " style = "border-radius:5px" >
          <canvas :id = "canvasId" width="480" height="320" style = "border-radius:5px"></canvas>
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
  watch: {
    extdata () {
      this.rerun()
    }
  },
  computed: {
    ...mapGetters(['modals']),
    canvasId () {
      return 'canvas' + this.ind
    },
    extdata () {
      return this.data
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
  ...mapActions(['_modals']),
    sceneViewer(sceneId) {
      this._modals({'sceneViewer': {'open' : true, 'index': sceneId}});
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
      return _glob.map_init_props(data, 640, 580)
    },
    findCanvas (data) {
      let matches = data.match(/"(.*?)"/g);
      matches.map(m => {
        if(m.includes("canvas")) {
          data = data.replace(m,'"' + this.canvasId + '"');
        }
      })
      return data;
    },
    rerun () {
      this.processScript(this.data)
      eval(this.data.init)
    }
 },
 mounted () {
  this.processScript(this.data)
  eval(this.data.init)
 }
}
</script>