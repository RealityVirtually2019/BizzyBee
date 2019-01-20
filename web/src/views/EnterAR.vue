<template>
  
    <a-scene embedded arjs='sourceType: webcam;'>
      <a-box position='0 0.5 0' material='opacity: 0.5;'></a-box>
      <a-entity position="0 1.5 0" scale="0.18 0.18 0.18">
        <Planet></Planet>
      </a-entity>
      <a-marker-camera preset='hiro'></a-marker-camera>
	  </a-scene>
  
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
