<template>
  <div>
    <div v-if="loading">Loading, please wait...</div>
    <div v-else>
      <button @click="fetchData">Refresh</button>
    </div>
    <div v-if="error">
      <p>There was an error validating your login, please try again...</p>
      <p>{{ error }}</p>
    </div>
    <table v-if="data">
      <tr>
        <th></th>
        <th>Temperature</th>
        <th>Humidity</th>
        <th>CO2</th>
        <th>Noise</th>
        <th>Pressure</th>
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
        <td>
          <span v-if="item.noise">{{ item.noise }} dB</span>
        </td>
        <td>
          <span v-if="item.pressure">{{ item.pressure }} hPa</span>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import AuthService from "@/services/auth.service.js";

import axios from "axios";

export default {
  name: "StationsData",
  data() {
    return {
      data: null,
      loading: false,
      error: null
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      this.loading = true;
      this.data = null;
      this.error = null;

      try {
        const { data } = await axios.get(
          `/api/get-stations-data` + `?token=${AuthService.getAccessToken()}`
        );

        this.data = data.sort(
          (a, b) => a.type - b.type || a.name.localeCompare(b.name)
        );
        this.loading = false;
      } catch (error) {
        this.loading = false;
        this.error = error.response.data;
      }
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
