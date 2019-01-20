<template>
  <a-scene>
    <a-assets>
      <a-asset-item id="bromeliads-obj" src="./flowers/Bromeliads/Bromeliads.obj"></a-asset-item>
      <a-asset-item id="bromeliads-mtl" src="./flowers/Bromeliads/Bromeliads.mtl"></a-asset-item>

      <a-asset-item id="papatest-gltf" src="./flowers/papatest/papatest.gltf"></a-asset-item>
      <a-asset-item id="monkey-gltf" src="./flowers/Monkey/monkey.gltf"></a-asset-item>
    </a-assets>

    <!-- Planet that grows everything -->
    <b-planet></b-planet>

    <a-sky color="#ECECEC"></a-sky>

    <a-camera>
      <a-cursor></a-cursor>
      <!-- Or <a-entity cursor></a-entity> -->
    </a-camera>
  </a-scene>
</template>

<script>
// @ is an alias to /src
import Planet from '@/components/Planet'
import TweenMax from 'gsap/all'

export default {
  name: 'Jason',
  components: {
    'b-planet': Planet,
  },
  mounted() {},
}
</script>
