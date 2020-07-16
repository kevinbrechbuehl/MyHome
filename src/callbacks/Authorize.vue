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
export default {
  name: "Authorize",
  data() {
    return {
      state: this.$route.query.state,
      code: this.$route.query.code
    };
  },
  computed: {
    loading() {
      return this.$store.getters.isLoading;
    },
    error() {
      return this.$store.getters.error;
    }
  },
  created() {
    this.getToken();
  },
  methods: {
    async getToken() {
      await this.$store.dispatch("getToken", {
        loginState: this.state,
        code: this.code
      });
      if (!this.$store.getters.error) {
        this.$router.push("/");
      }
    }
  }
};
</script>
