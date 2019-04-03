<template>
<q-modal v-model="addTemplateModal.open" :content-css="{minWidth: '40vw', minHeight: '50vh'}">
  <q-modal-layout>
    <q-toolbar slot="header">
      <q-btn
        flat
        round
        dense
        @click = "addTemplateModal = false"
        icon="keyboard_arrow_left"
      />
      <q-toolbar-title>
        Add Template
      </q-toolbar-title>
    </q-toolbar>

    <q-toolbar  slot="footer" inverted class = "no-shadow" style = "display:flex;justify-content:flex-end">
      <q-btn color="primary" flat icon="check" @click="submitscript">
        submit
      </q-btn>
    </q-toolbar>

    <div class="layout-padding">
      <span class = "text-grey" style = "font-size:120%">scene template editor</span>
        <q-input
          v-model="name"
          type="text"
          float-label="name"
          :max-height="100"
          rows="4"
        />
        <q-input
          v-model="init"
          type="textarea"
          float-label="initialize function"
          :max-height="100"
          rows="4"
        />
        <q-input
          v-model="script"
          type="textarea"
          float-label="Paste JS animation"
          :max-height="100"
          rows="8"
        />
        <q-uploader
          ref="uploader"
          auto-expand
          float-label = "upload an image"
          :url="uploadUrl"
          auto-expand 
          extensions='.gif,.jpg,.jpeg,.png'
          :multiple="multi"
          @add="filePut"
          @uploaded="attachFile"
          method="post"
        />

    </div>
  </q-modal-layout>
</q-modal>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
import {route, storage} from 'src/assets/backend'
import {_glob} from 'src/assets/global'
export default {
  computed: {
    ...mapGetters(['modals', 'scripts']),
    uploadUrl () {
      return route.uploads.image
    },
    addTemplateModal: {
      get () {
        return this.modals.addTemplate
      },
      set(value) {
        this._modals({'addTemplate': {
          'open': value
        }})
      }
    }
  },
  data() {
    return {
      multi: false,
      image: '',
      name: '',
      scriptname: '',
      script: '',
      search: '',
      init: ''
    }
  },
  methods: {
    ...mapActions([
      '_modals',
      '_scripts',
      '_config',
      '_colors',
    ]),
    filePut (files) {
      setTimeout(() => {
        this.$refs.uploader.upload()
      }, 200)
    },
    attachFile(file, xhr) {
      this.image = xhr.response
    },
    createScript(field) {
      var scr = document.createElement('script');
      scr.type = "text/javascript"
      scr.id = 'scripter'
      scr.text = field;
      document.getElementById('scene1').appendChild(scr)
    },
    submitscript() {
      // _glob.map_props(this.script);

      let initialize = this.init + '\n init(); ';
      if(this.image !== '') {
        this.script = _glob.map_image(this.script, storage + this.image);
      }
      this._colors(_glob.map_colors(this.script));
      this._config({'admin': {
        'loadout': true
      },'rightDrawer': {
        'open': true,
         'colorpicker': true
      }});
      
      this.addTemplateModal = false;
      this._scripts({'name':this.name, 'scriptname': this.scriptname, 'script': this.script, 'initial': initialize , 'strimage': this.image})
    }
  },
  mounted () {

  }

}
</script>