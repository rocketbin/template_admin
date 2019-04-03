<template>
  <div>
    <confirm/>
    <div class = "row shadow-3" style = "min-height:50vh">
      <sceneLoader/>
    </div>
    <div class = "row layout-padding " style="padding-top:3px">
      <div class = "row" >
        <sceneViewer/>
      </div>
      <div class = "row" >
        <mini-canvas v-for = "(animat, index) in animats" :key="index" :ind="index" :data="animat" />
      </div>
    </div>
  </div>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
import {_purl} from 'src/assets/purl'
import {route} from 'src/assets/backend'
import { Loading } from 'quasar'

export default{ 
  data () {
    return {
      animats: [],
    }
  },
  methods: {
    ...mapActions(['_active'])
  },
  mounted () {
      Loading.show({
      spinner: 'QSpinnerBars',
      message: '<small>Getting Animations...</small>',
      spinnerColor: 'white',
      spinnerSize: 60,
    })
    _purl.get(route.scenes.get).then(r => {
      Loading.hide()
      this._active({'scene': {'loader' : {'id': r.data[0].id}}});
      this.animats = r.data
    })
  }
}
</script>