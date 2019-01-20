<template>
    <a-entity name='x-axis' :rotation="`${offsetX} 0 0`">
        <a-entity name='y-axis' :rotation="`0 0 ${offsetY}`">
            <a-entity name='planet-surface' :position="`0 ${hoverDistance} 0`">
                <b-flower :stage="stage" :modelids="modelids" :mtlids="mtlids" :ps="ps"
                          :play="play"></b-flower>
                <a-box depth="2" width="2" height="4" position="0 2 0" visible="false"
                       material="shader: flat; color: red; opacity:0" class="clickable" bounce-on-hover
                    :msg="msg" :voiceUrl="voiceUrl">
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
                default: ""
            },
            voiceUrl: {
                type: String,
                default: ""
            },
        },
        data() {
            return {
                play: 'true',
                hoverDistance: 0,
                offsetX: 0,
                offsetY: 0,
                flowerdata: {
                    flower1: {
                        color: 0xff0000,
                        obj: [
                            '#Flower_3_sprout-dae',
                            '#Flower_3_sapling-dae',
                            '#Flower_3_bloom-dae',
                        ],
                        mtl: ['#', '#', '#'],
                        ps: [
                            'color: #EF0000,#44CC00; blending: 1; particleCount: 10',
                            'color: #000000,#FF0000; blending: 1; particleCount: 100',
                            'color: #000000,#FF0000; blending: 1; particleCount: 100',
                        ],
                    },
                    flower2: {
                        color: 0xff0000,
                        obj: [
                            '#Flower_4_sprout-dae',
                            '#Flower_4_sapling-dae',
                            '#Flower_4_bloom-dae',
                        ],
                        mtl: ['#', '#', '#'],
                        ps: [
                            'color: #EF0000,#44CC00; blending: 1; particleCount: 10',
                            'color: #000000,#FF0000; blending: 1; particleCount: 100',
                            'color: #000000,#FF0000; blending: 1; particleCount: 100',
                        ],
                    },
                    flower3: {
                        color: 0xffFFFFF,
                        obj: [
                            '#BubingaTreeSprout-gltf',
                            '#BubingaTreeSapling-gltf',
                            '#BubingaTreeBloom-gltf',
                        ],
                        mtl: ['#', '#', '#'],
                        ps: [
                            'color: #EF0000,#44CC00; blending: 1; particleCount: 10',
                            'color: #000000,#FF0000; blending: 1; particleCount: 100',
                            'color: #000000,#FF0000; blending: 1; particleCount: 100',
                        ],
                    },
                    flower4: {
                        color: 0xff0000,
                        obj: [
                            '#AppleTree_Sprout-gltf',
                            '#AppleTree_Sapling-gltf',
                            '#AppleTree_Bloom-gltf',
                        ],
                        mtl: ['#', '#', '#'],
                        ps: [
                            'color: #EF0000,#44CC00; blending: 1; particleCount: 10',
                            'color: #000000,#FF0000; blending: 1; particleCount: 100',
                            'color: #000000,#FF0000; blending: 1; particleCount: 100',
                        ],
                    },
                }
            }
        },
        computed: {
            modelids() {
                return this.flowerdata['flower' + 3].obj
            },
            mtlids() {
                return this.flowerdata['flower' + 3].mtl
            },
            ps() {
                return this.flowerdata['flower' + 3].ps
            }
        },
        mounted() {
            // console.log('flowerHolder:', this.$refs.flowerHolder.object3D);

            // Once we have the final object, work on the sizing
            // this.hoverDistance = this.planetRadius + (this.$refs.flowerHolder.getAttribute('height')) * 0.5;
            // this.hoverDistance = this.planetRadius + .65;
            this.hoverDistance = this.planetRadius

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
