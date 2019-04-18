<template>
  <div style = "margin-top:15px">
    <div  v-for="(text, index) in texts">
      <div style = "display:flex;;align-items: center;width:100%">
        <div class = "full-width" style = "display:flex;margin:20px">
          <div class="full-width" style = "display:flex;justify-content:flex-start;align-items:center; border: 2px solid grey; border-radius: 5px;padding-left:13px" v-if="readonly">
            <small>
              {{text.text}}
            </small>
          </div>
          <q-input v-model="text.text" v-else />
          <div style = "margin:10px">
            <q-btn class = "shadow-3" round size="xs" color = "green-13" />
          </div>
        </div>
      </div>
      <q-btn-dropdown label = "variable list" outline style = "">
        <q-list >
          <q-item>
            <q-item-main>
              <q-item-tile label>Item</q-item-tile>
            </q-item-main>
          </q-item>
        </q-list>
      </q-btn-dropdown>
    </div>
  </div>
</template>
<script>
export default {
  props: ['textdata'],
  computed : {
    texts() {
      return this.textdata
    }
  },
  data () {
    return {
      readonly: true,
      activeColor: ''
    }
  },
  methods: {
    getStyle (color) { 
      return `background-color:${color};margin:5px`;
    },
    colorChange (color, index) {
      this.activeColor = color
      this.texts[index].color = this.activeColor
    },
  }
}
</script>