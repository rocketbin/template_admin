<template>
  <div>
    <div >
      <q-list highlight>
        <q-list-header>Images</q-list-header>
        <q-item v-for="img in imagedata">
          <q-item-side avatar="statics/def.png" />
          <q-item-main   >
            <small>{{ img.id }}</small>
            <div class = "flex" style = "justify-content:space-between" >
              <div>
                <q-input v-model="img._width" float-label="width" />
              </div>
              <div>
                <q-input v-model="img._height" float-label="height" />
              </div>
            </div>
          </q-item-main>
          <q-item-side right>
            <div class = "flex" style="align-items:baseline">
              <div>
                <q-checkbox v-model="img.distort" label="distort" />
              </div>
              <div>
                <q-checkbox v-model="img.fill" label="fill" />
              </div>
            </div>
          </q-item-side>
        </q-item>
      </q-list>
    </div>
  </div>
</template>
<script>
export default {
  props: ['imagedata'],
  data () { 
    return {
      checked: true
    }
  }
}
</script>