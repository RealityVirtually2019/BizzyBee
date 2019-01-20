<template>
  <a-scene>
    <a-assets>
      <a-asset-item
        id="Flower_3_bloom-dae"
        src="./flowers/Flower1/Flower_3_bloom.dae"
      ></a-asset-item>
      <a-asset-item
        id="Flower_3_sapling-dae"
        src="./flowers/Flower1/Flower_3_sapling.dae"
      ></a-asset-item>
      <a-asset-item
        id="Flower_3_sprout-dae"
        src="./flowers/Flower1/Flower_3_sprout.dae"
      ></a-asset-item>

      <a-asset-item
        id="Flower_4_bloom-dae"
        src="./flowers/Flower2/Flower_4_bloom.dae"
      ></a-asset-item>
      <a-asset-item
        id="Flower_4_sapling-dae"
        src="./flowers/Flower2/Flower_4_sapling.dae"
      ></a-asset-item>
      <a-asset-item
        id="Flower_4_sprout-dae"
        src="./flowers/Flower2/Flower_4_sprout.dae"
      ></a-asset-item>

      <a-asset-item
        id="Flower_5_bloom-dae"
        src="./flowers/Flower3/flower_5_bloom.dae"
      ></a-asset-item>
      <a-asset-item
        id="Flower_5_sapling-dae"
        src="./flowers/Flower3/flower_5_sapling.dae"
      ></a-asset-item>
      <a-asset-item
        id="Flower_5_sprout-dae"
        src="./flowers/Flower3/flower_5_sprout.dae"
      ></a-asset-item>

      <a-asset-item
        id="BubingaTreeBloom-gltf"
        src="./flowers/BubungaTree_gltf/BubingaTreeBloom.gltf"
      ></a-asset-item>
      <a-asset-item
        id="BubingaTreeSapling-gltf"
        src="./flowers/BubungaTree_gltf/BubingaTreeSapling.gltf"
      ></a-asset-item>
      <a-asset-item
        id="BubingaTreeSprout-gltf"
        src="./flowers/BubungaTree_gltf/BubingaTreeSprout.gltf"
      ></a-asset-item>

      <a-asset-item
        id="AppleTree_Bloom-gltf"
        src="./flowers/AppleTree_gltf/AppleTree_Bloom.gltf"
      ></a-asset-item>
      <a-asset-item
        id="AppleTree_Sapling-gltf"
        src="./flowers/AppleTree_gltf/AppleTree_Sapling.gltf"
      ></a-asset-item>
      <a-asset-item
        id="AppleTree_Sprout-gltf"
        src="./flowers/AppleTree_gltf/AppleTree_Sprout.gltf"
      ></a-asset-item>
    </a-assets>

    <a-sky color="#F9ECA0"></a-sky>

    <a-camera id="camera">
      <a-cursor raycaster="objects: .clickable">
        <a-entity
          :visible="msg ? 'true' : 'false'"
          named-text
          :text="msgText"
          position="0 -0.2 -1"
          material="transparent:true; color: #5b9f96; side: double; opacity:0.25"
          geometry="primitive: plane; width: 2; height: 0.8;"
        ></a-entity>
      </a-cursor>
    </a-camera>

    <a-sphere
      planet-gaze-rotator
      position="0 -2 -13"
      :radius="planetRadius"
      src="img/planet 1.png"
    >
      <!--<a-light type="ambient" color="#ffffff" intensity="" ></a-light>-->
      <b-flowerHolder
        v-for="(msg, idx) in popMsgs"
        :key="idx"
        :planet-radius="planetRadius"
        :type="msg.flower"
        :rot-x="msg.rotationX"
        :rot-y="msg.rotationY"
        :voiceurl="msg.voiceurl"
        :msg="`${msg.msg} \n by [${msg.name}]`"
        :stage="randomStage(idx)"
      ></b-flowerHolder>
      <a-sphere :radius="5" class="clickable"></a-sphere>
    </a-sphere>
  </a-scene>
</template>

<script>
import FlowerHolder from '@/components/FlowerHolder'
import { Howl } from 'howler'

// @ is an alias to /src
export default {
  name: 'Planet',
  components: {
    'b-flowerHolder': FlowerHolder,
  },

  props: {
    msgs: {
      type: Array,
      default: function() {
        return []
      },
    },
  },
  data() {
    return {
      soundtrack: null,
      planetRadius: 7,
      msgsD: [
          {
              "flower" : 1,
              "msg" : "Take your sweet time getting well!",
              "name" : "Kai",
              "voiceUrl" : "https://firebasestorage.googleapis.com/v0/b/bizzy-bee.appspot.com/o/voices%2Fvoice-2019-01-20T17%3A19%3A06.719Z.wav?alt=media&token=2740145e-c859-43f7-b490-1ffdf36e897f"
          },
          {
                "flower" : 2,
              "msg" : "Hope it won’t be long till you’re out of the hospital.",
              "name" : "MOMO",
              "voiceUrl" : "https://firebasestorage.googleapis.com/v0/b/bizzy-bee.appspot.com/o/voices%2Fvoice-2019-01-20T17%3A20%3A37.377Z.wav?alt=media&token=3da97e0d-b1b1-4ac0-b727-a267f71cf4e8"
          },
          {
              "flower" : 0,
              "msg" : "Miss you around here!",
              "name" : "Jason",
              "voiceUrl" : "https://firebasestorage.googleapis.com/v0/b/bizzy-bee.appspot.com/o/voices%2Fvoice-2019-01-20T17%3A21%3A11.864Z.wav?alt=media&token=12dc47eb-c35f-4e6e-a993-15c58d2ae82d"
          },
          {
              "flower" : 3,
              "msg" : "We hope you’re taking it slow and easy right now.",
              "name" : "Morris",
              "voiceUrl" : "https://firebasestorage.googleapis.com/v0/b/bizzy-bee.appspot.com/o/voices%2Fvoice-2019-01-20T17%3A21%3A38.825Z.wav?alt=media&token=e1807a25-e12e-49bf-9be6-4f9320d81ef5"
          },
          {
              "flower" : 4,
              "msg" : "Hope you’re catching up on your cookbook reading!",
              "name" : "Lydia",
              "voiceUrl" : "https://firebasestorage.googleapis.com/v0/b/bizzy-bee.appspot.com/o/voices%2Fvoice-2019-01-20T17%3A23%3A06.044Z.wav?alt=media&token=c5b3f16c-dd04-411c-a4bf-8b6a80816748"
          },
          {
              "flower" : 2,
              "msg" : "Sending good, healthy vibes your way.",
              "name" : "Janet",
              "voiceUrl" : "https://firebasestorage.googleapis.com/v0/b/bizzy-bee.appspot.com/o/voices%2Fvoice-2019-01-20T17%3A23%3A49.625Z.wav?alt=media&token=ffb3df3d-bb57-4bb7-bfd8-b367e364ba8e"
          },
          {
              "flower" : 1,
              "msg" : "Hope you get to feeling better soon!",
              "name" : "VVVVV",
              "voiceUrl" : "https://firebasestorage.googleapis.com/v0/b/bizzy-bee.appspot.com/o/voices%2Fvoice-2019-01-20T17%3A24%3A27.774Z.wav?alt=media&token=e82027e6-bcf7-4bdd-82bd-8300c559cd4f"
          }

      ],
      msg: '',
      lastPlayedSound: '',
    }
  },
  computed: {
    msgText() {
      return `color: #111; align:center; value: ${this.msg}`
    },
    popMsgs() {
      console.log('popMsgs', this.msgs)

      let MAX_FLOWERS = 20
      let MAX_ROTATION = 360
      let MIN_DISTANCE = 0.8
      let DEGREES_TO_RADIANS = Math.PI / 180
      let msgs = []
      let msgIndex,
        minDistance,
        msgMatrix,
        testMatrix,
        rotationX,
        rotationY,
        testIndex,
        testFailed,
        testVector,
        msgVector

      // for each flower, generate the angles that the flowers will stick out and space them to avoid clumping
      for (var i = 0; i < MAX_FLOWERS; i++) {
        // start testing from index 0 to the length
        testIndex = 0

        // clear the test-failed flag
        testFailed = false

        // set the distance to max for starters
        minDistance = 0

        do {
          // generate a random rotation and add it to the array
          rotationX = Math.random() * MAX_ROTATION
          rotationY = Math.random() * MAX_ROTATION

          // check if the rotation is far enough away from the others and add their
          if (msgs.length) {
            msgMatrix = new THREE.Matrix4().makeRotationFromEuler(
              new THREE.Euler(
                rotationX * DEGREES_TO_RADIANS,
                rotationY * DEGREES_TO_RADIANS,
                0
              )
            )
            msgVector = new THREE.Vector3(0, 0, -1).transformDirection(
              msgMatrix
            )
            testMatrix = new THREE.Matrix4().makeRotationFromEuler(
              new THREE.Euler(
                msgs[testIndex].rotationX * DEGREES_TO_RADIANS,
                msgs[testIndex].rotationX * DEGREES_TO_RADIANS,
                0
              )
            )
            testVector = new THREE.Vector3(0, 0, -1).transformDirection(
              testMatrix
            )

            // update the min angular distance encountered
            minDistance = Math.max(minDistance, msgVector.dot(testVector))
          }

          // if we've found a distance too small, break and retry
          if (minDistance >= MIN_DISTANCE) {
            // we failed, please try again :(
            testFailed = true

            // break from the do loop
            break
          }
          // otherwise try the next one in the list
          else {
            // increment the test index
            testIndex++
          }

          // loop through until we've hit all of them
        } while (testIndex < msgs.length)

        // console.log('minDistance:', minDistance);

        // if we've found one too small, decrement the loop counter
        if (testFailed) {
          i--
        }
        // otherwise add the flower to the msgs array
        else {
          var msgSrc = this.msgs && this.msgs.length ? this.msgs : this.msgsD

          // get the index of the msg
          msgIndex = i % msgSrc.length

          msgs.push({
            name: msgSrc[msgIndex].name,
            msg: msgSrc[msgIndex].msg,
            flower: msgSrc[msgIndex].flower,
            voiceurl: msgSrc[msgIndex].voiceUrl,

            // add the rotation values
            rotationX: rotationX,
            rotationY: rotationY,
          })
        }
      }

      console.log(msgs)
      // debugger;

      return msgs
    },
  },
  mounted() {
    window.wmPlanet = this

    this.soundtrack = new Howl({
        src: ['audio/Sakuro 190120-085434.aif', 'audio/Sakuro 190120-085434.mp3'],
        volume: 0.3,
        autoplay: true,
        loop:true
    });
  },
  methods: {
    randomStage(idx) {
      return idx % 3
    },
    turnToLook() {
      // draw a line from the camera to the planet and see if we're too far above or below the planet
    },
    setMsg(msg) {
      this.msg = msg
    },
    playVoice(voiceUrl) {
      if (!voiceUrl) return

      if (this.voice && this.voice.playing) {
        this.voice.stop()
      }

      if (
        this.lastPlayedSound != voiceUrl ||
        (this.voice && !this.voice.playing)
      ) {
        this.voice = new Howl({
          src: [voiceUrl],
          autoplay: true,
        })

        this.lastPlayedSound = voiceUrl
      }
    },
  },
}
</script>
