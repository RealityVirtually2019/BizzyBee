<template>
  <a-scene>
    <b-planet @></b-planet>
    <a-sky color="#ECECEC"></a-sky>
  </a-scene>
</template>

<script>
// @ is an alias to /src
import Planet from '@/components/Planet'

export default {
  name: 'Jason',
  components: {
      'b-planet': Planet
  },
}
</script>
