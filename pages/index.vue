<template>
    <section>
      <p>전체 평점 순위</p>
      <ul>
        <li v-for="(movie, index) in getMovies" :key="index">
          <div class="list-inner">
            <div class="image">
              <img :src="movie.medium_cover_image" @click="handleClickImg(movie)">
              <span>{{ index + 1 }}</span>
            </div>
            <div class="desc">
              <nuxt-link :to="/movie/ + movie.id">{{ movie.title_english }}({{ movie.year }})</nuxt-link>
              <p v-if="movie.rating !== ''">⭐{{ movie.rating }}</p>
            </div>
          </div>
        </li>
      </ul>
    </section>
</template>

<script>
    import {mapActions } from "vuex";
    import movieMixin from "../mixins/movie/getMovieMixin";

    export default {
      name: "index",
      mixins: [movieMixin],
      methods: {
        ...mapActions("movie", ["setMovieList"]),
        handleClickImg(movie) {
          this.$router.push(`/movie/${movie.id}`);
        }
      },
      async asyncData({ store }) {
        await store.dispatch("movie/setMovieList");
      }
    }
</script>

<style scoped>
 section {
   width: 100%;
   max-width: 1500px;
   margin: 0 auto;
 }
 p {
   font-size: 20px;
   font-weight: bold;
   margin: 10px 20px;
 }
 ul {
   width: 100%;
   display: grid;
   grid-template-columns: repeat(5, 1fr);
   grid-gap: 20px;
 }
 ul li {
   text-align: center;
 }
 ul li div.list-inner {
   transition: all .3s;
 }
 ul li div.list-inner:hover {
   transform: translateY(-10px);
 }
 ul li div.image {
   position: relative;
   display: inline-block;
   margin: 20px;
 }
 ul li div.image img {
   width: 200px;
   height: 300px;
   border-radius: 10px;
   box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
   cursor: pointer;
 }
 ul li div.image span {
   position: absolute;
  bottom: 20px;
   left: 10px;
   color: white;
   font-size: 50px;
   font-style: italic;
 }
 ul li div.desc {
   width: 100%;
   padding: 0 10px;
   margin-bottom: 10px;
 }
 ul li div.desc a {
   color: #333;
   font-weight: bold;
 }
 ul li div.desc p {
   font-weight: normal;
 }
</style>
