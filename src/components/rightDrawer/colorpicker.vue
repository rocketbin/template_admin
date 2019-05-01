<template>
  <div>
    <div style="padding: 10px;min-height:100px; display: flex; justify-content: center;">
      <!-- Notice "dark" property -->
<!--       <q-field
        inverted
        class= "contentColors"
        icon="color_lens"
      >
        <q-btn-dropdown :label="activeColorName" size = "sm" outline  >
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

      </q-field>
      <hr> -->
      <small>color:</small><br>
      <div>
        <div v-for= "(color, index) in colors_" class = "full-width" style = "display:flex;margin:20px; " >
          <q-btn :style= "getStyle(color.color)" />
          <q-btn-dropdown  :label = "pickers[color.type]" outline style= "min-width: 230px!important"  split>
            <q-list  highlight>
              <q-item @click.native="color.type = 2" v-close-overlay style="cursor:pointer">
                <q-item-main>
                  <q-item-tile label>Text</q-item-tile>
                </q-item-main>
              </q-item>
              <q-item @click.native="color.type = 1" v-close-overlay style="cursor:pointer">
                <q-item-main>
                  <q-item-tile label>Icon</q-item-tile>
                </q-item-main>
              </q-item>
              <q-item @click.native="color.type = 0" v-close-overlay style="cursor:pointer">
                <q-item-main>
                  <q-item-tile label>Background</q-item-tile>
                </q-item-main>
              </q-item>
            </q-list>
          </q-btn-dropdown>
          <q-btn-dropdown label = "+20" style = "margin-left:5px" >

          </q-btn-dropdown>
      <!--     <q-btn-dropdown  outline :label="color" class ="full-width" style = "min-width:220px">
            <q-color-picker
              default-value="rgba"
              format-model="rgba"
              :value="activeColor"
              @input="val => { colorChange(val, index) }"
            />
          </q-btn-dropdown> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
import regxStr from 'src/assets/regx'

export default{
  props: ['colordata'],
  watch:{
    'hexa': function () {
      this.hex = this.modals.selectColor.hex
    },
    'colors_': {
      handler (value) {
        console.log(value)
      },
      deep:true
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
      if(this.colordata)
        return this.colordata.data;
      else
        return []
    },
    hexa() {
      return this.modals.selectColor.hex
    }
  },
  data () {
    return {
      pickers: [
        'Background',
        'Icon',
        'Text'
      ],
      activeColorName: 'pick a template',
      activeColors: [],
      activeColor: ''
    }
  },
  methods: {
    ...mapActions(['_modals']),
    openSelector(color, index) {
        this._modals({'selectColor': {
          'open': true,
          'hex': color.color,
          'index': index
        }})
    },
    setBg(paint) {
      return 'background-color:' + paint;
    },
    colorChange (color, index) {
      this.activeColor = regxStr.constructRgba(color)
      this.colors_[index] = this.activeColor
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