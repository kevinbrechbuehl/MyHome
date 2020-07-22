<template>
  <div>
    <div v-if="isAuthenticated" class="uk-container">
      <vue-pull-refresh
        :on-refresh="fetchData"
        :config="config"
        class="uk-height-viewport"
      >
        <Header />
        <StationsData />
      </vue-pull-refresh>
    </div>
    <div v-else class="uk-position-center uk-text-center">
      <NotAuthenticated />
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import NotAuthenticated from "@/components/NotAuthenticated.vue";
import StationsData from "@/components/StationsData.vue";
import VuePullRefresh from "vue-pull-refresh";

export default {
  name: "Overview",
  components: {
    Header,
    NotAuthenticated,
    StationsData,
    VuePullRefresh
  },
  data() {
    return {
      config: {
        errorLabel: "Ups... There was an error.",
        startLabel: "Pull down to refresh",
        readyLabel: "Release to refresh",
        loadingLabel: "Loading ..."
      }
    };
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    }
  },
  methods: {
    fetchData() {
      return this.$store.dispatch("fetchData", true);
    }
  }
};
</script>

<style>
.pull-down-header {
  background-color: #000 !important;
}
</style>
