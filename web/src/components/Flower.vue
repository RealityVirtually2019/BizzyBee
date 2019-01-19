<template>
  <a-entity>
    <a-sphere
      v-if="stage == 0"
      position="0 1.25 -15"
      radius="0.5"
      color="#FF00FF"
    ></a-sphere>
    <a-sphere
      v-if="stage == 1"
      position="0 1.25 -5"
      radius="1"
      color="#FF00F"
    ></a-sphere>
    <a-sphere
      v-if="stage == 2"
      position="0 1.25 -5"
      radius="2"
      color="#F0F"
    ></a-sphere>
    <a-sphere
      v-if="stage == 3"
      position="0 1.25 -5"
      radius="3"
      color="#FF0"
    ></a-sphere>
  </a-entity>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'Flower',
  props: {
    stage: {
      type: Number,
      default: 0,
    },
  },
}
</script>


<!-- https://poly.google.com/view/5FZIGjZBWTB -->