<template>
  <div>
    <p>call back</p>
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch('user/fetchKakaoToken', this.$route.query.code);
  }
}
</script>

<style scoped>

</style>
