<template>
    <footer>
      <p>영화 이야기 &copy;{{new Date().getFullYear()}}</p>
    </footer>
</template>

<script>
    export default {
        name: "Footer"
    }
</script>

<style scoped>
  footer {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 70px;
  }
  footer p {
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    color: #333;
  }
</style>
