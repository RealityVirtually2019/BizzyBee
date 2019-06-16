<template>
  <div id="app">
    <router-view class="router-view" />
    <ToMobile />
  </div>
</template>

<style>
/* https://fonts.google.com/specimen/Raleway?selection.family=Raleway:200,200i,400,400i,700,700i */
@import url('https://fonts.googleapis.com/css?family=Raleway:200,200i,400,400i,700,700i&display=swap&subset=latin-ext');

* {
  font-family: 'Raleway', Helvetica, sans-serif;
}
</style>

<script>
// @ is an alias to /src
import ToMobile from '@/views/ToMobile'

export default {
  name: 'App',
  components: {
    ToMobile,
  },
}
</script>

<style lang="scss">
body {
  margin: 0px;
  user-select: none;
  overflow: hidden;
  width: 100vw;
  height: 100vh;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100vw;
  height: 100vh;

  .router-view {
    width: 100%;
    height: 100%;
  }
}

h1 {
  font-size: 40px;
  line-height: 40px;
  letter-spacing: 0.04em;
  color: $title;
  font-weight: 200;
  font-style: normal;
}

p,
.label {
  font-size: 15px;
  line-height: 20px;
  letter-spacing: 0.04em;
  color: $normal;
  font-weight: 400;
  font-style: normal;
}

.formTitle {
  font-size: 15px;
  line-height: 18px;
  letter-spacing: 0.04em;
  color: $title;
  font-weight: 700;
  font-style: normal;
}

.btn {
  color: white !important;
  background-color: $secondary !important;
  border-width: 0px !important;
}
</style>
