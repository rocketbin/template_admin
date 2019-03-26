<template>
  <q-layout view="lHh Lpr lFf" class = "q-layout-animate">
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
          
          <div style = "display:flex;align-items:center;justify-content:flex-end">
            <img alt="homeprezzo" src="~assets/homeprezzo.png" style= "height:18px;" >
            <q-btn
              size="sm"
              round
              inverted
              flat
              @click = "toggleRightDrawer"
              icon ="reorder"
            />
          </div>

  <!--         HomePrezzo
          <div slot="subtitle">v{{ $q.version }}</div> -->
        </q-toolbar-title>
      </q-toolbar>
    </q-layout-header>
    <q-layout-drawer
      overlay
      side="right"
      v-model="rightDrawer"
      content-class="bg-whitesmoke"
      dark
    >
    <colorpicker v-if="config.rightDrawer.colorpicker"/>
  </q-layout-drawer>
    <q-layout-drawer
      v-model="leftDrawerOpen"
      @mouseover="minified = false"
      @mouseout="minified = true"
      :mini="minified"
      inverted
      content-class="bg-primary"
    >
      <q-list
        no-border
        link
        inset-delimiter
        inverted
        style="color:white"
      >
        <div style = "height:150px;display:flex;align-items:flex-end;justify-content:center;" class=  "bg-light">
          <q-item @click.native="">
            <q-item-side style="color:white" icon="fas fa-user-circle"  />
            <q-item-main label="Nikko Mesina" sublabel="nikko@homeprezzo.com.au" />
          </q-item>
        </div>

        <q-item @click.native="" >
          <q-item-side style="color:white" icon="chat"  />
          <q-item-main label="Messages" />
        </q-item>

        <q-item @click.native="pushRoute('admin')" active>
          <q-item-side style="color:white" icon="security"  />
          <q-item-main label="Admin" />
        </q-item>

        <q-item exact to ="admin">
          <q-item-side style="color:white" icon="record_voice_over"  />
          <q-item-main label="Forum" />
        </q-item>

        <q-item @click.native="">
          <q-item-side style="color:white" icon="rss feed"  />
          <q-item-main label="Twitter" />
        </q-item>
      </q-list>

      <q-list
        slot="mini"
        no-border
        link
        inset-delimiter
        inverted
        style="padding-top:110px;color:white"
      >

        <q-item @click.native="" >
          <q-item-side style="color:white" icon="fas fa-user-circle"  />
        </q-item>

        <q-item @click.native="">
          <q-item-side style="color:white" icon="chat"  />
        </q-item>

        <q-item @click.native="pushRoute('admin')" active>
          <q-item-side style="color:white" icon="security"  />
        </q-item>

        <q-item @click.native="">
          <q-item-side style="color:white" icon="record_voice_over"  />
        </q-item>
        <q-item @click.native="">
          <q-item-side style="color:white" icon="rss feed"  />
        </q-item>
      </q-list>
    </q-layout-drawer>

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
      leftDrawerOpen: true,
      minified: true,
    }
  },
  methods: {
    ...mapActions(['_config']),
    openURL,
    pushRoute(route) {
      this.$router.push(route)
    },
    toggleRightDrawer() {
      if(this.rightDrawer) {
        this.rightDrawer = false;
      } else {
        this.rightDrawer = true;
      }
    }
  },
  mounted () {
  }
}
</script>

<style>
</style>
