<template>
<q-modal v-model="newTemplateModal.open" :content-css="{minWidth: '100vw', minHeight: '100vh'}">
  <q-modal-layout>
    <q-toolbar slot="header">
      <q-btn
        flat
        round
        dense
        v-close-overlay
        icon="keyboard_arrow_left"
      />
      <q-toolbar-title>
        Add Template
      </q-toolbar-title>
    </q-toolbar>

    <div class="layout-padding ">
      <div style = "display:flex; justify-content:space-around; margin:12px">
        <q-toggle v-model="checked" icon="cloud_upload" :label="toggleLabel"  />
        <q-btn-dropdown outline split :label="subtype"  >
          <!-- dropdown content -->
          <q-list link>
            <q-item v-for="type in types" v-close-overlay @click.native="subtype = type.val.display">
              <q-item-main>
                <q-item-tile label >{{ type.val.display }}</q-item-tile>
              </q-item-main>
            </q-item>
          </q-list>
        </q-btn-dropdown>
        <q-btn-group outline>
          <q-btn outline color="dark" icon = "visibility"  @click="processScript">
            <q-tooltip>
              preview
            </q-tooltip>
          </q-btn>
          <q-btn outline color="dark" icon = "save"  @click = "saveScript">
            <q-tooltip>
              save
            </q-tooltip>
          </q-btn>
        </q-btn-group>
      </div>
      <q-input
        v-model="script"
        type="textarea"
        float-label="Raw JS animation"
        :max-height="100"
        rows="8"
        v-if="!checked"
      />
      <q-field
        icon="file"
        label="upload JS file"
        dark
        label-width="3"
        style = "border-radius:5px; margin: 12px:padding:12px"
        class = "bg-dark shadow-3"
        orientation = "horizontal"
        v-else
      >
        <div style = "padding:12px">
          <q-uploader
            ref="uploader"
            extensions = ".js"
            :url="uploadUrl"
            @add="filePut"
            @uploaded="attachFile"
            @fail="uploadFail"
            hide-upload-button
            auto-expand
            method="POST"
            dark
          />
        </div>
      </q-field>
      <div class="row" style = "margin-top:5px">
        <div class="col-xs-4">
          <textpicker :textdata="textdata"/>
        </div>
        <div class="col-xs-4">
          <templateEditorForm/>
        </div>
        <div class="col-xs-4">
          <fileTextLoader :imagedata="imagedata"/>
        </div>
      </div>
    </div>
  </q-modal-layout>
</q-modal>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
import {route, storage} from 'src/assets/backend'
import {_glob} from 'src/assets/global'
import {_purl} from 'src/assets/purl'
import regxStr from 'src/assets/regx'
export default {
  watch: {
    'modalStatus':function (val) {
      if(val && this.newTemplateModal.id > 0) {
        this.loadUpdateTemplate()
      }
    },
    'animatProps': {
      handler (value) {
          // console.log(value)
          // this.script = regxStr.reconstructText(this.script, value)
      },
      deep: true
    },
    script (str) {
      if(str.length > 40) {
        let loadDefault = this.validateScript()
        if(Number(loadDefault) > 0)
          this.submitscript()
        else
          this.submitscript()
      }
    }
  },
  computed: {
    ...mapGetters(['modals', 'scripts', 'config']),
    uploadUrl () {
      return route.uploads.image
    },
    types () {
      return this.config.templates.types
    },
    uploadUrl () {
      return route.uploads.raw;
    },
    toggleLabel() {
      if(this.checked) {
        return 'JS'
      } else {
        return 'raw'
      }
    },
    modalStatus () {
      return this.modals.newTemplate.open
    },
    newTemplateModal: {
      get () {
        return this.modals.newTemplate
      },
      set(value) {
        this._modals({'newTemplateModal': {
          'open': value
        }})
      }
    }
  },
  data() {
    return {
      checked: true,
      multi: false,
      scriptid: 0,
      subtype: 'Type',
      image: '',
      oldScript: '',
      script: '',
      scriptname: '',
      animatProps: {},
      textdata: [],
      imagedata: []
    }
  },
  methods: {
    ...mapActions([
      '_modals',
      '_scripts',
      '_config',
      '_colors',
    ]),
    saveScript() {
      if( this.scriptid === undefined || Number(this.scriptid) <= 0) {
        _purl.post(route.jsscenes.store, {
          filename: this.scriptname,
          reftype: 'raw',
          data: regxStr.RippedText(this.script, this.animatProps),
          raw: this.script,
          config: JSON.stringify(this.animatProps)
        }).then(r => {
          this.scriptid = r.data.js_id
          _glob.notify('data has been created', 'positive')
        })
      } else {
        _purl.post(route.jsscenes.update(this.scriptid), {
          data: this.script,
          config: JSON.stringify(this.animatProps)
        }).then(r => {
          // _glob.notify('data has been updated', 'positive')
        })
      }
    },
    uploadFail (file, xhr) {
      this.$refs.uploader.files.map((_f, ind) => {
        if (_f === file) {
          this.$refs.uploader.files.splice(ind, 1)
        }
      })
      _glob.notify(xhr.response, 'negative')
    },
    filePut (files) {
      setTimeout(() => {
        this.$refs.uploader.upload()
      }, 200)
    },
    attachFile(file, xhr) {
      let res = JSON.parse(xhr.response)
      this.script  = res.data
      this.scriptname  = res.name
      this.scriptid = res.js_id
      this.checked = false
    },
    validateScript () {
      if(this.oldScript.length > 10) {
        return this.script.localeCompare(this.oldScript, 'en', {sensitivity: 'base'})
      } else {
        this.oldScript = this.script
      }
    },
    confirmNewScript () {
      this._modals({'confirm': {
        'open' : true,
        'label' : 'The system has detected a new script, do you want to save it as a new raw ?',
        'callback' : this.newTemplateContent(),
      }});
    },
    newTemplateContent () {
      this.scriptid = 0
      this.submitscript()
    },
    loadUpdateTemplate () {
      this.scriptid = this.newTemplateModal.id
      this.script = this.newTemplateModal.data
      this.checked = false
    },
    processScript () {
      this.script = regxStr.reconstructText(this.oldScript, this.animatProps)
      this.oldScript = this.script
    },
    filePut (files) {
      setTimeout(() => {
        this.$refs.uploader.upload()
      }, 200)
    },
    createScript(field) {
      var scr = document.createElement('script');
      scr.type = "text/javascript"
      scr.id = 'scripter'
      scr.text = field;
      document.getElementById('scene1').appendChild(scr)
    },
    submitscript() {
      let _cs          = regxStr.map_hex_colors(this.script)
      this.animatProps = regxStr.getProperties(this.script)
      this.textdata    = this.animatProps.texts
      this.imagedata   = this.animatProps.images
      this._colors(_cs.data);
      if(!_cs.success)
        _glob.notify('no colors are detected', 'negative');

    }
  },
  mounted () {

    // console.log(json)
  }

}
</script>