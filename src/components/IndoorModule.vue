<template>
  <div>
    <div class="uk-card uk-card-default uk-card-body">
      <div class="uk-flex">
        <h3 class="uk-card-title">{{ data.name }}</h3>
        <span class="uk-card-title flex-right"
          >{{ data.temperature }} &#8451;</span
        >
      </div>
      <div class="uk-flex uk-flex-middle">
        <div>
          <span uk-icon="drop" ratio="0.8"></span>
          <span class="margin-xsmall-left"
            >{{ data.humidity }} %<br /><HealthIndex :index="humidityIndex"
          /></span>
        </div>
        <div class="flex-right">
          <span uk-icon="feather" ratio="0.4"></span>
          <span class="margin-xsmall-left"
            >{{ data.co2 }} ppm<br /><HealthIndex
              :index="co2Index"
              class="uk-text-right"
          /></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HealthIndex from "@/components/HealthIndex.vue";

export default {
  name: "IndoorModule",
  components: {
    HealthIndex
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  computed: {
    humidityIndex() {
      return this.data.humidity >= 40 && this.data.humidity <= 50
        ? "excellent"
        : this.data.humidity >= 30 && this.data.humidity <= 60
        ? "good"
        : this.data.humidity >= 20 && this.data.humidity <= 70
        ? "satisfying"
        : this.data.humidity >= 15 && this.data.humidity <= 80
        ? "poor"
        : "critical";
    },
    co2Index() {
      return this.data.co2 <= 900
        ? "excellent"
        : this.data.co2 <= 1150
        ? "good"
        : this.data.co2 <= 1400
        ? "satisfying"
        : this.data.co2 <= 1600
        ? "poor"
        : "critical";
    }
  }
};
</script>

<style scoped>
.uk-card {
  background-color: #f7fafc;
}
</style>
