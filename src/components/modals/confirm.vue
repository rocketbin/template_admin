<template>
  <q-modal v-model="confirmModal">
    <div class="layout-padding">
      <small>{{confirm.label}}</small>
    </div>
    <div class = "full-width row flex" style=  "justify-content:space-between">
      <q-btn
        class = "col-6"
        style="self-justify:flex-start"
        icon="close"
        flat
        color="red"
        v-close-overlay
      />
      <q-btn
        class = "col-6"
        icon="check"
        flat
        color="primary"
        @click = "confirmAction"
        v-close-overlay
      />
    </div>
  </q-modal>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
export default {
  computed: {
    ...mapGetters(['modals']),
    confirmModal: {
      get () {
        return this.modals.confirm.open
      },
      set (value) {
        this._modals({'confirm': {'open': value }})
      }
    },
    confirm () {
      return this.modals.confirm
    }
  },
  methods: {
    ...mapActions(['_modals']),
    confirmAction() {
      this.confirm.callback()
    }
  }
}
</script>