<template>
  <section>
    <div class="search-box">
      <form>
        <select v-model="limit">
          <option value="10">10개씩 보기</option>
          <option value="20">20개씩 보기</option>
          <option value="30">30개씩 보기</option>
          <option value="40">40개씩 보기</option>
        </select>
        <input type="text" v-model="query_term">
        <button @click="handleSearch">검색</button>
      </form>
    </div>
    <div class="list-box">
      <ul>
        <li v-for="(movie, index) in getMovies" :key="index">
          <img :src="movie.medium_cover_image" :alt="movie.title">
          <router-link :to="/movie/ + movie.id">{{ movie.title_english }}</router-link>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "search",
  data() {
    return {
      limit: "10",
      query_term: ""
    }
  },
  computed: {
    ...mapGetters("movie", ["getMovies"])
  },
  methods: {
    handleSearch(e) {
      e.preventDefault();
      this.$store.dispatch("movie/setSearchMovieList", { query_term: this.query_term, limit: this.limit })
    }
  }
}
</script>

<style scoped>

</style>
