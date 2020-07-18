<template>
  <div>
    <div v-if="isAuthenticated" class="uk-container">
      <Header />
      <StationsData />
    </div>
    <div v-else class="uk-position-center uk-text-center">
      <p>You are not authenticated</p>
      <router-link to="/login" class="uk-button uk-button-primary"
        >Login</router-link
      >
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import StationsData from "@/components/StationsData.vue";

export default {
  name: "Overview",
  components: {
    Header,
    StationsData
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    }
  }
};
</script>
