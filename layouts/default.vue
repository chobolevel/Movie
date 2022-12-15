<template>
  <div>
    <Header></Header>
    <Nav></Nav>
    <nuxt/>
    <Footer></Footer>
  </div>
</template>

<script>
  import Header from "../components/Header";
  import Nav from "../components/Nav";
  import Footer from "../components/Footer";

  export default {
    components: {
      Header,
      Nav,
      Footer
    }
  }
</script>

<style>

</style>

