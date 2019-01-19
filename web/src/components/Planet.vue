<template>
  <a-sphere position="0 -7 -7" :radius="planetRadius" color="#EF2D5E">
    <b-flowerHolder
      v-for="(msg, idx) in popMsgs" :key="idx"
      :planet-radius="planetRadius" :type="msg.flower" :rot-x="msg.rotationX"
      :rot-y="msg.rotationY"
      :stage="randomStage(idx)"></b-flowerHolder>
  </a-sphere>
</template>

<script>
import FlowerHolder from '@/components/FlowerHolder'

// @ is an alias to /src
export default {
  name: 'Planet',
  components: {
    'b-flowerHolder': FlowerHolder,
  },
  data() {
    return {
      planetRadius: 7,
      welcomeText: 'Welcome to the home of the Bee',
      msgs: [
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
      let MAX_FLOWERS = 5
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

          // minDistance

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
          // get the index of the msg
          msgIndex = i % this.msgs.length

          msgs.push({
            name: this.msgs[msgIndex].name,
            msg: this.msgs[msgIndex].msg,
            flower: this.msgs[msgIndex].flower,

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
