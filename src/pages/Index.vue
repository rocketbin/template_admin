<template>
  <q-page class="flex flex-center">
    <img alt="Quasar logo" src="~assets/homeprezzo.png" style= "height:auto;width:16%">
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { _glob } from 'src/assets/global'
import {route, axe} from 'assets/backend'
import {_purl} from 'src/assets/purl'
import { date } from 'quasar'

export default {
	data() {
		return {

		}
	},
  mounted () {
    _purl._p(route.test).then(r => {
      console.log(r.data);
    })
  }
}
</script>
