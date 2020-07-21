import axios from "axios";
import cuid from "cuid";
import Vue from "vue";
import Vuex from "vuex";

import Constants from "@/constants.js";

const LOGIN_STATE_KEY = "login_state";
const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";
const TOKEN_EXPIRATION_KEY = "token_expiration";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    auth: {},
    data: [],
    lastUpdate: null,
    loading: false,
    error: null
  },

  getters: {
    isAuthenticated: state => !!state.auth.accessToken,
    isLoading: state => state.loading,
    loginState: state => state.auth.loginState,
    data: state => state.data,
    lastUpdate: state => state.lastUpdate,
    error: state => state.error
  },

  mutations: {
    init: state => {
      state.auth = {
        ...state.auth,
        loginState: localStorage.getItem(LOGIN_STATE_KEY),
        accessToken: localStorage.getItem(ACCESS_TOKEN_KEY),
        refreshToken: localStorage.getItem(REFRESH_TOKEN_KEY),
        tokenExpiration: localStorage.getItem(TOKEN_EXPIRATION_KEY)
      };
    },

    setLoginState: (state, loginState) => {
      Vue.set(state.auth, "loginState", loginState);
      localStorage.setItem(LOGIN_STATE_KEY, loginState);
    },

    setToken: (state, payload) => {
      state.auth = {
        ...state.auth,
        accessToken: payload.accessToken,
        refreshToken: payload.refreshToken,
        tokenExpiration: payload.tokenExpiration
      };

      localStorage.setItem(ACCESS_TOKEN_KEY, payload.accessToken);
      localStorage.setItem(REFRESH_TOKEN_KEY, payload.refreshToken);
      localStorage.setItem(TOKEN_EXPIRATION_KEY, payload.tokenExpiration);
    },

    clearAuth: state => {
      Vue.set(state, "auth", {});

      localStorage.removeItem(LOGIN_STATE_KEY);
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
      localStorage.removeItem(TOKEN_EXPIRATION_KEY);
    },

    startLoading: state => {
      Vue.set(state, "loading", true);
      Vue.set(state, "error", null);
    },

    stopLoading: (state, error) => {
      Vue.set(state, "loading", false);
      Vue.set(state, "error", error);
    },

    setData: (state, data) => {
      Vue.set(state, "data", [...data]);
      Vue.set(state, "lastUpdate", new Date());
    }
  },

  actions: {
    generateLoginState: context => {
      context.commit("setLoginState", cuid());
    },

    setToken: (context, payload) => {
      const now = new Date();
      const tokenExpiration = new Date(
        now.getTime() + payload.expiresIn * 1000
      );

      context.commit("setToken", { ...payload, tokenExpiration });
    },

    clearAuth: context => {
      context.commit("clearAuth");
    },

    async getToken({ commit, dispatch, state }, payload) {
      commit("startLoading");

      try {
        if (state.auth.loginState !== payload.loginState) {
          commit("stopLoading", "Invalid login state");
          return;
        }

        const { data } = await axios.get(
          `/api/get-token` +
            `?code=${payload.code}` +
            `&scope=${Constants.AUTH_SCOPE}` +
            `&redirect_uri=${encodeURIComponent(Constants.AUTH_CALLBACK_URI)}`
        );

        dispatch("setToken", {
          accessToken: data.access_token,
          refreshToken: data.refresh_token,
          expiresIn: data.expires_in
        });

        commit("stopLoading");
      } catch (error) {
        commit("stopLoading", error.response.data);
      }
    },

    async fetchData({ commit, dispatch, state }, preventLoadingIndicator) {
      if (!preventLoadingIndicator) {
        commit("startLoading");
      }

      try {
        if (new Date() > new Date(state.auth.tokenExpiration)) {
          const { data } = await axios.get(
            `/api/refresh-token` + `?refresh_token=${state.auth.refreshToken}`
          );

          await dispatch("setToken", {
            accessToken: data.access_token,
            refreshToken: data.refresh_token,
            expiresIn: data.expires_in
          });
        }

        const { data } = await axios.get(
          `/api/get-stations-data` + `?token=${state.auth.accessToken}`
        );

        const sortedData = data.sort(
          (a, b) => b.type.localeCompare(a.type) || a.name.localeCompare(b.name)
        );

        commit("setData", sortedData);
        commit("stopLoading");
      } catch (error) {
        commit("stopLoading", error.response.data);
      }
    }
  }
});
