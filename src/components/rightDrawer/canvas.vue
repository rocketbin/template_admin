<template>
  <div class="bg-grey-8" style="padding: 10px;min-height:100px;color:white!important">
        <q-field
          inverted
          class= "contentColors"
          icon="border_horizontal"
        >
          <q-slider
            style = "margin-top:20px"
            v-model="canvWidth"
            :min="320"
            :max="1280"
            :step="2"
            label
            snap
          />
        </q-field>
        <q-field
          inverted
          class= "contentColors"
          icon="border_vertical"
        >
          <q-slider
            style = "margin-top:20px"
            v-model="canvHeight"
            :min="320"
            :max="1280"
            :step="2"
            label
            snap
          />


        </q-field>
      </div>
</template>
<script>
export default{
  data () {
    return {
      selectedValue:20,
      canvWidth: 480,
      canvHeight: 320,
    }
  } 
}
</script>