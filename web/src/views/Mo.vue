<template>
  <a-scene>
    <a-entity position="0 0 0">
      <a-camera></a-camera>
    </a-entity>
    <a-sphere radius="1" color="#EF2D5E"></a-sphere>
    <a-sky color="#ECECEC"></a-sky>
    <a-assets>
      <a-asset-item id="Flower_3_bloom-dae" src="./flowers/Flower1/Flower_3_bloom.dae"></a-asset-item>
      <a-asset-item id="Flower_3_sapling-dae" src="./flowers/Flower1/Flower_3_sapling.dae"></a-asset-item>
      <a-asset-item id="Flower_3_sprout-dae" src="./flowers/Flower1/Flower_3_sprout.dae"></a-asset-item>

      <a-asset-item id="Flower_4_bloom-dae" src="./flowers/Flower1/Flower_4_bloom.dae"></a-asset-item>
      <a-asset-item id="Flower_4_sapling-dae" src="./flowers/Flower1/Flower_4_sapling.dae"></a-asset-item>
      <a-asset-item id="Flower_4_sprout-dae" src="./flowers/Flower1/Flower_4_sprout.dae"></a-asset-item>
    </a-assets>
    <Flower :stage="stage" :modelids="flowerdata.flower1.obj" :mtlids="flowerdata.flower1.mtl" :ps="flowerdata.flower1.ps" :play="play"/>
  </a-scene>
</template>

<script>
    // @ is an alias to /src
    import Flower from '@/components/Flower'

let flowerdata =
{
  flower1:{
    color: 0xff0000,
    obj:["#Flower_3_sprout-dae", "#Flower_3_sapling-dae", "Flower_3_bloom-dae"],
    mtl:["#", "#", "#"],
    ps:["color: #EF0000,#44CC00; blending: 1; particleCount: 10",
        "color: #000000,#FF0000; blending: 1; particleCount: 100",
        "color: #000000,#FF0000; blending: 1; particleCount: 100"]
  },
  flower2:{
    color: 0xff0000,
    obj:["#Flower_4_sprout-dae", "#Flower_4_sapling-dae", "Flower_4_bloom-dae"],
    mtl:["#", "#", "#"],
    ps:["color: #EF0000,#44CC00; blending: 1; particleCount: 10",
        "color: #000000,#FF0000; blending: 1; particleCount: 100",
        "color: #000000,#FF0000; blending: 1; particleCount: 100"]
  }
}

export default {
    name: 'Mo',
    data() {
        return {
            flowerdata,
            stage: 0,
            play: "true",
        }
    },
    components: {
        'Flower': Flower,
    },
}
</script>

<!--
  moflower:{
    color: 0xff0000,
    obj:["#papatest-gltf", "#monkey-gltf"],
    mtl:["#bromeliads-mtl", "#"],
    ps:["color: #EF0000,#44CC00; blending: 1; particleCount: 100", "color: #000000,#FF0000; blending: 1; particleCount: 10"]
    },
  monkeyflower:{
    color:0x00FF00,
    obj:["#monkey"]
  }
  -->
