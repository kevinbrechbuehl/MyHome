<template>
  <div
    class="uk-flex uk-flex-middle text-xsmall uk-text-light margin-xsmall-top"
  >
    <span :class="'text-right icon ' + index"></span>
    <span class="margin-xsmall-left">{{ title }}</span>
  </div>
</template>

<script>
export default {
  name: "HealthIndex",
  props: {
    index: {
      type: String,
      required: true
    }
  },
  computed: {
    title() {
      return this.index === "excellent"
        ? "Excellent"
        : this.index === "good"
        ? "Good"
        : this.index === "satisfying"
        ? "Satisfying"
        : this.index === "poor"
        ? "Poor"
        : this.index === "critical"
        ? "Critical"
        : null;
    }
  }
};
</script>

<style scoped>
.uk-text-right .text-right {
  margin-left: auto;
}

.text-xsmall {
  font-size: 0.69rem;
}

.margin-xsmall-top {
  margin-top: 5px;
}

.icon {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.08);
}

.excellent {
  background-color: #82a3d9;
}

.good {
  background-color: #31c79c;
}

.satisfying {
  background-color: #fce800;
}

.poor {
  background-color: #ffc46b;
}

.critical {
  background-color: #ff6565;
}
</style>
