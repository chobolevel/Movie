<template>
  <div class="paging-box">
    <p class="cur-page-num">{{ getCurPageNum }}</p>
    <ul>
      <li class="prev" @click="handleClickPrev">🡸</li>
      <li v-for="(page, index) in range(getStartPage, getEndPage)" :key="index" v-if="page <= getTotalPageCount">
        <span :value="page" @click="handleClickPage">{{ page }}</span>
      </li>
      <li class="next" @click="handleClickNext">🡺</li>
    </ul>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "paging",
  computed: {
    ...mapGetters("paging", [
      "getTotalCount",
      "getCurPageNum",
      "getCurPageBlock",
      "getTotalPageCount",
      "getStartPage",
      "getEndPage"
    ]),
    ...mapGetters("movie", ["getParams"])
  },
  methods: {
    ...mapActions("paging", ["setCurPage", "setCurPageBlock"]),
    ...mapActions("movie", ["setSearchMovieList", "setParamsPage"]),
    range(start, end) {
      let list = [];
      for(let i = start; i <= end; i++) {
        list.push(i);
      }
      return list;
    },
    async handleClickPage(e) {
      const page = e.target.innerText;
      this.setCurPage(page);
      this.setParamsPage(page);
      if(this.getParams.query_term !== '') {
        await this.setSearchMovieList(this.getParams);
      }
      //api 호출 메서드
    },
    async handleClickPrev() {
      if(this.getCurPageBlock !== 1) {
        this.setCurPageBlock(--this.getCurPageBlock);
        await this.setParamsPage(this.getCurPageNum);
        await this.setSearchMovieList(this.getParams);
      }
    },
    async handleClickNext() {
      if(this.getCurPageBlock < (Math.floor(this.getTotalPageCount / 10) + 1)) {
        this.setCurPageBlock(++this.getCurPageBlock);
        await this.setParamsPage(this.getCurPageNum);
        await this.setSearchMovieList(this.getParams);
      }
    }
  }
}
</script>

<style scoped>
  .paging-box {
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
    padding: 10px;
  }
  .cur-page-num {
    font-size: 20px;
    font-weight: bold;
    text-decoration: underline;
    margin-bottom: 20px;
  }
  ul li {
    display: inline-block;
    cursor: pointer;
  }
  ul li span {
    margin: 0 10px;
    font-size: 20px;
  }
</style>
