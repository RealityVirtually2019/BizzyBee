<template>
  <div class="garden">
    <template v-if="show">
      <h4>This for {{ garden.name }}</h4>
      <p>{{ garden.desc }}</p>
      <timeago :datetime="garden.sendItAt" />
    </template>
  </div>
</template>

<script>
// @ is an alias to /src
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
  created() {
    // this.$bindAsObject('user', db.ref('links'), null, () => console.log('Ready fired!'))
  },
}
</script>
