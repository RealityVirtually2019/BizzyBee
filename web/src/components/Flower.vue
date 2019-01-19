<template>  

  <a-scene>
    <a-sphere v-if="mstage == 0" position="0 1.25 -5" radius="1" color="#FF00FF"></a-sphere>
    <a-sphere v-if="mstage == 1" position="0 1.25 -5" radius="1" color="#FF00F"></a-sphere>
    <a-sphere v-if="mstage == 2" position="0 1.25 -5" radius="4" color="#F0F"></a-sphere>
    <a-sphere v-if="mstage == 3" position="0 1.25 -5" radius="4" color="#FF0"></a-sphere>
  </a-scene>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'Flower',
  props:{
     mstage: {
       type: Number,
       default: 0,
     }
  }
}
</script>