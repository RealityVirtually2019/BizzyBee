<template>
  <!-- Planet that grows everything -->
  <Planet></Planet>
</template>

<script>
// @ is an alias to /src
import Planet from '@/components/Planet'
// import App3D from '@/components/App3D'
import TweenMax from 'gsap/all'

export default {
  name: 'Jason',
  components: {
    // 'b-app': App3D,
    'Planet': Planet,
  },
  mounted() {},
}
</script>
