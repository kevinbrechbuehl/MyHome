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
        <span uk-icon="drop" ratio="0.8"></span>
        <span class="margin-xsmall-left">{{ data.humidity }} %</span>
        <span uk-icon="feather" ratio="0.4" class="flex-right"></span>
        <span class="margin-xsmall-left">{{ data.co2 }} ppm</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "IndoorModule",
  props: {
    data: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
.uk-card {
  background-color: #f7fafc;
}
</style>
