<template>
  <div>
    <div v-if="loading">Loading, please wait...</div>
    <div v-else>
      <button @click="fetchData">Refresh Data</button>
    </div>
    <div v-if="error">
      <p>There was an error, please try again...</p>
      <p>{{ error }}</p>
    </div>
    <table v-if="data">
      <tr>
        <th></th>
        <th>Temperature</th>
        <th>Humidity</th>
        <th>CO2</th>
      </tr>
      <tr v-for="item in data" :key="item.id">
        <th>{{ item.name }}</th>
        <td>
          <span v-if="item.temperature">{{ item.temperature }} &#8451;</span>
        </td>
        <td>
          <span v-if="item.humidity">{{ item.humidity }} %</span>
        </td>
        <td>
          <span v-if="item.co2">{{ item.co2 }} ppm</span>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "StationsData",
  computed: {
    loading() {
      return this.$store.getters.isLoading;
    },
    error() {
      return this.$store.getters.error;
    },
    data() {
      return this.$store.getters.data;
    }
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.$store.dispatch("fetchData");
    }
  }
};
</script>

<style scoped>
table {
  margin: 0 auto;
  margin-top: 20px;
}

table th,
table td {
  padding: 5px 15px;
}
</style>
