<template>
  <div class="gardener">
    <h2>BizzyBee</h2>
    <h4>This 123 for {{ garden.name }}</h4>
    <timeago :datetime="garden.sendItAt" />

    <vue-glide
      v-model="imgIdx"
      :options="{
        peek: 60,
        perView: 1,
        dragThreshold: 40,
        swipeThreshold: 20,
        animationDuration: 70,
      }"
    >
      <vue-glide-slide v-for="img in imgs" :key="img">
        <img class="img" :src="img" alt="" />
      </vue-glide-slide>
    </vue-glide>
    <p>{{ imgIdx }}</p>

    <div id="form">
      <el-form label-width="200px">
        <el-form-item label="Name">
          <el-input v-model="name" placeholder="Who"></el-input>
        </el-form-item>
        <el-form-item label="Your Message (Optional)">
          <el-input
            v-model="msg"
            type="textarea"
            :rows="2"
            placeholder="What's this for someone for some reason"
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
import Planet from '@/components/Planet'

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
    Planet,
    Glide,
    GlideSlide,
  },
  data() {
    return {
      dbGarden: {},
      name: '',
      msg: '',
      color: {
        hex: '#194d33',
      },
      imgIdx: 2,
      imgs: [
        'https://dummyimage.com/800/100000/f0f0f0',
        'https://dummyimage.com/800/001000/00f000',
        'https://dummyimage.com/800/000010/0000f0',
        'https://dummyimage.com/800/000000/f0f000',
        'https://dummyimage.com/800/000000/00f000',
        'https://dummyimage.com/800/000000/00ff00',
        'https://dummyimage.com/800/000000/0000ff',
        'https://dummyimage.com/800/000000/f0000f',
        'https://dummyimage.com/800/000000/0fff0f',
        'https://dummyimage.com/800/000000/f0f000',
        'https://dummyimage.com/800/000000/0f00f0',
        'https://dummyimage.com/800/000000/f00f0f',
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
    imgId() {
      return this.imgIdx
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
        msg: this.msg,
        color: this.color,
        imgId: this.imgId,
      }
      msgsRef.push(msg)
    },
  },
}
</script>

<style lang="scss" scoped>
.img {
  max-width: 100%;
}

#form {
  clear: both;
}
</style>
