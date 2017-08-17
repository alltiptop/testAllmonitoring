<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
html, * {
  box-sizing: border-box;
}
#app {
  font-family: 'Sans', sans-serif;
  padding: 40px;
  max-width: 1400px;
  margin: 0 auto;
  min-width: 1140px;
}
</style>
