<template>
  <a-scene>
    <!-- <a-sphere position="0 1.25 -5" radius="3.5" color="#EF2D5E"></a-sphere> -->
    <a-sky color="#ECECEC"></a-sky>
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
