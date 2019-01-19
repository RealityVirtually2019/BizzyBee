<template>
  <div class="gardener">
    <h2>BizzyBee</h2>
    <p>This 123 for {{ garden.name }}</p>
    <!-- <timeago :datetime="garden.sendItAt" /> -->

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
        <el-form-item label="Record Voice">
          <el-button v-if="recorder" @click="recordVoice">
            Record Voice
          </el-button>
          <span v-if="countDown"> {{ countDown }} secs</span>
        </el-form-item>
      </el-form>

      <progress
        v-show="false"
        id="uploader"
        ref="uploader"
        value="0"
        max="100"
      ></progress>

      <el-button :disabled="!ready || !name" @click="putSeed">
        Put the seed
      </el-button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { db, storage } from '@/services/firebase'

import { Glide, GlideSlide } from 'vue-glide-js'

import '@/utils/recorder.js'

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

    navigator.getUserMedia({ audio: true }, this.startUserMedia, function(e) {
      console.log('No live audio input: ' + e)
    })
  },
  methods: {
    startUserMedia(stream) {
      var input = this.audio_context.createMediaStreamSource(stream)
      console.log('Media stream created.')
      // Uncomment if you want the audio to feedback directly
      //input.connect(audio_context.destination);
      //__log('Input connected to audio context destination.');

      // eslint-disable-next-line no-undef
      this.recorder = new Recorder(input)
      console.log('Recorder initialised.')
    },
    recordVoice() {
      this.ready = false

      let sec = 5
      this.countDown = 5
      const countDownInterval = setInterval(() => {
        this.countDown -= 1
      }, 1000)

      this.recorder.record()
      setTimeout(() => {
        this.stopRecord()
        this.countDown = 0

        clearInterval(countDownInterval)
      }, sec * 1000)
    },
    stopRecord() {
      this.recorder.stop()

      // create WAV download link using audio data blob
      this.uploadVoice()

      this.recorder.clear()
    },
    uploadVoice() {
      this.ready = false

      this.recorder.exportWAV(blob => {
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
      })
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

progress {
  background-color: #333;
  width: 20%;
}
</style>
