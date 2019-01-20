<template>
  <div class="enterVR">
    <h4>This for {{ garden.name }}</h4>
    <p>{{ garden.desc }}</p>
    <a-scene> <Planet></Planet> </a-scene>
    <a-entity position="0 -7 -7">
      <a-camera></a-camera>
    </a-entity>
    <p></p>
    <el-button @click="putSeed">Enter VR</el-button>
  </div>
</template>

<script>
// @ is an alias to /src
import Planet from '@/components/Planet'

import { db } from '@/services/firebase'

export default {
  name: 'Garden',
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
