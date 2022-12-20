export const state = () => ({
  movie: {},
  movies: [],
  movieCount: 0,
  params: {query_term: "", limit: "10", page: "1", sort_by: "rating", order_by: "desc"},
  loading: false,
  notFound: false
});

export const mutations = {
  setMovies(state, movies) {
    state.movies = movies;
  },
  setMovie(state, movie) {
    state.movie = movie;
  },
  setMovieCount(state, count) {
    state.movieCount = count;
  },
  setParams(state, params) {
    state.params = params;
  },
  setPage(state, page) {
    state.params.page = page;
  },
  setSortBy(state, sortBy) {
    state.params.sort_by = sortBy;
  },
  setOrderBy(state, orderBy) {
    state.params.order_by = orderBy;
  },
  setLoading(state, loading) {
    state.loading = loading;
  },
  setNotFound(state, notFound) {
    state.notFound = notFound;
  }
};

export const actions = {
  async setMovieInit({ commit }) {
    commit("setMovies", []);
    commit("setLoading", false);
    commit("setNotFound", false);
  },
  async setMovieList({commit}) {
    const { data: {data: { movie_count, movies } } } = await this.$axios.get(`https://yts.mx/api/v2/list_movies.json`, { params: { minimum_rating: 9, sort_by: "rating", order_by: "desc" } });
    if(movie_count > 0) {
      commit("setMovies", movies);
    } else {
      commit("setMovies", []);
    }
  },
  async setMovieDetail({commit}, id) {
    const { data: { data: { movie } } } = await this.$axios.get(`https://yts.mx/api/v2/movie_details.json`, { params: { movie_id: id } });
    if(movie.id !== 0) {
      commit("setMovie", movie);
    } else {
      commit("setMovie", {});
    }
  },
  async setRelativeMovieList({commit}, id) {
    const { data: { data: { movies, movie_count } } } = await this.$axios(`https://yts.mx/api/v2/movie_suggestions.json`, { params: { movie_id: id } });
    if(movie_count > 0) {
      commit("setMovies", movies);
    } else {
      commit("setMovies", []);
    }
  },
  async setSearchMovieList({ commit }, params) {
    commit("setLoading", true);
    commit("setNotFound", false);
    const { data: { data: { movies, movie_count }} } = await this.$axios("https://yts.mx/api/v2/list_movies.json", { params });
    commit("setLoading", false);
    if(movie_count > 0) {
      commit("setNotFound", false);
      commit("setMovies", movies);
      commit("setParams", params);
      commit("setMovieCount", movie_count);
    } else {
      commit("setNotFound", true);
      commit("setMovies", []);
      commit("setParams", params);
      commit("setMovieCount", movie_count);
    }
  },
  setParamsPage({ commit }, page) {
    commit("setPage", page);
  },
  setParamsSortBy({ commit }, sortBy) {
    commit("setSortBy", sortBy);
  },
  setParamsOrderBy({ commit }, orderBy) {
    commit("setOrderBy", orderBy);
  }
};

export const getters = {
  getMovies(state) {
    return state.movies;
  },
  getMovie(state) {
    return state.movie;
  },
  getMovieCount(state) {
    return state.movieCount;
  },
  getParams(state) {
    return state.params
  },
  getLoading(state) {
    return state.loading;
  },
  getNotFound(state) {
    return state.notFound;
  }
};
