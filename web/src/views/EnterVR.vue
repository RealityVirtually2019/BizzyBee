<template>
  <div class="enterVR">
    <a-scene> <Planet></Planet> </a-scene>
    <div class="header">
      <h1 class="title">BizzyBee</h1>
      <p>Hi {{ garden.name }}</p>
      <p>{{ garden.desc }}</p>
    </div>
    <p></p>
  </div>
</template>

<script>
// @ is an alias to /src
import Planet from '@/components/Planet'

import { db } from '@/services/firebase'

export default {
  name: 'EnterVR',
  firebase() {
    return {
      dbLink: {
        source: db.ref('links/' + this.linkKey),
        asObject: true,
        cancelCallback: () => {},
        readyCallback: () => {},
      },
    }
  },
  components: {
    Planet,
  },
  data() {
    return {
      dbLink: {},
      dbGarden: {},
      show: false,
    }
  },
  computed: {
    linkKey() {
      return this.$route.params.linkKey
    },
    gardenKey() {
      return this.dbLink['.value']
    },
    garden() {
      return this.dbGarden || {}
    },
  },
  watch: {
    $route() {
      // react to route changes...
    },
    gardenKey(gardenKey) {
      if (gardenKey)
        this.$bindAsObject(
          'dbGarden',
          db.ref('gardens/' + gardenKey),
          null,
          () => (this.show = true)
        )
    },
  },
  created() {},
}
</script>

<style scoped>
.header {
  margin: 0px 20px;
  text-shadow: 1px 1px 4px #00000015;
}

a-scene {
  position: fixed;
  display: block;
  bottom: 0px;
  height: 100vh;
  width: 100%;
}
</style>
