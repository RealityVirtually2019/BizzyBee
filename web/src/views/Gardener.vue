<template>
  <div class="gardener">
    <h4>This for {{ garden.name }}</h4>
    <p>{{ garden.desc }}</p>
    <timeago :datetime="garden.sendItAt" />
    <p>See How it works</p>
    <a-scene> <Planet></Planet> </a-scene>
    <el-button>Add You Flower</el-button>
  </div>
</template>

<script>
// @ is an alias to /src
import { db } from '@/services/firebase'

export default {
  name: 'Gardener',
  firebase() {
    return {
      dbGarden: {
        source: db.ref('gardens/' + this.gardenKey),
        asObject: true,
        cancelCallback: () => {},
        readyCallback: () => {},
      },
    }
  },
  data() {
    return {
      dbGarden: {},
    }
  },
  computed: {
    garden() {
      return this.dbGarden || {}
    },
    gardenKey() {
      return this.$route.params.gardenKey
    },
  },
  watch: {
    $route() {
      // react to route changes...
    },
  },
  created() {
    // this.$bindAsObject('user', db.ref('links'), null, () => console.log('Ready fired!'))
  },
}
</script>
