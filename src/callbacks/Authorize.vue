<template>
  <div class="uk-position-center uk-text-center text-white">
    <p v-if="loading">Loading, please wait...</p>
    <div v-if="error">
      <p>
        There was an error validating your login:
        <br />
        <i class="uk-text-small">{{ error }}</i>
      </p>
      <router-link to="/" class="uk-button uk-button-primary"
        >Go back</router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "Authorize",
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
        loginState: this.$route.query.state,
        code: this.$route.query.code
      });
      if (!this.$store.getters.error) {
        this.$router.push("/");
      }
    }
  }
};
</script>
