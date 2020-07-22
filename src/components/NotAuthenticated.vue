<template>
  <div>
    <h1 class="text-white">My Home Dashboard</h1>
    <p class="text-white">
      Please login with your Netatmo account to view your Weather Station and
      Healthy Home Coach data.
    </p>
    <router-link to="/login" class="uk-button uk-button-primary"
      >Login</router-link
    >
    <p class="uk-text-small uk-text-light uk-margin-large-top">
      powered by
      <a
        href="https://github.com/aquasonic/myhome"
        target="_blank"
        rel="noopener noreferrer"
        >aquasonic</a
      >
      <br />data by
      <a
        href="https://dev.netatmo.com"
        target="_blank"
        rel="noopener noreferrer"
        >Netatmo</a
      >
    </p>
  </div>
</template>

<script>
export default {
  name: "NotAuthenticated"
};
</script>
