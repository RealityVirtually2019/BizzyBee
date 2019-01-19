<template>
  <a-entity>
    <!-- Using the asset management system. -->
    <a-entity scale="0.2 0.2 0.2" position="0 1.4 -5">
      <a-obj-model class="flowermodel" src="#bromeliads-obj" mtl="#bromeliads-mtl"></a-obj-model>
      <a-gltf-model class="gltfmodel" src="#papatest-gltf"></a-gltf-model>
    </a-entity>


    <a-sphere
      v-if="stage == 0"
      position="0 1.25 -5"
      radius="0.5"
      color="#FF00FF"
      material="side: double; color: #EF2D5E; transparent: true; opacity: 0.5"
    ></a-sphere>
    <a-sphere
      v-if="stage == 1"
      position="0 1.25 -5"
      radius="1"
      color="#FF00F"
    ></a-sphere>
    <a-sphere
      v-if="stage == 2"
      position="0 1.25 -5"
      radius="2"
      color="#F0F"
    ></a-sphere>
    <a-sphere
      v-if="stage == 3"
      position="0 1.25 -5"
      radius="3"
      color="#FF0"
    ></a-sphere>
  </a-entity>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'Flower',
  props: {
    stage: {
      type: Number,
      default: 0,
    },
  },
  mounted() {
    console.log(this.$el.getElementsByClassName("gltfmodel")[0]) // I'm text inside the component.

     let base = document.querySelector('a-assets')
     let model = this.$el.getElementsByClassName("gltfmodel")

     base.addEventListener('loaded', function() {
        console.log('loaded');
        if(model != undefined) {
          let bloomBone = model.object3D.children[0].children.filter(mesh => mesh.name == "Papa")
          if(bloomBone) {
            console.log("Bloom Bone - ", bloomBone)
          } else {
            console.log("No Bloom Bone found")
          }
        }
      });
  }
}
</script>


<!-- https://poly.google.com/view/5FZIGjZBWTB -->