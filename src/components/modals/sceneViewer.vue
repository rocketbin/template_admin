<template>
  <q-modal v-model="sceneViewer" :content-css="{minWidth: '70vw', minHeight: '60vh'}">
    <q-modal-layout>
      <q-toolbar slot="header">
        <q-btn
          flat
          round
          dense
          v-close-overlay
          icon="keyboard_arrow_left"
        />
      </q-toolbar>


      <div class="layout-padding">
        <h1>Modal</h1>

        <q-btn
          color="primary"
          v-close-overlay
          label="Close"
        />

        <p>This is a Modal presenting a Layout.</p>


        <q-inner-loading :visible="onLoad">
          <q-spinner-facebook size="50px" color="grey"></q-spinner-facebook>
        </q-inner-loading>
      </div>
    </q-modal-layout>
  </q-modal>
</template>

<script>
import {mapGetters, mapActions } from 'vuex'
import {_purl} from 'src/assets/purl'
import {route} from 'src/assets/backend'
export default {
  watch: {
    'scene': function (value) {
      this.fetch(value)
    } 
  },
  computed : {
    ...mapGetters(['modals']),
    sceneViewer: {
      get () {
        return this.modals.sceneViewer.open
      },
      set(value) {
        this._modals({'sceneViewer': {
          'open': value
        }})
      }
    },
    scene() {
      return this.modals.sceneViewer.index
    }
  },
  data () {
    return {
      search: '',
      onLoad: false,
    }
  },
  methods: {
    ...mapActions(['_modals']),
    fetch (scene) {
      _purl.get(route.scenes.scene(scene)).then(r => {
        console.log(r)
      })
    }
  },

}

</script>