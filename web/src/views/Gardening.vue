<template>
  <div class="gardening">
    <div class="header">
      <h1 class="title">BizzyBee</h1>
      <div class="for">
        <p class="forWho">
          This is for <b>{{ garden.name }}</b>
        </p>
        <p class="forWhen">
          <span>Deliver</span> <b> <timeago :datetime="garden.sendItAt" /> </b>
        </p>
      </div>
    </div>

    <h3 class="chooseFlower">Choose Flower</h3>
    <vue-glide
      v-model="imgIdx"
      :options="{
        peek: 80,
        perView: 1,
        dragThreshold: 20,
        swipeThreshold: 20,
        animationDuration: 70,
      }"
    >
      <vue-glide-slide v-for="img in imgs" :key="img">
        <div class="imgContainer">
          <img class="img" :src="`img/flowers/${img}`" alt />
        </div>
      </vue-glide-slide>
    </vue-glide>
    <!-- <p>{{ imgIdx }}</p> -->
    <div class="form">
      <el-form
        class="form"
        label-width="120px"
        label-position="top"
        size="mini"
      >
        <el-form-item label="Name">
          <el-input v-model="name" placeholder="Your Name"></el-input>
        </el-form-item>
        <el-form-item label="Your Message (Optional)">
          <el-input
            v-model="msg"
            type="textarea"
            :rows="2"
            placeholder="for someone for some reason"
          ></el-input>
        </el-form-item>
        <el-form-item label="5 Secs Voice (Optional)">
          <el-button v-if="recorder" @click="recordVoice"
            >Record Voice</el-button
          >
          <span v-if="countDown"> <span></span> {{ countDown }} secs </span>
        </el-form-item>
      </el-form>

      <progress
        v-show="false"
        id="uploader"
        ref="uploader"
        value="0"
        max="100"
      ></progress>
    </div>
    <div class="btns">
      <el-button :disabled="!ready || !name" @click="putSeed"
        >Put the seed</el-button
      >
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { db, storage } from '@/services/firebase'

import { Glide, GlideSlide } from 'vue-glide-js'

// import '@/utils/recorder.js'
import Recorder from 'recorder-js'

export default {
  name: 'Gardening',
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
      voiceUrl: '',
      countDown: 0,
      ready: true,
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
      recorder: null,
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
  created() {
    // webkit shim
    window.AudioContext = window.AudioContext || window.webkitAudioContext
    navigator.getUserMedia =
      navigator.getUserMedia || navigator.webkitGetUserMedia
    window.URL = window.URL || window.webkitURL

    this.audio_context = new AudioContext()

    this.recorder = new Recorder(this.audio_context, {
      // onAnalysed: data => console.log(data),
    })

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(stream => this.recorder.init(stream))
      .then(() => {
        console.log('Recorder initialised.', this.recorder)
      })
      .catch(err => console.log('No live audio input: ', err))
  },
  methods: {
    recordVoice() {
      this.ready = false

      let sec = 5
      this.countDown = 5
      const countDownInterval = setInterval(() => {
        this.countDown -= 1
      }, 1000)

      this.recorder.start().then(() => {
        setTimeout(() => {
          this.stopRecord()
          this.countDown = 0

          clearInterval(countDownInterval)
        }, sec * 1000)
      })
    },
    stopRecord() {
      this.recorder.stop().then(({ blob, buffer }) => {
        // create WAV download link using audio data blob
        this.uploadVoice(blob)
        // this.recorder.clear()
      })
    },
    uploadVoice(blob) {
      this.ready = false

      const url = URL.createObjectURL(blob)
      console.log({ url, blob })

      const uploader = this.$refs.uploader

      const uploadTime = new Date().toISOString()
      const filename = `voice-${uploadTime}`

      const filepath = `${filename}.wav`
      //set storage ref
      let storageRef = storage.ref('voices/' + filepath)
      //upload file
      let task = storageRef.put(blob)
      task.on(
        'state_changed',
        // progress
        snapshot => {
          let percentage =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          uploader.value = percentage
        },
        // error
        err => {
          console.log(err)
        },
        // complete
        () => {
          console.log('complete upload')

          return storageRef
            .getDownloadURL()
            .then(url => {
              console.log('got voice url', url)

              this.voiceUrl = url
              uploader.value = 0
              this.ready = true
            })
            .catch(error => {
              console.error(error)
            })
        }
      )
    },
    putSeed() {
      const msgsRef = db.ref(`gardens/${this.gardenKey}/msgs`)
      const msg = {
        name: this.name,
        msg: this.msg,
        flower: this.imgIdx,
        voiceUrl: this.voiceUrl,
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
.gardening {
  overflow: auto;
}

.header {
  $p: 15px;
  width: calc(100% - #{$p} * 2);
  top: 0px;
  padding: 0px $p;

  overflow: hidden;

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

.chooseFlower {
  margin-left: 5%;
}

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

.form {
  clear: both;
  margin: 10px 5%;

  /deep/ {
    label {
      padding: 2px;
      line-height: 1;
      font-weight: 500;
    }

    .el-form-item {
      margin-bottom: 8px;
    }
  }
}

progress {
  background-color: #333;
  width: 20%;
}

.btns {
  text-align: center;
  margin-top: 20px;
  width: 100%;
  bottom: 20px;
  margin: 20px 0px;

  button {
    // background-color: #00000080;
    // color: white;
  }
}
</style>
