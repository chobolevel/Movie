<template>
  <div>
    <p>{{ getCurPageNum }}</p>
    <ul>
      <li @click="handleClickPrev">Prev</li>
      <li v-for="(page, index) in range(getStartPage, getEndPage)" :key="index" v-if="page <= getTotalPageCount">
        <span :value="page" @click="handleClickPage">{{ page }}</span>
      </li>
      <li @click="handleClickNext">Next</li>
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
      await this.setSearchMovieList(this.getParams);
      //api 호출 메서드
    },
    handleClickPrev() {
      if(this.getCurPageBlock !== 1) {
        this.setCurPageBlock(--this.getCurPageBlock);
      }
    },
    handleClickNext() {
      if(this.getCurPageBlock < (Math.floor(this.getTotalPageCount / 10) + 1)) {
        this.setCurPageBlock(++this.getCurPageBlock);
      }
    }
  }
}
</script>

<style scoped>

</style>
