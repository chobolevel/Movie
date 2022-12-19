<template>
  <section>
    <div class="search-box">
      <form>
        <div class="search-options">
          <select v-model="sort_by" @change="handleChangeSortBy" v-show="getMovies.length > 0">
            <option value="rating">별점</option>
            <option value="title">제목</option>
            <option value="year">연도</option>
          </select>
          <select v-model="order_by" @change="handleChangeOrderBy" v-show="getMovies.length > 0">
            <option value="desc">내림차순</option>
            <option value="asc">오름차순</option>
          </select>
        </div>
        <div class="search-input">
          <select v-model="limit">
            <option value="10">10개씩 보기</option>
            <option value="20">20개씩 보기</option>
            <option value="30">30개씩 보기</option>
            <option value="40">40개씩 보기</option>
          </select>
          <input type="text" v-model="query_term" placeholder="검색어를 입력하세요.">
          <button @click="handleSearch">검색</button>
        </div>
      </form>
    </div>

    <div class="list-box">
      <ul>
        <li v-for="(movie, index) in getMovies" :key="index">
          <img :src="movie.medium_cover_image" :alt="movie.title" @click="handlePosterClick(movie.id)">
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
    },
    handlePosterClick(id) {
      this.$router.push(`/movie/${id}`);
    }
  },
  computed: {
    ...mapGetters("movie", ["getParams"])
  }
}
</script>

<style scoped>
  section {
    width: 100%;
    max-width: 1500px;
    margin: 0 auto;
  }
  .search-box form {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
  }
  .search-options select {
    width: 80px;
    height: 30px;
    text-align: center;
    border-radius: 10px;
    border: none;
    outline: 2px solid #ec3224;
    margin-right: 10px;
  }
  .search-input select {
    width: 100px;
    height: 30px;
    text-align: center;
    border: none;
    outline: 2px solid #ec3224;
    border-radius: 10px;
  }
  .search-input input {
    width: 200px;
    height: 30px;
    padding: 10px;
    border-radius: 10px;
    border: none;
    outline: 2px solid #ec3224;
    margin-left: 10px;
  }
  .search-input button {
    width: 50px;
    height: 30px;
    background-color: #ec3224;
    border: none;
    outline: 2px solid #ec3224;
    color: white;
    border-radius: 10px;
    cursor: pointer;
    transition: all .3s;
  }
  .search-input button:hover {
    background-color: white;
    color: #ec3224;
  }
  .list-box {
    width: 90%;
    margin: 50px auto;
  }
  .list-box ul {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 20px;
  }
  .list-box ul li {
    text-align: center;
    transition: all .3s;
  }
  .list-box ul li:hover {
    transform: translateY(-10px);
  }
  .list-box ul li img {
    width: 200px;
    height: 300px;
    margin: 20px 0;
    background-color: white;
    border-radius: 20px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  }
  .list-box ul li a {
    display: block;
    color: #222;
    font-family: arial;
  }
</style>
