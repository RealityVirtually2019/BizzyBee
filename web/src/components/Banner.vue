<template>
  <div class="banner">
    <span class="text">{{ text }}</span>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'Banner',
  props: {
    text: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped>
.banner {
  position: relative;
  width: 100vw;
  height: 54px;

  background-color: $primary;

  display: flex;
  align-items: center;
}

.text {
  flex: 1;
  font-size: 20px;
  line-height: 24px;
  color: white;
  text-align: left;
  margin-left: 2em;
}
</style>
