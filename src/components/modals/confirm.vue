<template>
  <q-modal v-model="confirmModal">
    <div class="layout-padding">
      <small>{{confirm.label}}</small>
    </div>
    <div class = "full-width row flex" style=  "justify-content: space-between">
      <q-btn
        style="self-justify:flex-start"
        icon="close"
        flat
        color="red"
        v-close-overlay
      />
      <div>
        <q-btn
          v-for = "(button, index) in modals.confirm.buttons"
          :icon="button.icon"
          :label="button.label ? button.label : ''"
          flat
          :color="button.color"
          @click = "button.action()"
          v-close-overlay
        >
          <q-tooltip v-if = "button.tooltip">
            {{button.tooltip}}
          </q-tooltip>
        </q-btn>
    </div>
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