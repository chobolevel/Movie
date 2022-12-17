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
* {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
  box-sizing: border-box;
}
ul li {
  list-style-type: none;
}
a {
  text-decoration: none;
}
section {
  padding: 20px;
}
</style>

