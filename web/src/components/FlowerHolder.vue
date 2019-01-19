<template>
  <a-entity ref="rotationX" :rotation="`${offsetX} 0 0`">
    <a-entity ref="rotationY" :rotation="`0 0 ${offsetY}`">
      <a-entity :position="`0 ${hoverDistance} 0`">
        <a-plane ref="flowerHolder" :material="`side: double; color: #FFFFFF; transparent: true; opacity: 1;`" width="1" height="2" src="img/flower_1_bloom.png"></a-plane>
      </a-entity>
    </a-entity>
  </a-entity>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'FlowerHolder',
  data(){
      return {
          hoverDistance: 0,
          rotationX: 0,
          rotationY: 0
      }
  },
  props: {
      planetRadius: {
          type: Number,
          default: 10,
      },
      offsetX: {
          type: Number,
          default: 0,
      },
      offsetY: {
          type: Number,
          default: 0,
      },
  },
  computed: {
      rotationX(){
          return this.offsetX
      },
      rotationY(){
          return this.offsetY
      },
  },
  mounted(){
      console.log('flowerHolder:', this.$refs.flowerHolder.object3D );

      // Once we have the final object, work on the sizing
      this.hoverDistance = this.planetRadius + (this.$refs.flowerHolder.getAttribute('height')) * 0.5;
  },
}
</script>
