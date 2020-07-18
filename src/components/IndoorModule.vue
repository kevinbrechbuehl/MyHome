<template>
  <div>
    <div class="uk-card uk-card-default uk-card-body">
      <div class="uk-flex">
        <h3 class="uk-card-title">{{ data.name }}</h3>
        <span class="uk-card-title flex-right"
          >{{ data.temperature }} &#8451;</span
        >
      </div>
      <div class="uk-flex">
        <span>{{ data.humidity }} %</span>
        <span class="flex-right">{{ data.co2 }} ppm</span>
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
