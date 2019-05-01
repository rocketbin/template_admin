<template>
  <div>
    <colorpicker  :colordata="colordata"/>
  </div>  
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
export default {
  data () {
    return {
      colordata: []
    }
  }
}
</script>