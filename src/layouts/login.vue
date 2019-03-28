<template>
  <q-layout view="lHh Lpr lFf" class = "bg-crossfade" :style="'background: url('+baseUrl+currBG+')'">
    <q-layout-header>
      <q-toolbar
        color="primary"
        inverted
        :inverted="$q.theme === 'ios'"
      >
<!--         <q-btn
          flat
          dense
          round
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn> -->

        <q-toolbar-title >
          
          <div style = "display:flex;align-items:center;justify-content:flex-start">
            <img alt="homeprezzo" src="assets/homeprezzo.png" style= "height:18px;" >
          </div>

  <!--         HomePrezzo
          <div slot="subtitle">v{{ $q.version }}</div> -->
        </q-toolbar-title>
      </q-toolbar>
    </q-layout-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'
import {mapGetters, mapActions} from 'vuex'
export default {
  computed: {
    ...mapGetters(['config']),
    rightDrawer: {
      get () {
        return this.config.rightDrawer.open
      },
      set(value) {
      this._config({'rightDrawer': {
        'open': value,
        'colorpicker': value
      }});
      }
    }
  },
  data () { 
    return {
      baseUrl : 'assets/',
      currBG : 'bg1.jpg',
      bgImageArray : ["bg1.jpg", "bg2.jpg", "bg3.jpg"],
      leftDrawerOpen: true,
      minified: true,
      secs: 10
    }
  },
  methods: {
    ...mapActions(['_config']),
    backgroundSequence(){
      window.clearTimeout();
      var k = 0;
      var images = this.bgImageArray;
      var self = this;
      for (var i = 0; i < images.length; i++) {
        setTimeout(function(){ 
          self.currBG = images[k];
        if ((k + 1) === images.length) { setTimeout(function() { self.backgroundSequence() }, (self.secs * 1000))} else { k++; }      
        }, (self.secs * 1000) * i)  
      }
    }
  },
  mounted () {
    var base = this.baseUrl;
    this.bgImageArray.forEach(function(img){
        new Image().src = base + img; 
    });
    this.backgroundSequence();
  } 
}
</script>

<style>
.bg-crossfade{
  margin: 0;
  background-size: cover !important;
  background-repeat: no-repeat !important;
  background-position: center !important;
  transition: background .2s linear !important;
  transition: 3s !important;
}
</style>
