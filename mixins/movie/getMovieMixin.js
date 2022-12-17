import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("movie", ["getMovies", "getMovieCount"])
  }
}
