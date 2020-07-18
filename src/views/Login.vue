<template>
  <div class="uk-position-center uk-text-center">
    <p>Loading, please wait...</p>
  </div>
</template>

<script>
import Constants from "@/constants.js";

export default {
  name: "Login",
  created() {
    Promise.all([
      this.$store.dispatch("clearAuth"),
      this.$store.dispatch("generateLoginState")
    ]).then(() => {
      window.location =
        `/api/authorize` +
        `?redirect_uri=${encodeURIComponent(Constants.AUTH_CALLBACK_URI)}` +
        `&scope=${Constants.AUTH_SCOPE}` +
        `&state=${this.$store.getters.loginState}`;
    });
  }
};
</script>
