<template>
  <a-entity>
    <!-- Using the asset management system. -->
    <a-entity ref="localspace" scale="0.2 0.2 0.2" position="0 1.4 -5">
      <a-obj-model class="flowermodel" src="#bromeliads-obj" mtl="#bromeliads-mtl"></a-obj-model>
      <a-gltf-model ref="modelgltf" class="gltfmodel" src="#papatest-gltf"></a-gltf-model>
      <a-entity ref="parsys"></a-entity>  
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
      let cmodel = this.$refs.modelgltf //this.$el.getElementsByClassName("gltfmodel")[0]
      
      var that = this
      cmodel.addEventListener('model-loaded', () =>{
          this.setup()
      });
  },
  methods: {
    setup() {
        console.log('model setup');
        let model = this.$refs.modelgltf
        if(model != undefined) {
          let bloomBones = model.object3D.children[0].children.filter(mesh => mesh.name == "Papa")
          for (var bloomBone in bloomBones) {
            if(bloomBone) {
              console.log("Bloom Bone - ", bloomBone)

              var psys_holder = this.$refs.parsys;
              var psys = document.createElement("a-entity");
              psys.setAttribute("particle-system", "preset: default")
              this.$refs.parsys.appendChild(psys)
            } else {
              console.log("No Bloom Bone found")
            }
          }
        }
    }
  }

}
</script>


<!-- https://poly.google.com/view/5FZIGjZBWTB -->