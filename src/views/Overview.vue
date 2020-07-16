<template>
  <div>
    <h1>Welcome to my Home</h1>
    <div v-if="isAuthenticated">
      <p>You are authenticated</p>
      <p>
        <button @click="logout">Logout</button>
      </p>
      <StationsData />
    </div>
    <div v-else>
      <p>You are not authenticated</p>
      <p>
        <router-link to="/login">Login</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import StationsData from "@/components/StationsData.vue";

export default {
  // TODO: Optimize UI :)
  name: "Overview",
  components: {
    // TODO: Refactore components in whole app
    StationsData
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("clearAuth");
    }
  }
};
</script>
