<template>
  <div class="gardener">
    <h4>This for {{ garden.name }}</h4>
    <p>{{ garden.desc }}</p>
    <timeago :datetime="garden.sendItAt" />
    <a-scene> <Planet></Planet> </a-scene>
    <CompactColorPicker v-model="color" />
    <p></p>
    <el-button @click="putSeed">Put the seed</el-button>
  </div>
</template>

<script>
// @ is an alias to /src
import Planet from '@/components/Planet'
import { Compact } from 'vue-color'

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
    CompactColorPicker: Compact,
  },
  data() {
    return {
      dbGarden: {},
      msg: '',
      color: {
        hex: '#194d33',
      },
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
  methods: {
    putSeed() {
      const msgsRef = db.ref(`gardens/${this.gardenKey}/msgs`)
      const msg = {
        msg: this.msg,
        color: this.color,
      }
      msgsRef.push(msg)
    },
  },
}
</script>
