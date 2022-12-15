export const state = () => ({
  movie: {},
  movies: [],
  params: {query_term: "", limit: "10", page: "1", sort_by: "rating", order_by: "desc"}
});

export const mutations = {
  setMovies(state, movies) {
    state.movies = movies;
  },
  setMovie(state, movie) {
    state.movie = movie;
  }
};

export const actions = {
  async setMovieList({commit}) {
    const { data: {data: { movie_count, movies } } } = await this.$axios.get(`https://yts.mx/api/v2/list_movies.json`, { params: { minimum_rating: 9, sort_by: "rating", order_by: "desc" } });
    if(movie_count > 0) {
      commit("setMovies", movies);
    } else {
      commit("setMovies", []);
    }
  },
  async setMovieDetail({commit}, id) {
    const { data: { status, data: { movie } } } = await this.$axios.get(`https://yts.mx/api/v2/movie_details.json`, { params: { movie_id: id } });
    if(status === 'ok') {
      commit("setMovie", movie);
    } else {
      commit("setMovie", {});
    }
  },
  async setRelativeMovieList({commit}, id) {
    const { data: { status, data: { movies } } } = await this.$axios(`https://yts.mx/api/v2/movie_suggestions.json`, { params: { movie_id: id } });
    if(status === 'ok') {
      commit("setMovies", movies);
    } else {
      commit("setMovies", []);
    }
  },
  async setSearchMovieList({ commit }, { query_term, limit, page, sort_by, order_by }) {
    const { data: { status, data: { movies }} } = await this.$axios("https://yts.mx/api/v2/list_movies.json", { params: { query_term, limit, page, sort_by, order_by }});
    if(status === 'ok') {
      commit("setMovies", movies);
    } else {
      commit("setMovies", []);
    }
  }
};

export const getters = {
  getMovies(state) {
    return state.movies;
  },
  getMovie(state) {
    return state.movie;
  }
};
