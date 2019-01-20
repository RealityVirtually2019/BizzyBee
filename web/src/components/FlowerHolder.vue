<template>
    <a-entity name='x-axis' :rotation="`${offsetX} 0 0`">
        <a-entity name='y-axis' :rotation="`0 0 ${offsetY}`">
            <a-entity name='planet-surface' :position="`0 ${hoverDistance} 0`">
                <b-flower :stage="stage" :modelids="modelids" :mtlids="mtlids" :ps="ps"
                          :play="play"></b-flower>
                <a-box depth="2" width="2" height="4" position="0 2 0" visible="false" material="shader: flat; color: red; opacity:0" class="clickable" bounce-on-hover>
                    <!--<b-flower bounce-on-hover :stage="stage" :modelids="modelids" :mtlids="mtlids" :ps="flowerdata.moflower.ps"-->
                    <!--:play="play"></b-flower>-->
                </a-box>
            </a-entity>
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
  },
  data() {
      return {
          play: 'true',
          hoverDistance: 0,
          offsetX: 0,
          offsetY: 0,
          flowerUrl: '',
          flowerPaths: {
              0: [
                  'img/flowers/Blue Flower-1.png',
                  'img/flowers/Blue-Flower-2.png',
                  'img/flowers/Blue-Flower-3.png',
              ],
              1: [
                  'img/flowers/bulb-flower-1.png',
                  'img/flowers/bulb-flower-2.png',
                  'img/flowers/bulb-flower-3-blue.png',
              ],
              2: [
                  'img/flowers/flower_1_sprout.png',
                  'img/flowers/flower_1_sapling.png',
                  'img/flowers/flower_1_bloom.png',
              ],
          },
          flowerHeight: 0,
          flowerWidth: 0,
          flowerdata: {
              moflower: {
                  color: 0xff0000,
                  obj: ['#papatest-gltf', '#monkey-gltf'],
                  mtl: [ '#', '#'],
                  ps: [
                      'preset: dust; color: #EF0000,#44CC00; blending: 1; particleCount: 10',
                      'preset: dust; color: #000000,#FF0000; blending: 1; particleCount: 10',
                  ],
              },
              monkeyflower: {
                  color: 0x00ff00,
                  obj: ['#monkey'],
              },
          }
      }
  },
    computed: {
        modelids() {
            return this.flowerdata.moflower.obj
        },
        mtlids() {
            return this.flowerdata.moflower.mtl
        },
        ps() {
            return this.flowerdata.moflower.ps
        }
    },
    mounted() {
        // console.log('flowerHolder:', this.$refs.flowerHolder.object3D);

        // Once we have the final object, work on the sizing
        // this.hoverDistance = this.planetRadius + (this.$refs.flowerHolder.getAttribute('height')) * 0.5;
        // this.hoverDistance = this.planetRadius + .65;
        this.hoverDistance = this.planetRadius

        // this.

        // set the rotation of the objects
        this.offsetX = this.rotX
        this.offsetY = this.rotY

        // set the flower type
        // console.log('flower', this.$refs.flowerHolder.object3D,'stage:', this.type, this.stage);
        this.flowerUrl = this.flowerPaths[this.type][this.stage]
        switch (this.type) {
            case 0:
                switch (this.stage) {
                    case 0:
                        this.flowerWidth = 0.5
                        this.flowerHeight = 2
                        break
                    case 1:
                        this.flowerWidth = 2
                        this.flowerHeight = 4
                        break
                    case 2:
                        this.flowerWidth = 3
                        this.flowerHeight = 6
                        break
                }
                break
            case 1:
                switch (this.stage) {
                    case 0:
                        this.flowerWidth = 1
                        this.flowerHeight = 2
                        break
                    case 1:
                        this.flowerWidth = 1
                        this.flowerHeight = 4
                        break
                    case 2:
                        this.flowerWidth = 6
                        this.flowerHeight = 6
                        break
                }
                break
            case 2:
                switch (this.stage) {
                    case 0:
                        this.flowerWidth = 1
                        this.flowerHeight = 2
                        break
                    case 1:
                        this.flowerWidth = 4
                        this.flowerHeight = 4
                        break
                    case 2:
                        this.flowerWidth = 3
                        this.flowerHeight = 6
                        break
                }
                break
        }
    },

}
</script>
