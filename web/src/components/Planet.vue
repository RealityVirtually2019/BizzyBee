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

    <a-sky color="#ECECEC"></a-sky>

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
          name: 'Kai',
          msg: 'Get well soon!',
          flower: 0,
          voiceUrl:
            'https://firebasestorage.googleapis.com/v0/b/bizzy-bee.appspot.com/o/voices%2Fvoice-2019-01-19T22%3A52%3A52.951Z.wav?alt=media&token=de8e5bca-935f-4a37-9629-bad4816487a5',
        },
        {
          name: 'Mo',
          msg: 'Hope you feel better!',
          flower: 1,
          voiceUrl:
            'https://firebasestorage.googleapis.com/v0/b/bizzy-bee.appspot.com/o/voices%2Fvoice-2019-01-19T22%3A51%3A44.682Z.wav?alt=media&token=0283afa6-c01e-4d21-9835-6aad335e8a59',
        },
        {
          name: 'Victoria',
          msg: 'Get well soon!',
          flower: 2,
          voiceUrl:
            'https://firebasestorage.googleapis.com/v0/b/bizzy-bee.appspot.com/o/voices%2Fvoice-2019-01-19T23%3A14%3A52.754Z.wav?alt=media&token=4853f94a-1b7a-4df1-bc55-06a799fb19c3',
        },
        {
          name: 'Lydia',
          msg: 'See you soon!',
          flower: 3,
          voiceUrl:
            'https://firebasestorage.googleapis.com/v0/b/bizzy-bee.appspot.com/o/voices%2Fvoice-2019-01-20T03%3A49%3A47.045Z.wav?alt=media&token=829ea840-00f8-4a82-b115-b299dc7c5946',
        },
        {
          name: 'Jason',
          msg:
            'Hope your insurance is paid up! We want to see you back in the office soon!',
          flower: 4,
          voiceUrl:
            'https://firebasestorage.googleapis.com/v0/b/bizzy-bee.appspot.com/o/voices%2Fvoice-2019-01-19T22%3A51%3A44.682Z.wav?alt=media&token=0283afa6-c01e-4d21-9835-6aad335e8a59',
        },
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

      let MAX_FLOWERS = 30
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
    /*

    this.soundtrack = new Howl({
        src: ['audio/Sakuro 190120-085434.aif'],
        volume: 1,
        autoplay: true,
        loop:true
    });
*/
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
