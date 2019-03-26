<template>
  <q-page class="flex flex-center">
<!--     <div id = "scene1">
    </div> -->
    <scriptLoader :script="scripter.script" :initial = "scripter.initial" v-show="loadout"/>
    <div style = "display:flex;justify-content:center;align-items:center;" v-if="!loadout">
      <q-btn icon="play_arrow" style = "background-color:#00322B;color:white" @click="_modals({'addTemplate':{'open': true}})" round size="md" class = "actionButton"/>
      <img alt="Quasar logo" src="~assets/homeprezzo.png" style= "height:100%;width:16%;">
    </div>
  </q-page>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
import {_purl} from 'src/assets/purl'
import {route} from 'src/assets/backend'
import scriptLoader from 'src/components/loader/template'

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
  created () {
    _purl._g(route.colours).then(r => {
      this._colours(r.data);
    })
  }
}   
</script>
<style>
.actionButton .q-icon {
  font-size: 250% !important;
}
</style>