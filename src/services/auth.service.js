const STATE_KEY = "login_state";
const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";
const TOKEN_EXPIRES_KEY = "token_expires";

// TODO: Refactore service
const AuthService = {
  generateState() {
    const state = Math.random()
      .toString(36)
      .slice(2);

    localStorage.setItem(STATE_KEY, state);

    return state;
  },

  verifyState(state) {
    return localStorage.getItem(STATE_KEY) === state;
  },

  login(accessToken, refreshToken, expiresIn) {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);

    const now = new Date();
    const expires = new Date(now.getTime() + expiresIn * 1000);
    localStorage.setItem(TOKEN_EXPIRES_KEY, expires);
  },

  logout() {
    localStorage.clear();
  },

  isAuthenticated() {
    return !!this.getAccessToken();
  },

  getAccessToken() {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  },

  getRefreshToken() {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  }
};

export default AuthService;
