<template>
  <div class="ToMobile">
    <div class="guide">
      <img :src="QRUrl" alt="QRCode Url" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'ToMobile',
  data() {
    return {
      url: window.location.href,
    }
  },
  computed: {
    QRUrl() {
      return `https://chart.googleapis.com/chart?chs=500x500&cht=qr&chld=L|1&choe=UTF-8&chl=${this.url}`
    },
  },
}
</script>

<style lang="scss" scoped>
$mobile-width: '440px';

.ToMobile {
  position: fixed;

  left: 0px;
  top: 0px;
  width: 100vw;
  height: 100vh;

  text-align: center;
  background: white url(~@/assets/img/bg-planet.png) no-repeat fixed center;
  background-size: cover;

  @media all and (max-width: $mobile-width) {
    display: none;
  }

  display: flex;
  justify-content: center;
  align-items: center;

  .guide {
    img {
      width: 300px;
      border-radius: 10px;
    }
  }
}
</style>
