<template>
  <div>
    <p>Loading, please wait...</p>
  </div>
</template>

<script>
import AuthService from "@/services/auth.service.js";
import Constants from "@/constants.js";

export default {
  name: "Login",
  created() {
    AuthService.logout();

    window.location =
      `/api/authorize` +
      `?redirect_uri=${encodeURIComponent(Constants.AUTH_CALLBACK_URI)}` +
      `&scope=${Constants.AUTH_SCOPE}` +
      `&state=${AuthService.generateState()}`;
  }
};
</script>
