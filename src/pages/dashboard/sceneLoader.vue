<template>
  <div class = "row gutter-xs bg-grey-2 full-width">
      <div class ="col-xl-6 col-lg-12 col-md-12 flex flex-center" >
        <midcanvas :data="enscene" v-if = "Object.entries(enscene).length > 0"/>
        <div style = "min-width:480px;min-height:320px" class="bg-white" v-else = "Object.entries(enscene).length > 0">
        </div>
      </div>
      <div class ="col-xl-6 col-lg-12 col-md-12" style = "padding:30px">
        <infobox :enscene="enscene" v-if = "Object.entries(enscene).length > 0"/>
      </div>
      <q-inner-loading :visible="onLoad">
        <q-spinner-facebook size="40px" color="black"></q-spinner-facebook>
      </q-inner-loading>
  </div>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
import {_purl} from 'src/assets/purl'
import {_glob} from 'src/assets/global'
import {route} from 'src/assets/backend'
export default {
  watch: {
    'sceneId': function (value) {
      this._active({'scene': {'loader' : {'callback': this.fetch}}});
      this.fetch(value)
    } 
  },
  computed: {
    ...mapGetters(['active']),
    sceneId () {
      return this.active.scene.loader.id
    },
    enscene: {
      get () {
        return this.scene
      },
      set (value) {
        this.scene = value
      }
    }
  },
  data () {
    return {
      scene: {},
      onLoad: false
    }
  },
  methods: {
    ...mapActions(['_active']),
    fetch (scene) {
      this.onLoad = true
      if(scene !== undefined) {
        _purl.get(route.scenes.scene(scene)).then(r => {
          this.enscene = r.data
          this.onLoad = false
        })
      }
    }
  },
  mounted() {
  }
}
</script>