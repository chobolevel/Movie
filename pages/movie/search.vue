<template>
  <section>
    <div class="search-box">
      <form>
        <div v-if="getMovies.length > 0">
          <select v-model="sort_by" @change="handleChangeSortBy">
            <option value="rating">별점</option>
            <option value="title">제목</option>
            <option value="year">연도</option>
          </select>
          <select v-model="order_by" @change="handleChangeOrderBy">
            <option value="desc">내림차순</option>
            <option value="asc">오름차순</option>
          </select>
        </div>
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

    <paging/>

  </section>
</template>

<script>
import movieClear from "../../middleware/movieClear";
import movieMixin from "../../mixins/movie/getMovieMixin";
import paging from "../../components/common/paging";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "search",
  middlewares: ["movieClear"],
  mixins: [movieMixin],
  components: {
    paging
  },
  data() {
    return {
      limit: "10",
      query_term: "",
      sort_by: "rating",
      order_by: "desc"
    }
  },
  async asyncData({ store }) {
    await store.dispatch("movie/setMovieListClear");
    await store.dispatch("paging/setPageCount", 0);
  },
  methods: {
    ...mapActions("movie", ["setParamsSortBy", "setParamsOrderBy", "setSearchMovieList"]),
    ...mapActions("paging", ["setLimitPage"]),
    async handleSearch(e) {
      e.preventDefault();
      await this.$store.dispatch("movie/setSearchMovieList", { query_term: this.query_term, limit: this.limit, page: 1, sort_by: "rating", order_by: "desc" })
      await this.$store.dispatch("paging/setPageCount", this.getMovieCount);
      await this.$store.dispatch("paging/setLimitPage", this.limit);
    },
    handleChangeSortBy() {
      this.setParamsSortBy(this.sort_by);
      this.setSearchMovieList(this.getParams);
    },
    handleChangeOrderBy() {
      this.setParamsOrderBy(this.order_by);
      this.setSearchMovieList(this.getParams);
    }
  },
  computed: {
    ...mapGetters("movie", ["getParams"])
  }
}
</script>

<style scoped>

</style>
