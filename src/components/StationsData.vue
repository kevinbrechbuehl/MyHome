<template>
  <div uk-grid class="uk-margin-top margin-bottom">
    <template v-for="station in data">
      <OutdoorModule
        v-if="station.type === 'outdoor'"
        :key="station.id"
        :data="station"
        class="uk-width-1-1"
      />
      <IndoorModule
        v-if="station.type === 'indoor'"
        :key="station.id"
        :data="station"
        class="uk-width-1-1 uk-width-1-2@m"
      />
    </template>
  </div>
</template>

<script>
import IndoorModule from "@/components/IndoorModule.vue";
import OutdoorModule from "@/components/OutdoorModule.vue";

export default {
  name: "StationsData",
  components: {
    IndoorModule,
    OutdoorModule
  },
  computed: {
    data() {
      return this.$store.getters.data;
    }
  },
  methods: {
    fetchData() {
      this.$store.dispatch("fetchData");
    }
  },
  created() {
    this.fetchData();

    this.interval = setInterval(() => {
      if (!this.error) {
        this.fetchData();
      }
    }, 5 * 60 * 1000);
  },
  beforeDestroy() {
    clearInterval(this.interval);
  }
};
</script>

<style scoped>
.margin-bottom {
  margin-bottom: 40px;
}
</style>
