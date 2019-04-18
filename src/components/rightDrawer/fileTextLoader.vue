<template>
  <div>
    <div v-for="img in imagedata">
      <q-list highlight>
        <q-list-header>Images</q-list-header>
        <q-item>
          <q-item-main :label="img.id"  />
          <q-item-side right>
            <!-- <q-item-tile icon="collections" color="green" /> -->
            <q-btn-dropdown label = "0" style = "margin-left:5px" >

            </q-btn-dropdown>
          </q-item-side>
        </q-item>
      </q-list>
    </div>
  </div>
</template>
<script>
export default {
  props: ['imagedata']
}
</script>