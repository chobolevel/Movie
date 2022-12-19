<template>
    <section>
      <div class="movie-info">
        <div class="movie">
          <div>
            <img class="movie-poster" :src="getMovie.medium_cover_image" :alt="getMovie.title">
            <a :href="getMovie.url" target="_blank">다운로드 또는 시청하기</a>
          </div>
          <div class="movie-detail">
            <p class="movie-title">{{ getMovie.title_english }}({{ getMovie.year }})</p>
            <p class="movie-desc">{{ getMovie.description_intro }}</p>
            <p class="movie-rating">⭐{{ getMovie.rating }}</p>
            <p class="movie-language">언어({{ getMovie.language }})</p>
            <p class="movie-duration">러닝타임({{ runtime }})</p>
            <fieldset>
              <legend>장르</legend>
              <ul>
                <li v-for="(genre, index) in getMovie.genres" :key="index">
                  {{ genre }}
                </li>
              </ul>
            </fieldset>
          </div>
        </div>
      </div>
      <div class="relative-movies">
        <ul>
          <li v-for="(movie, index) in getMovies" :key="index">
            <img :src="movie.medium_cover_image" :alt="movie.title" @click="handlePosterClick(movie.id)">
            <nuxt-link :to="/movie/ + movie.id">{{ movie.title_english }}</nuxt-link>
          </li>
        </ul>
      </div>
    </section>
</template>

<script>
    import {mapGetters} from "vuex";
    import movieClear from "../../middleware/movieClear";

    export default {
      middlewares: ["movieClear"],
      computed: {
        ...mapGetters("movie", ["getMovie", "getMovies"]),
        runtime() {
          return Math.floor(this.getMovie.runtime / 60) + "시간 " + this.getMovie.runtime %  60 + "분";
        }
      },
      methods: {
        handlePosterClick(id) {
          this.$router.push(`/movie/${id}`);
        }
      },
      async asyncData({ store, route }) {
        await store.dispatch("movie/setMovieDetail", route.params.id);
        await store.dispatch("movie/setRelativeMovieList", route.params.id);
      }
    }
</script>

<style scoped>
  section {
    width: 100%;
    max-width: 1500px;
    margin: 0 auto;
    padding: 20px;
  }
  .movie-info {

  }
  .movie-info .movie {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .movie-info .movie div .movie-poster {
    width: 300px;
    margin: 30px 100px 30px 0;
    border-radius: 20px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  }
  .movie-info .movie div a {
    display: block;
    width: 250px;
    padding: 10px 20px;
    margin-left: 25px;
    text-align: center;
    border-radius: 10000px;
    border: 2px solid #ec3224;
    background-color: white;
    color: #ec3224;
    font-weight: bold;
    transition: all .3s;
  }
  .movie-info .movie div a:hover {
    background-color: #ec3224;
    color: white;
  }
  .movie-info .movie .movie-detail p {
    margin-bottom: 30px;
    margin-left: 20px;
  }
  .movie-info .movie .movie-detail .movie-title{
    font-family: arial;
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 50px;
    margin-left: 0;
  }
  .movie-info .movie .movie-detail fieldset {
    margin-left: 20px;
    padding: 20px;
    text-align: center;
    border: 3px solid #ec3224;
  }
  .movie-info .movie .movie-detail fieldset legend {
    padding: 0 20px;
    font-size: 18px;
    font-weight: bold;
  }
  .movie-info .movie .movie-detail fieldset ul li {
    display: inline-block;
    margin: 0 20px;
  }
  .relative-movies {
    width: 90%;
    margin: 100px auto;
  }
  .relative-movies ul {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
  }
  .relative-movies ul li {
    text-align: center;
    transition: all .3s;
  }
  .relative-movies ul li:hover {
    transform: translateY(-10px);
  }
  .relative-movies ul li img {
    width: 250px;
    border-radius: 20px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
    margin-bottom: 30px;
    cursor: pointer;
  }
  .relative-movies ul li a {
    display: block;
    color: #222;
    font-size: 18px;
    font-weight: bold;
  }
</style>
