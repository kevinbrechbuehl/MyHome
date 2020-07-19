<template>
  <div>
    <div
      class="uk-card uk-card-primary uk-card-body uk-flex uk-flex-middle uk-flex-wrap"
    >
      <h3 class="uk-card-title">{{ data.name }} in {{ data.location }}</h3>
      <div class="uk-flex uk-flex-middle flex-right temperature">
        <span class="uk-card-title">{{ data.temperature }} &#8451;</span>
        <span
          v-if="temperatureTrendIcon"
          :uk-icon="temperatureTrendIcon"
          class="icon"
        ></span>
        <div class="uk-margin-small-left uk-text-small uk-text-light">
          <span uk-icon="triangle-down"></span>
          <span>{{ data.temperature_min }} &#8451;</span>
          <span class="uk-margin-small-left" uk-icon="triangle-up"></span>
          <span>{{ data.temperature_max }} &#8451;</span>
        </div>
      </div>
      <div class="uk-flex uk-flex-middle uk-margin-xlarge-left humidity">
        <span uk-icon="drop" ratio="0.8" class="icon"></span>
        <span class="uk-card-title margin-xsmall-left"
          >{{ data.humidity }} %</span
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "OutdoorModule",
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  computed: {
    temperatureTrendIcon() {
      return this.data.temperature_trend === "stable"
        ? "arrow-right"
        : this.data.temperature_trend === "up"
        ? "arrow-up"
        : this.data.temperature_trend === "down"
        ? "arrow-down"
        : null;
    }
  }
};
</script>

<style scoped>
h3 {
  margin: 0;
}

.uk-card-title,
.icon {
  color: #fff;
}

@media screen and (max-width: 959px) {
  h3.uk-card-title {
    width: 100%;
    margin-bottom: 20px;
  }

  .temperature {
    width: 100%;
    margin-bottom: 10px;
  }

  .humidity {
    width: 100%;
    margin-left: 0 !important;
  }

  .temperature > span,
  .humidity > span {
    font-size: 1rem;
  }
}
</style>
