<template>
  <div class="login_box">
    <div @click="handleKakaoLogin">카카오 로그인</div>
    <div @click="handleHi">안녕</div>
  </div>
</template>

<script>
export default {
  methods: {
    handleKakaoLogin() {
      location.href=`https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.REST_API_KEY}&redirect_uri=${process.env.REDIRECT_URL}`
    },
    handleHi() {
      this.$store.dispatch('user/fetchHi');
    }
  }
}
</script>

<style scoped>
  .login_box {
    text-align: center;
    padding: 100px 0;
  }
  .login_box div {
    width: 200px;
    margin: 0 auto;
    border-radius: 12px;
    padding: 10px;
    background-color: #FEE500;
    color: #000000;
    font-weight: bold;
  }
</style>
