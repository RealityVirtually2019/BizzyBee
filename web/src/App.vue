<template>
  <div id="app"><router-view class="routerView" /></div>
</template>

<style lang="scss">
body {
  margin: 0px;
  user-select: none;
  overflow: hidden;
  width: 100vw;
  height: 100vh;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}

.routerView {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
