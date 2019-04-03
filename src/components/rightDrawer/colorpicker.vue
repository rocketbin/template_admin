<template>
  <div>
    <div class="bg-grey-6" style="padding: 10px;min-height:100px;color:white!important">
      <!-- Notice "dark" property -->
      <q-field
        inverted
        class= "contentColors"
        icon="color_lens"
      >
        <q-btn-dropdown :label="activeColorName" size = "sm" outline  >
          <!-- dropdown content -->
          <q-list v-for="(color, index) in colours" style = "display:flex;justify-content:center;width:inherit" @click.native="colorseparator(color)" v-close-overlay :key="index">
            <div  v-for="paint in color._colors" >
              <div :style= "setBg(paint)" style= "width:40px;height:30px"></div>
            </div>
          </q-list>
        </q-btn-dropdown>
          <div style = "display:flex;justify-content:center;width:inherit; margin: 10px" >
            <div  v-for="paint in activeColors" class="shadow-1">
              <div :style= "setBg(paint)" style= "width:40px;height:30px"></div>
            </div>
          </div>

      </q-field><hr>
      <q-field
        inverted
        class= "contentColors"
        icon="art_track"
      >

        <q-btn size="sm"  v-for= "(color, index) in colors_" :style= "getStyle(color)" @click="openSelector(color, index)" :key="index">
          <q-tooltip>{{color}}</q-tooltip>
        </q-btn>
      </q-field>
    </div>
  </div>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
export default{
  watch:{
    'hexa': function () {
      this.hex = this.modals.selectColor.hex
    }
  },
  computed: {
    ...mapGetters([
      'active', 
      'colors', 
      'modals',
      'colours'
    ]),
    colors_() {
        return this.colors;
    },
    hexa() {
      return this.modals.selectColor.hex
    }
  },
  data () {
    return {
      activeColorName: 'pick a template',
      activeColors: []
    }
  },
  methods: {
    ...mapActions(['_modals']),
    openSelector(color, index) {
        this._modals({'selectColor': {
          'open': true,
          'hex': color,
          'index': index
        }})
    },
    setBg(paint) {
      return 'background-color:' + paint;
    },
    colorseparator (color) {
     this.activeColors = color._colors
     this.activeColorName = color.name
    },
    getStyle (color) { 
      return `background-color:${color};margin:5px`;
    },
  },
  mounted () {

    // console.log(this.colours)
  }
}
</script>