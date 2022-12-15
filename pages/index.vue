<template>
    <section>
      <h2>Welcome MovieLand</h2>
      <ul>
        <li v-for="(movie, index) in getMovies" :key="index">
          <div>
            <img :src="movie.medium_cover_image">
            <nuxt-link :to="/movie/ + movie.id">{{ movie.title_english }}({{ movie.year }})</nuxt-link>
            <span>⭐ {{ movie.rating }}</span>
          </div>
        </li>
      </ul>
    </section>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";

    export default {
      name: "index",
      methods: {
        ...mapActions("movie", ["setMovieList"])
      },
      computed: {
        ...mapGetters("movie", ["getMovies"])
      },
      async fetch() {
          await this.setMovieList();
      }
    }
</script>

<style scoped>

</style>
