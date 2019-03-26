<template>
  <q-modal v-model="selectColorModal" position= "right">
    <q-color-picker v-model="hex" />
    <div style = "display:flex;justify-content:flex-end; padding:4px">
      <q-btn label = "save" icon-right="check" flat color="positive" @click="save()"/>
    </div>
  </q-modal>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
import {_glob} from 'src/assets/global'
export default {
  watch:{
    'hexa': function () {
      this.hex = this.modals.selectColor.hex
    }
  },
  computed: {
    ...mapGetters(['modals', 'scripts','colors']),
    hexa () {
      return this.modals.selectColor.hex
    },
    selectColorModal: {
      get () {
        return this.modals.selectColor.open
      },
      set(value) {
        this._modals({'selectColor': {
          'open': value
        }})
      }
    },
  },
  data() {
    return {
      hex: ''
    }
  },
  methods: {
    ...mapActions([
      '_modals',
      '_updateColor',
      '_colors',
      '_config',
      '_scripts'
    ]),
    save() {
      let ind               = this.modals.selectColor.index
      let newColor          = [...this.colors]
      let re                = new RegExp(this.colors[ind],"g");
      let scrname           = this.scripts.scriptname
      newColor[ind]         = this.hex;
      this.selectColorModal = false;
      let newScript         = this.scripts.script.replace(re, this.hex);
      let init              = this.scripts.initial
      document.getElementById('scripter').remove();
      this._scripts({'name': scrname, 'script': newScript, 'initial': init})
      this._colors(newColor);
      // this._updateColor({'index': this.modals.selectColor.index, 'hex': this.hex});
    }
  },
  mounted () {
  }
}
</script>