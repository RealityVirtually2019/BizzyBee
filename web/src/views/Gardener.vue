<template>
  <div class="gardener">
    <h4>This for {{ garden.name }}</h4>
    <p>{{ garden.desc }}</p>
    <timeago :datetime="garden.sendItAt" />
    <p>See How it works</p>
    <el-button @click="shareGardener">Share</el-button>
    <Planet class="planet" embedded position="0 0 -13" :msgs="msgs"></Planet>
    <el-button @click="addFlower">Add You Flower</el-button>
  </div>
</template>

<script>
// @ is an alias to /src
import Planet from '@/components/Planet'

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
  components: {
    Planet,
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
      msgs(){
        return this.garden.msgs ?  Object.values(this.garden.msgs) : []
      }
  },
  watch: {
    $route() {
      // react to route changes...
    },
  },
  created() {
    // this.$bindAsObject('user', db.ref('links'), null, () => console.log('Ready fired!'))
  },
  methods: {
    addFlower() {
      this.$router.push(`/gardening/${this.gardenKey}`)
    },
    shareGardener() {
      if (navigator.share) {
        navigator
          .share({
            title: `gARden For [${this.garden.recipient}]`,
            text: this.desc,
            url: window.location.href,
          })
          .then(() => console.log('Successful share'))
          .catch(error => console.log('Error sharing', error))
      } else {
        alert('Share function is not ready for IOS.')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.planet {
  display: block;
  height: 50vh;
  width: 100%;
}
</style>
