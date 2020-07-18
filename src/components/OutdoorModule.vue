<template>
  <div>
    <div class="uk-card uk-card-primary uk-card-body uk-flex">
      <span class="uk-card-title">{{ data.temperature }} &#8451;</span>
      <span class="uk-card-title flex-right">{{ data.humidity }} %</span>
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
  }
};
</script>
