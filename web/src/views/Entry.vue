<template>
  <div class="entry">
    <Banner text="Entry" />

    <h1 class="title">GARDENCARDS</h1>
    <!-- <img class="logo" src="@/assets/logo.png" alt="" /> -->
    <p class="desc">
      The interactive greeting card that blooms to life on any device with your
      well wishes and recorded messages.
    </p>

    <div class="btns">
      <el-button round class="btn buildBtn" @click="goBuild">
        Get Start
      </el-button>
      <el-button round class="btn howItWorkBtn" @click="goBuild">
        Learn More
      </el-button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Entry',
  data() {
    return {
      youtubeId: 'FSKZ4IowkYU',
      autoplay: 1,
      mute: 1,
    }
  },
  methods: {
    goBuild() {
      this.$router.push('build')
    },
  },
}
</script>

<style lang="scss" scoped>
.entry {
  text-align: center;
  background: white url(~@/assets/img/bg-planet.png) no-repeat fixed center;
  background-size: cover;
}

.title {
  color: white;
  font-size: 36px;
  margin: 5px 10px;
  margin-top: 20%;
}

.logo {
  max-width: 80vw;
  max-height: 200px;
}

.desc {
  text-align: justify;
  color: white;
  text-shadow: 1px 1px 4px #00000080;

  margin: 10px;
  background-color: #ffffff40;
  padding: 1em;
}

.btns {
  margin: 20px 10px;
  text-align: right;

  button {
    margin: 5px 5px;
  }
}
</style>
