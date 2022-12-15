<template>
    <section>
      <div class="movie-detail">
        <img :src="getMovie.medium_cover_image" :alt="getMovie.title">
        <h2>{{ getMovie.title_english }}({{ getMovie.year }})</h2>
        <p>{{ getMovie.description_intro }}</p>
        <p>⭐{{ getMovie.rating }}</p>
        <p>언어 : {{ getMovie.language }}</p>
        <p>상영시간 : {{ runtime }}</p>
        <fieldset>
          <legend>장르</legend>
          <ul>
            <li v-for="(genre, index) in getMovie.genres" :key="index">
              {{ genre }}
            </li>
          </ul>
        </fieldset>
        <a :href="getMovie.url">다운로드 또는 시청하기</a>
      </div>
      <div class="relative-movies">
        <ul>
          <li v-for="(movie, index) in getMovies" :key="index">
            <img :src="movie.medium_cover_image" :alt="movie.title">
            <nuxt-link :to="/movie/ + movie.id">{{ movie.title_english }}</nuxt-link>
          </li>
        </ul>
      </div>
    </section>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";

    export default {
      methods: {
        ...mapActions("movie", ["setMovieDetail", "setRelativeMovieList"])
      },
      computed: {
        ...mapGetters("movie", ["getMovie", "getMovies"]),
        runtime() {
          return Math.floor(this.getMovie.runtime / 60) + "시간 " + this.getMovie.runtime %  60 + "분";
        }
      },
      async fetch() {
        await this.setMovieDetail(this.$route.params.id);
        await this.setRelativeMovieList(this.$route.params.id);
      }
    }
</script>

<style scoped>

</style>
