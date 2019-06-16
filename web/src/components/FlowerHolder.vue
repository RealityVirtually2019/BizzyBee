<template>
  <a-entity name="x-axis" :rotation="`${offsetX} 0 0`">
    <a-entity name="y-axis" :rotation="`0 0 ${offsetY}`">
      <a-entity name="planet-surface" :position="`0 ${hoverDistance} 0`">
        <b-flower
          ref="flower"
          :stage="stage"
          :modelids="modelids"
          :mtlids="mtlids"
          :ps="ps"
          :play="play"
        ></b-flower>
        <a-box
          depth="2"
          width="2"
          height="4"
          position="0 2 0"
          visible="false"
          material="shader: flat; color: red; opacity:0.2"
          class="clickable"
          bounce-on-hover
          :msg="msg"
          :voiceurl="voiceurl"
        >
          <!--<b-flower bounce-on-hover :stage="stage" :modelids="modelids" :mtlids="mtlids" :ps="flowerdata.moflower.ps"-->
          <!--:play="play"></b-flower>-->
        </a-box>
      </a-entity>
    </a-entity>
  </a-entity>
</template>

<script>
import Flower from '@/components/Flower'

// @ is an alias to /src
export default {
  name: 'FlowerHolder',
  components: {
    'b-flower': Flower,
  },
  props: {
    planetRadius: {
      type: Number,
      default: 10,
    },
    stage: {
      type: Number,
      default: 0,
    },
    type: {
      type: Number,
      default: 0,
    },
    rotX: {
      type: Number,
      default: 0,
    },
    rotY: {
      type: Number,
      default: 0,
    },
    msg: {
      type: String,
      default: '',
    },
    voiceurl: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      play: 'true',
      hoverDistance: 0,
      offsetX: 0,
      offsetY: 0,
      flowerdata: {
        flower0: {
          color: 0xff0000,
          obj: [
            '#Flower_3_sprout-dae',
            '#Flower_3_sapling-dae',
            '#Flower_3_bloom-dae',
          ],
          mtl: ['#', '#', '#'],
          ps: [
            'color: #F05174,#F9ECA0; blending: 1; particleCount: 10; maxAge: 1; size: 0.3; velocityValue: 0 0.5 0; maxParticleCount:500',
            'color: #F05174,#F9ECA0; blending: 1; particleCount: 10; maxAge: 1; size: 0.3; velocityValue: 0 0.5 0; maxParticleCount:500',
            'color: #F05174,#F9ECA0; blending: 1; particleCount: 10; maxAge: 1; size: 0.3; velocityValue: 0 0.5 0; maxParticleCount:500',
          ],
        },
        flower1: {
          color: 0xff0000,
          obj: [
            '#Flower_4_sprout-dae',
            '#Flower_4_sapling-dae',
            '#Flower_4_bloom-dae',
          ],
          mtl: ['#', '#', '#'],
          ps: [
            'color: #942E6B,#F9ECA0; blending: 1; particleCount: 10; maxAge: 1; size: 0.3; velocityValue: 0 0.5 0; maxParticleCount:500',
            'color: #942E6B,#F9ECA0; blending: 1; particleCount: 10; maxAge: 1; size: 0.3; velocityValue: 0 0.5 0; maxParticleCount:500',
            'color: #942E6B,#F9ECA0; blending: 1; particleCount: 10; maxAge: 1; size: 0.3; velocityValue: 0 0.5 0; maxParticleCount:500',
          ],
        },
        flower2: {
          color: 0xfffffff,
          obj: [
            '#BubingaTreeSprout-gltf',
            '#BubingaTreeSapling-gltf',
            '#BubingaTreeBloom-gltf',
          ],
          mtl: ['#', '#', '#'],
          ps: [
            'color: #EF0000,#F9ECA0; blending: 1; particleCount: 10; maxAge: 1; size: 0.3; velocityValue: 0 0.5 0; maxParticleCount:500',
            'color: #000000,#F9ECA0; blending: 1; particleCount: 10; maxAge: 1; size: 0.3; velocityValue: 0 0.5 0; maxParticleCount:500',
            'color: #000000,#F9ECA0; blending: 1; particleCount: 10; maxAge: 1; size: 0.3; velocityValue: 0 0.5 0; maxParticleCount:500',
          ],
        },
        flower3: {
          color: 0xff0000,
          obj: [
            '#AppleTree_Sprout-gltf',
            '#AppleTree_Sapling-gltf',
            '#AppleTree_Bloom-gltf',
          ],
          mtl: ['#', '#', '#'],
          ps: [
            'color: #EF0000,#F9ECA0; blending: 1; particleCount: 10; maxAge: 1; size: 0.3; velocityValue: 0 0.5 0; maxParticleCount:500',
            'color: #000000,#F9ECA0; blending: 1; particleCount: 10; maxAge: 1; size: 0.3; velocityValue: 0 0.5 0; maxParticleCount:500',
            'color: #000000,#F9ECA0; blending: 1; particleCount: 10; maxAge: 1; size: 0.3; velocityValue: 0 0.5 0; maxParticleCount:500',
          ],
        },
        flower4: {
          color: 0xff0000,
          obj: [
            '#Flower_5_sprout-dae',
            '#Flower_5_sapling-dae',
            '#Flower_5_bloom-dae',
          ],
          mtl: ['#', '#', '#'],
          ps: [
            'color: #F79563,#F9ECA0; blending: 1; particleCount: 10; maxAge: 1; size: 0.3; velocityValue: 0 0.5 0; maxParticleCount:500',
            'color: #F79563,#F9ECA0; blending: 1; particleCount: 10; maxAge: 1; size: 0.3; velocityValue: 0 0.5 0; maxParticleCount:500',
            'color: #F79563,#F9ECA0; blending: 1; particleCount: 10; maxAge: 1; size: 0.3; velocityValue: 0 0.5 0; maxParticleCount:500',
          ],
        },
      },
    }
  },
  computed: {
    modelids() {
      return this.flowerdata['flower' + this.type].obj
    },
    mtlids() {
      return this.flowerdata['flower' + this.type].mtl
    },
    ps() {
      return this.flowerdata['flower' + this.type].ps
    },
  },
  mounted() {
    // console.log('flowerHolder:', this.$refs.flowerHolder.object3D);

    // Once we have the final object, work on the sizing
    // this.hoverDistance = this.planetRadius + (this.$refs.flowerHolder.getAttribute('height')) * 0.5;
    // this.hoverDistance = this.planetRadius + .65;
    this.hoverDistance = this.planetRadius - 0.2

    // set the rotation of the objects
    this.offsetX = this.rotX
    this.offsetY = this.rotY

    // scale the flowers down a bit
    if (this.$refs.flower && this.$refs.flower.object3D) {
      this.$refs.flower.object3D.scale.set(0.7, 0.7, 0.7)
    }
  },
}
</script>
