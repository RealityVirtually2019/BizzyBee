<template>
    <a-entity :rotation="`${offsetX} 0 0`">
        <a-entity :rotation="`0 0 ${offsetY}`">
            <a-entity :position="`0 ${hoverDistance} 0`">
                <a-plane ref="flowerHolder" :material="`side: double; color: #FFFFFF; transparent: true; opacity: 1;`"
                         :width="`${flowerWidth}`" :height="`${flowerHeight}`" :src="`${flowerUrl}`"></a-plane>
            </a-entity>
        </a-entity>
    </a-entity>
</template>

<script>
    // @ is an alias to /src
    export default {
        name: 'FlowerHolder',
        data() {
            return {
                hoverDistance: 0,
                offsetX: 0,
                offsetY: 0,
                flowerUrl: '',
                flowerPaths: {
                    0: ['img/flowers/Blue Flower-1.png', 'img/flowers/Blue-Flower-2.png', 'img/flowers/Blue-Flower-3.png'],
                    1: ['img/flowers/bulb-flower-1.png', 'img/flowers/bulb-flower-2.png', 'img/flowers/bulb-flower-3-blue.png'],
                    2: ['img/flowers/flower_1_sprout.png', 'img/flowers/flower_1_sapling.png', 'img/flowers/flower_1_bloom.png',],
                },
                flowerHeight: 0,
                flowerWidth: 0,
            }
        },
        props: {
            planetRadius: {
                type: Number,
                default: 10,
            },
            stage: {
                type: Number,
                default: 0
            },
            type: {
                type: Number,
                default: 0
            },
        },
        computed: {
            rotationX() {
                return this.offsetX
            },
            rotationY() {
                return this.offsetY
            },
        },
        mounted() {
            console.log('flowerHolder:', this.$refs.flowerHolder.object3D);

            var rotation = 360;
            this.offsetX = Math.random() * rotation;
            this.offsetY = Math.random() * rotation;

            // Once we have the final object, work on the sizing
            this.hoverDistance = this.planetRadius + (this.$refs.flowerHolder.getAttribute('height')) * 0.5;

            // set the flower type
            console.log('flower stage:', this.type, this.stage);
            this.flowerUrl = this.flowerPaths[this.type][this.stage];
            switch (this.type) {
                case 0:
                    switch (this.stage) {
                        case 0:
                            this.flowerWidth = .5;
                            this.flowerHeight = 2;
                            break;
                        case 1:
                            this.flowerWidth = 2;
                            this.flowerHeight = 4;
                            break;
                        case 2:
                            this.flowerWidth = 3;
                            this.flowerHeight = 6;
                            break;
                    }
                    break;
                case 1:
                    switch (this.stage) {
                        case 0:
                            this.flowerWidth = 1;
                            this.flowerHeight = 2;
                            break;
                        case 1:
                            this.flowerWidth = 1;
                            this.flowerHeight = 4;
                            break;
                        case 2:
                            this.flowerWidth = 6;
                            this.flowerHeight = 6;
                            break;
                    }
                    break;
                case 2:
                    switch (this.stage) {
                        case 0:
                            this.flowerWidth = 1;
                            this.flowerHeight = 2;
                            break;
                        case 1:
                            this.flowerWidth = 4;
                            this.flowerHeight = 4;
                            break;
                        case 2:
                            this.flowerWidth = 3;
                            this.flowerHeight = 6;
                            break;
                    }
                    break;
            }
        },
    }
</script>
