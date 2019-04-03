<template>
  <q-page class="flex flex-center">
<!--     <div id = "scene1">
    </div> -->
    <scriptLoader :script="scripter.script" :initial = "scripter.initial" v-show="loadout"/>
    <div style = "display:flex;justify-content:center;align-items:center;" v-if="!loadout">
      <q-btn icon="play_arrow" style = "background-color:#00322B;color:white" @click="_modals({'addTemplate':{'open': true}})" round size="md" class = "actionButton">
        <q-tooltip>
          Import Scene
        </q-tooltip>
      </q-btn>
      <img alt="Quasar logo" src="~assets/homeprezzo.png" style= "height:100%;width:16%;">
    </div>
  </q-page>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
import {_user} from 'src/assets/token'
import {_purl} from 'src/assets/purl'
import {route} from 'src/assets/backend'
import scriptLoader from 'src/components/loader/template'
import { Loading } from 'quasar'
export default {
  components: {scriptLoader: scriptLoader},
  computed: {
    ...mapGetters([
      'scripts',
      'config',
      'colours'
    ]),
    scripter () {
      return this.scripts
    },
    loadout() {
      return this.config.admin.loadout;
    }
  },
  methods: {
    ...mapActions([
      '_modals',
      '_colours'
    ]),
  },
  mounted () {
    let _u = _user.getUser();
  },
  created () {
    Loading.show({
      spinner: 'QSpinnerBars',
      message: '<small>loading up configurations...</small>',
      spinnerColor: 'white',
      spinnerSize: 60,
    })
    _purl._g(route.colours).then(r => {
      Loading.hide()
      this._colours(r.data);
    })
  }
}   
</script>
<style>

</style>