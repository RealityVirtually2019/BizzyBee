<template>
  <a-scene>
    <a-entity position="0 0 0">
      <a-camera></a-camera>
    </a-entity>
    <a-sphere radius="1" color="#EF2D5E"></a-sphere>
    <a-sky color="#ECECEC"></a-sky>
    <a-assets>
      <a-asset-item id="bromeliads-obj" src="./flowers/Bromeliads/Bromeliads.obj"></a-asset-item>
      <a-asset-item id="bromeliads-mtl" src="./flowers/Bromeliads/Bromeliads.mtl"></a-asset-item>

      <a-asset-item id="papatest-gltf" src="./flowers/papatest/papatest.gltf"></a-asset-item>
      <a-asset-item id="monkey-gltf" src="./flowers/Monkey/monkey.gltf"></a-asset-item>
    </a-assets>
    <Flower :stage="stage" :modelids="flowerdata.moflower.obj" :mtlids="flowerdata.moflower.mtl" :ps="flowerdata.moflower.ps" />
  </a-scene>

</template>

<script>
    // @ is an alias to /src
    import Flower from '@/components/Flower'

    let flowerdata =
        {
            moflower:{
                color: 0xff0000,
                obj:["#papatest-gltf", "#monkey-gltf"],
                mtl:["#bromeliads-mtl", "#"],
                ps:["color: #EF0000,#44CC00; blending: 1", "color: #000000,#FF0000; blending: 1"]
            },
            monkeyflower:{
                color:0x00FF00,
                obj:["#monkey"]
            }
        }

    export default {
        name: 'Mo',
        data(){
            return {
                flowerdata,
                stage: 0,
            }
        },
        components: {
            Flower,
        },
    }
</script>