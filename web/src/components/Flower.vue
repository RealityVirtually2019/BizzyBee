<template>
  <a-entity>
    <!-- Using the asset management system. -->
      <a-entity ref="localspace" scale="1 1 1">
        <!-- <a-obj-model class="flowermodel" src="#bromeliads-obj" mtl="#bromeliads-mtl"></a-obj-model> -->
        <a-gltf-model ref="modelgltf" class="gltfmodel" :src="modelids[stage]" :mtl="mtlids[stage]"></a-gltf-model>
        <a-entity ref="parsys"></a-entity>  
      </a-entity>
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
    modelids: {
      type: Array,
      default: function() {return ["#papatest-gltf"]}
    },
    mtlids: {
      type: Array,
      default: function() {return ["#"]}
    }
  },
  mounted() {
    this.showStage(this.stage)
  },
  methods: {
    showStage(stageNum) {
      this.modelLoadSetup()
    },
    modelLoadSetup() {
      console.log(this.$el.getElementsByClassName("gltfmodel")[0]) // I'm text inside the component.

      let base = document.querySelector('a-assets')
      let cmodel = this.$refs.modelgltf //this.$el.getElementsByClassName("gltfmodel")[0]
      
      var that = this
      cmodel.addEventListener('model-loaded', () =>{
          this.setup()
      });
    },
    setup() {
        console.log('model setup');
        while (this.$refs.parsys.firstChild) {
            this.$refs.parsys.removeChild(this.$refs.parsys.firstChild);
        }

        let model = this.$refs.modelgltf
        if(model != undefined) {
          let bloomBones = model.object3D.children[0].children.filter(mesh => mesh.name == "Papa")
          for (var bloomBone in bloomBones) {
            if(bloomBone) {
              console.log("Bloom Bone - ", bloomBone)

              var psys_holder = this.$refs.parsys;
              var psys = document.createElement("a-entity");
              psys.setAttribute("particle-system", "preset: default")
              psys.object3D.position.set(bloomBones[bloomBone].position.x, bloomBones[bloomBone].position.y, bloomBones[bloomBone].position.z)
              if(bloomBones[bloomBone].rotation != undefined) {
                psys.object3D.rotation.set(bloomBones[bloomBone].rotation.x, bloomBones[bloomBone].rotation.y, bloomBones[bloomBone].rotation.z)
              }
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