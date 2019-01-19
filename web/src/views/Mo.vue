<template>
  <a-scene>
    <!-- <a-sphere position="0 1.25 -5" radius="3.5" color="#EF2D5E"></a-sphere> -->
    <a-sky color="#ECECEC"></a-sky>
    <a-assets>
      <a-asset-item id="bromeliads-obj" src="./flowers/Bromeliads/Bromeliads.obj"></a-asset-item>
      <a-asset-item id="bromeliads-mtl" src="./flowers/Bromeliads/Bromeliads.mtl"></a-asset-item>

      <a-asset-item id="papatest-gltf" src="./flowers/papatest/papatest.gltf"></a-asset-item>
    </a-assets>
    <Flower :stage="0" />
  </a-scene>
</template>

<script>
// @ is an alias to /src
import Flower from '@/components/Flower'

export default {
  name: 'Mo',
  components: {
    Flower,
  },
}
</script>
