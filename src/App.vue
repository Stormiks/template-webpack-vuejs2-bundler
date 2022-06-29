<template>
  <div id="app">{{ msg }}</div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      msg: 'Example'
    }
  }
}
</script>

<style lang="less" scoped>
html, body {
  margin: 0;
  height: 100vh;
}
</style>
