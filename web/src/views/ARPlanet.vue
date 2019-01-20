<template>

  <a-scene>
    <!-- <a-sphere radius="1" color="#EF2D5E"></a-sphere> -->
    <a-sky color="#ECECEC"></a-sky>
    
    <a-assets>
      
      <a-asset-item id="Flower_3_bloom-dae" src="./flowers/Flower1/Flower_3_bloom.dae"></a-asset-item>
      <a-asset-item id="Flower_3_sapling-dae" src="./flowers/Flower1/Flower_3_sapling.dae"></a-asset-item>
      <a-asset-item id="Flower_3_sprout-dae" src="./flowers/Flower1/Flower_3_sprout.dae"></a-asset-item>

      <a-asset-item id="Flower_4_bloom-dae" src="./flowers/Flower2/Flower_4_bloom.dae"></a-asset-item>
      <a-asset-item id="Flower_4_sapling-dae" src="./flowers/Flower2/Flower_4_sapling.dae"></a-asset-item>
      <a-asset-item id="Flower_4_sprout-dae" src="./flowers/Flower2/Flower_4_sprout.dae"></a-asset-item>

      <a-asset-item id="BubingaTreeBloom-gltf" src="./flowers/BubungaTree_gltf/BubingaTreeBloom.gltf"></a-asset-item>
      <a-asset-item id="BubingaTreeSapling-gltf" src="./flowers/BubungaTree_gltf/BubingaTreeSapling.gltf"></a-asset-item>
      <a-asset-item id="BubingaTreeSprout-gltf" src="./flowers/BubungaTree_gltf/BubingaTreeSprout.gltf"></a-asset-item>

      <a-asset-item id="AppleTree_Bloom-gltf" src="./flowers/AppleTree_gltf/AppleTree_Bloom.gltf"></a-asset-item>
      <a-asset-item id="AppleTree_Sapling-gltf" src="./flowers/AppleTree_gltf/AppleTree_Sapling.gltf"></a-asset-item>
      <a-asset-item id="AppleTree_Sprout-gltf" src="./flowers/AppleTree_gltf/AppleTree_Sprout.gltf"></a-asset-item>
      
    </a-assets>

    <a-sphere radius="1" color="#EF2D5E"></a-sphere>
    <!-- <Flower :stage="stage" :modelids="flowerdata.flower4.obj" :mtlids="flowerdata.flower4.mtl" :ps="flowerdata.flower4.ps" :play="play"/> -->
    <a-entity position="0 planetRadius 0">
        <a-entity rotation="randoRotation 0 0">
            <Flower :stage="stage" :modelids="flowerdata.flower4.obj" :mtlids="flowerdata.flower4.mtl" :ps="flowerdata.flower4.ps" :play="play"/>
        </a-entity>
    </a-entity>
  </a-scene>
  
</template>

<script>
// @ is an alias to /src
import Flower from '@/components/Flower'

let flowerdata = {
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
    color: 0xff0000,
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

export default {
  name: 'ARPlanet',
  components: {
    Flower: Flower,
  },
  data() {
    return {
      flowerdata,
      stage: 0,
      play: 'true',
      numPlants: 30,
      plantRadius
    }
  },
}

</script>
