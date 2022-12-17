export const state = () => ({
  listCount: 0,
  limit: 10,  //컨텐츠를 10개씩 보여줌
  curPageNum: 1, //현재 페이지 번호
  curPageBlock: 1, //현재 페이지 블록 번호
  perPageNum: 10,  //페이지 번호를 10개씩 보여줌
  prev: false,
  next: false
});

export const mutations = {
  setListCount(state, listCount) {
    state.listCount = listCount;
  },
  setLimit(state, limit) {
    state.limit = limit;
  },
  setCurPageNum(state, num) {
    state.curPageNum = num;
  },
  setCurPageBlockNum(state, num) {
    state.curPageBlock = num;
  },
  setPrev(state, prev) {
    state.prev = prev;
  },
  setNext(state, next) {
    state.next = next;
  }
};

export const actions = {
  setPageCount({ commit }, listCount) {
    commit("setListCount", listCount);
  },
  setCurPage({ commit }, num) {
    commit("setCurPageNum", num);
  },
  setCurPageBlock({ commit }, num) {
    commit("setCurPageBlockNum", num);
    commit("setCurPageNum", ((num - 1) * 10 + 1));
  },
  setLimitPage({ commit }, limit) {
    commit("setLimit", limit);
  }
};

export const getters = {
  getTotalCount(state) {
    return state.listCount;  //게시물 총 개수
  },
  getCurPageNum(state) {
    return state.curPageNum;
  },
  getCurPageBlock(state) {
    return state.curPageBlock;
  },
  getTotalPageCount(state) {
    return Math.floor(state.listCount / state.limit) + 1;  //페이지 총 개수
  },
  getStartPage(state) {
    return (state.curPageBlock - 1) * state.perPageNum + 1;
  },
  getEndPage(state) {
    return (state.curPageBlock - 1) * state.perPageNum + state.perPageNum;
  }
};
