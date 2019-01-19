<template>
  <div class="gardener">
    <h2>BizzyBee</h2>
    <h4>This 123 for {{ garden.name }}</h4>
    <timeago :datetime="garden.sendItAt" />

    <vue-glide
      v-model="imgIdx"
      :options="{
        peek: 100,
        perView: 1,
        dragThreshold: 20,
        swipeThreshold: 20,
        animationDuration: 70,
      }"
    >
      <vue-glide-slide v-for="img in imgs" :key="img">
        <div class="imgContainer">
          <img class="img" :src="`img/flowers/${img}`" alt="" />
        </div>
      </vue-glide-slide>
    </vue-glide>
    <p>{{ imgIdx }}</p>

    <div id="form">
      <el-form label-width="100px">
        <el-form-item label="Name">
          <el-input v-model="name" placeholder="Who"></el-input>
        </el-form-item>
        <el-form-item label="Your Message">
          <el-input
            v-model="msg"
            type="textarea"
            :rows="2"
            placeholder=" (Optional) What's this for someone for some reason"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <el-button @click="putSeed">Put the seed</el-button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { db } from '@/services/firebase'

import { Glide, GlideSlide } from 'vue-glide-js'

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
    Glide,
    GlideSlide,
  },
  data() {
    return {
      dbGarden: {},
      name: '',
      msg: '',
      imgIdx: 2,
      imgs: [
        'Blue-Flower-2.png',
        'Blue-Flower-3.png',
        'bulb-flower-2.png',
        'bulb-flower-3-blue.png',
        'bulb-flower-3-red.png',
        'flower_1_bloom.png',
        'flower_1_sapling.png',
        'flower_1_sprout.png',
        'flower_2_bloom.png',
      ],
    }
  },
  computed: {
    garden() {
      return this.dbGarden || {}
    },
    gardenKey() {
      return this.$route.params.gardenKey
    },
    imgUrl() {
      const imgFile = this.imgs[this.imgIdx]
      return `img/flowers/${imgFile}`
    },
  },
  watch: {
    $route() {
      // react to route changes...
    },
  },
  methods: {
    putSeed() {
      const msgsRef = db.ref(`gardens/${this.gardenKey}/msgs`)
      const msg = {
        name: this.name,
        msg: this.msg,
        flower: this.imgIdx,
      }
      msgsRef.push(msg).then(() => {
        console.log('Garden has been built!')
        this.$router.push(`/gardener/${this.gardenKey}`)
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.imgContainer {
  $h: 200px;
  width: 100%;
  height: $h;
  overflow: hidden;
  text-align: center;

  .img {
    max-height: $h;
  }
}

#form {
  clear: both;
}
</style>
