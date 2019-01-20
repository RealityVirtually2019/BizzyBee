<template>
  <div class="gardener">
    <a-scene embedded> <Planet position="0 0 -13"></Planet> </a-scene>
    <div class="header">
      <h1 class="title">BizzyBee</h1>
      <p class="desc">{{ garden.desc }}</p>
      <div class="for">
        <p class="forWho">
          This is for <b>{{ garden.name }}</b>
        </p>
        <p class="forWhen">
          <span>Deliver </span><b><timeago :datetime="garden.sendItAt"/></b>
        </p>
      </div>
    </div>
    <!-- <el-button @click="shareGardener">Share</el-button> -->
    <div class="btns">
      <el-button @click="addFlower">Let's Plant Flower</el-button>
    </div>
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
.gardener {
  color: white;
  text-shadow: 1px 1px 4px #00000080;
}

.title {
  text-align: center;
  font-size: 48px;
  margin: 5px 0px;
}

.header {
  $p: 15px;
  width: calc(100% - #{$p} * 2);
  position: fixed;
  top: 0px;
  padding: 0px $p;
  // background-color: #69a5d396;
  background-color: #00000096;

  overflow: hidden;
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);

  .desc {
    text-align: justify;
    margin: 10px 0px;
    font-weight: lighter;
  }

  .for {
    font-size: 12px;
    margin-top: 16px;
    padding-bottom: 8px;

    > p {
      margin: 5px 0px;

      b {
        font-size: 14px;
      }
    }
  }
}

.btns {
  position: fixed;
  text-align: center;
  width: 100%;
  bottom: 10px;

  button {
    background-color: #00000080;
    color: white;
  }
}

a-scene {
  position: fixed;
  display: block;
  bottom: 0px;
  height: 100vh;
  width: 100%;
}
</style>
