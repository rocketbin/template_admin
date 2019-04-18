<template>
  <div id="q-app">
    <!-- <addTemplateModal/> -->
    <selectColorModal/>
    <newTemplateModal/>
    <confirm/>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
</style>
