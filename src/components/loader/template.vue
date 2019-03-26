
<template>
  <div id = "scene">
  	<div id="animation_container" style="background-color:rgba(255, 255, 255, 1.00); width:1280px; height:720px;max-width:100%">
    		<canvas id="canvas" width="800" height="600" style="position: absolute; display: block; background-color:rgba(255, 255, 255, 1.00);max-width:100%" ></canvas>
    		<div id="dom_overlay_container" style="pointer-events:none; overflow:hidden; width:1280px; height:720px; position: absolute; left: 0px; top: 0px; display: block;">
  		</div>
    </div>
  	</div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {
	props: ['script', 'initial'],
  watch: {
    'scriptinit': {
      handler: function (newval) {
        setTimeout(this.runinit(), 5000);
      },
      deep: true
    }
  },
  computed: {
    ...mapGetters(['scripts']),
    scriptinit() {
      return this.scripts.script
    }
  },
	data () {
		return {
			canvas: '',
      stage: '',
      exportRoot: '',
      anim_container: '',
      dom_overlay_container: '',
      fnStartAnimation: '',
		}
	},

	methods: {
    createScript(field) {
      var scr = document.createElement('script');
      scr.type = "text/javascript"
      scr.id = 'scripter'
      scr.text = field;
      document.getElementById('scene').appendChild(scr)
    },
    runinit() {

      this.createScript(this.script);
      eval(this.initial);
    }
	},
	created() {

  },
  mounted () {


    // eval(this.initial);
  }
}
</script>