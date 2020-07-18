<template>
  <div class="uk-margin-top uk-flex uk-flex-middle uk-text-muted">
    <button
      @click="fetchData"
      uk-icon="refresh"
      class="uk-margin-small-right"
      title="Refresh"
    ></button>

    <span v-if="loading">Loading ...</span>
    <span v-else-if="error" class="uk-text-danger uk-text-italic">{{
      error
    }}</span>
    <span v-else-if="lastUpdate">{{ lastUpdate }}</span>

    <button
      @click="logout"
      uk-icon="sign-out"
      class="flex-right"
      title="Logout"
    ></button>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "Header",
  data() {
    return {
      lastUpdate: null
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
  methods: {
    fetchData() {
      this.$store.dispatch("fetchData");
    },
    logout() {
      this.$store.dispatch("clearAuth");
    },
    setLastUpdate() {
      this.lastUpdate = moment(this.$store.getters.lastUpdate).fromNow();
    }
  },
  created() {
    this.unwatch = this.$store.watch(
      (state, getters) => getters.lastUpdate,
      () => {
        this.setLastUpdate();
      }
    );

    this.interval = setInterval(() => {
      this.setLastUpdate();
    }, 5 * 1000);
  },
  beforeDestroy() {
    this.unwatch();
    clearInterval(this.interval);
  }
};
</script>
