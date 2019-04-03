<template>
 <q-page-sticky expand position="bottom"  >
    <q-toolbar style = "display:flex;justify-content:flex-end">
      <q-btn flat @click="save" label="save" icon-right = "save" :loading="buttonLoader"/>
    </q-toolbar>
  </q-page-sticky>
</template>
<script>
import {mapGetters, mapActions } from 'vuex'
import {_purl} from 'src/assets/purl'
import {route} from 'src/assets/backend'
import {_glob} from 'src/assets/global'
export default {
  computed: {
    ...mapGetters(['scripts'])
  },
  data () {
    return {
      buttonLoader: false,
    }
  },
  methods: {
    save() {
      console.log()
      this.buttonLoader = true
      _purl.put(route.scenes.save, {
        init: this.scripts.initial,
        data: this.scripts.script,
        path: this.scripts.strimage,
      }).then(r=> {
        console.log(r)
        this.buttonLoader = false
      }).catch(e => {
        _glob.notify(e.response.data.message, 'negative')
        this.buttonLoader = false
      });
    }
  }
}
</script>