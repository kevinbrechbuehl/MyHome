<template>
  <div>
    <div v-if="loading">Loading, please wait...</div>
    <div v-if="error">
      <p>There was an error validating your login, please try again...</p>
      <p>{{ error }}</p>
      <p>
        <router-link to="/">Go back</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import AuthService from "@/services/auth.service.js";
import Constants from "@/constants.js";

import axios from "axios";

export default {
  name: "Authorize",
  data() {
    return {
      state: this.$route.query.state,
      code: this.$route.query.code,
      loading: false,
      error: null
    };
  },
  created() {
    if (AuthService.verifyState(this.state)) {
      this.fetchData();
    } else {
      this.error = "Invalid login state";
    }
  },
  methods: {
    async fetchData() {
      this.loading = true;

      try {
        const { data } = await axios.get(
          `/api/get-token` +
            `?code=${this.code}` +
            `&scope=${Constants.AUTH_SCOPE}` +
            `&redirect_uri=${encodeURIComponent(Constants.AUTH_CALLBACK_URI)}`
        );

        AuthService.login(
          data.access_token,
          data.refresh_token,
          data.expires_in
        );

        this.$router.push("/");
      } catch (error) {
        this.loading = false;
        this.error = error.response.data;
      }
    }
  }
};
</script>
