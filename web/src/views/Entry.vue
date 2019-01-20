<template>
  <div class="entry">
    <!-- <iframe
      :src="
        `https://www.youtube.com/embed/${youtubeId}?playlist=${youtubeId}&rel=0&playsinline=1&fs=0&disablekb=1&controls=0&modestbranding=1&autoplay=${autoplay}&loop=1&mute=${mute}`
      "
      frameborder="0"
      allow="autoplay; encrypted-media"
      allowfullscreen
    >
    </iframe> -->

    <h1 class="title">BizzyBee</h1>
    <img class="logo" src="@/assets/logo.png" alt="" />
    <p class="desc">
      You create a world in minutes with our simple designer app, then invite
      friends and family to contribute to this growing garden. Your friend will
      receive the card and with two simple clicks they can be transported to a
      world made just for them by their loved ones.
    </p>
    <div class="btns">
      <el-button class="buildBtn" @click="goBuild">Build Garden</el-button>
      <br />
      <el-button class="howItWorkBtn" size="mini" @click="goBuild">
        See How it Works
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
  background-color: #65c18f;
}

.title {
  color: white;
  font-size: 64px;
  margin: 5px 0px;
}

.logo {
  max-width: 80vw;
  max-height: 200px;
}

.desc {
  text-align: justify;
  color: white;
  text-shadow: 1px 1px 4px #00000080;
  margin: 5px 25px;
}

.btns {
  margin-top: 20px;

  button {
    margin: 5px 0px;
    background: transparent;
    color: white;
  }
}
</style>
