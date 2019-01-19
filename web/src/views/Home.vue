<template>
  <a-scene>
    <!-- <a-sphere position="0 1.25 -5" radius="3.5" color="#EF2D5E"></a-sphere> -->
    <a-sky color="#ECECEC"></a-sky>
    <Flower :stage="2" />
  </a-scene>
</template>

<script>
// @ is an alias to /src
import Planet from '@/components/Planet'
import FlowerHolder from '@/components/FlowerHolder'
import Flower from '@/components/Flower'

export default {
  name: 'Home',
  components: {
    'b-planet': Planet,
    'b-flower': FlowerHolder,
    Flower,
  },
}
</script>
