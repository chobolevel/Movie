<template>
    <nav>
      <nuxt-link to="/">HOME</nuxt-link>
      <nuxt-link to="/movie/search">SEARCH</nuxt-link>
      <nuxt-link to="/user/kakao/login">LOGIN</nuxt-link>
    </nav>
</template>

<script>
    export default {
        name: "Nav"
    }
</script>

<style scoped>
  nav {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 10px;
    text-align: center;
  }
  nav a {
    padding: 10px 20px;
    color: #222;
    font-weight: bold;
    border-radius: 10px;
    transition: all .3s;
  }
  nav a:hover {
    background-color: #eee;
  }
</style>
