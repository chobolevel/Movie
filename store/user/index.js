export const state = () => ({
  list: [],
  item: {}
});

export const mutations = {
  setList(state, list) {
    state.list = list;
  },
  setItem(state, item) {
    state.item = item;
  }
};

export const actions = {
  async fetchKakaoToken(code) {
    const { data } = await this.$axios.post('https://kauth.kakao.com/oauth/token', {
      grant_type: 'authorization_code',
      client_id: process.env.REST_API_KEY,
      redirect_uri: process.env.REDIRECT_URL,
      code
    });
    console.log(data);
  },
  async fetchHi() {
    const data = await this.$axios.get("http://localhost:10100/api/movie/list");
    console.log(data);
  }
};

export const getters = {

};
