<template>
  <div class="entry">
    <h1>BizzyBee</h1>
    <p>
      We are ...We are ...We are ...We are ...We are ...We are ...We are ...We
      are ...We are ...We are ...We are ...We are ...We are ...We are ...We are
      ...We are ...We are ...We are ...We are ...We are ...
    </p>
    <el-button @click="goBuild">Build Garden</el-button>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Entry',
  methods: {
    goBuild() {
      this.$router.push('build')
    },
  },
}
</script>
