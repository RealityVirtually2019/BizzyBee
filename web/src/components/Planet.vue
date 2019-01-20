<template>
  <a-scene>
    <a-assets>
      <a-asset-item id="bromeliads-obj" src="./flowers/Bromeliads/Bromeliads.obj"></a-asset-item>
      <a-asset-item id="bromeliads-mtl" src="./flowers/Bromeliads/Bromeliads.mtl"></a-asset-item>

      <a-asset-item id="papatest-gltf" src="./flowers/papatest/papatest.gltf"></a-asset-item>
      <a-asset-item id="tree-gltf" src="./models/example_flower.glb"></a-asset-item>
      <a-asset-item id="monkey-gltf" src="./flowers/Monkey/monkey.gltf"></a-asset-item>
    </a-assets>

    <a-sky color="#ECECEC"></a-sky>

    <a-camera id="camera">
      <a-cursor raycaster="objects: .clickable"></a-cursor>
    </a-camera>

    <a-sphere planet-gaze-rotator position="0 -7 -7" :radius="planetRadius" src="img/planet 1.png">
      <b-flowerHolder
              v-for="(msg, idx) in popMsgs" :key="idx"
              :planet-radius="planetRadius" :type="msg.flower" :rot-x="msg.rotationX"
              :rot-y="msg.rotationY" :voiceUrl="msg.voiceUrl" :msg="msg.msg"
              :stage="randomStage(idx)"></b-flowerHolder>
    </a-sphere>

  </a-scene>
</template>

<script>
import FlowerHolder from '@/components/FlowerHolder'

// @ is an alias to /src
export default {
  name: 'Planet',
  components: {
    'b-flowerHolder': FlowerHolder,
  },

    props: {
      msgs: {
          type: Array,
          default: function () {
              return []
          }
      }
    },
  data() {
    return {
      planetRadius: 7,
      msgsD: [
        {
          name: 'Kai',
          msg: 'Get well soon!',
          flower: 0,
        },
        {
          name: 'Mo',
          msg: 'Hope you feel better!',
          flower: 1,
        },
        {
          name: 'Victoria',
          msg: 'Get well soon!',
          flower: 2,
        },
        {
          name: 'Lydia',
          msg: 'See you soon!',
          flower: 2,
        },
        {
          name: 'Jason',
          msg: 'Hope your insurance is paid up!',
          flower: 1,
        },
      ],
    }
  },
  computed: {
    popMsgs() {

        console.log('popMsgs', this.msgs)

      let MAX_FLOWERS = 10
      let MAX_ROTATION = 360
      let MIN_DISTANCE = 0.88
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
          rotationX = Math.random() * MAX_ROTATION;
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
            var msgSrc = this.msgs && this.msgs.length ? this.msgs : this.msgsD;

            // get the index of the msg
          msgIndex = i % msgSrc.length

          msgs.push({
            name: msgSrc[msgIndex].name,
            msg: msgSrc[msgIndex].msg,
            flower: msgSrc[msgIndex].flower,
            voiceUrl: msgSrc[msgIndex].voiceUrl,

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
  mounted() {},
  methods: {
    randomStage(idx) {
      return idx % 3
    },
    turnToLook() {
      // draw a line from the camera to the planet and see if we're too far above or below the planet
    },
  },
}
</script>
