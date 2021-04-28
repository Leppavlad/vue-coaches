let timer = null;

export default {
  state() {
    return {
      token: null,
      userId: null,
      didLogout: false,
      fetchUrl: {
        login:
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=",
        signup:
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=",
        apiKey: "AIzaSyCtVSeQ_J-QO69K-SQfM-FZT4OnmLv9Ymk",
      },
    };
  },
  mutations: {
    setUser(state, payload) {
      state.token = payload.token;
      state.userId = payload.userId;
      state.didLogout = payload.didLogout || false;
    },
  },
  actions: {
    async auth(context, payload) {
      const fetchUrl = context.getters.fetchUrl;
      const response = await fetch(fetchUrl[payload.mode] + fetchUrl.apiKey, {
        method: "POST",
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecureToken: true,
        }),
      });
      const responseData = await response.json();
      if (!response.ok) {
        const error = new Error(
          responseData.error.message || "Failed to authenticate"
        );
        throw error;
      }

      const expiresIn = +responseData.expiresIn * 1000;
      const expirationDate = new Date().getTime() + expiresIn;

      timer = setTimeout(() => {
        context.dispatch("doLogout");
      }, expiresIn);

      localStorage.setItem("token", responseData.idToken);
      localStorage.setItem("userId", responseData.localId);
      localStorage.setItem("tokenExpiration", expirationDate);

      context.commit("setUser", {
        token: responseData.idToken,
        userId: responseData.localId,
      });
    },
    autoLogin(context) {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      const tokenExpiration = localStorage.getItem("tokenExpiration");

      const expiresIn = +tokenExpiration - new Date().getTime();

      if (expiresIn < 0) return;

      if (token && userId) {
        context.commit("setUser", {
          token: token,
          userId: userId,
        });

        timer = setTimeout(() => {
          context.dispatch("doLogout");
        }, expiresIn);
      }
    },
    doLogout(context) {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("tokenExpiration");

      clearTimeout(timer);

      context.commit("setUser", {
        token: null,
        userId: null,
        didLogout: true,
      });
    },
  },
  getters: {
    userId(state) {
      return state.userId;
    },
    fetchUrl(state) {
      return state.fetchUrl;
    },
    token(state) {
      return state.token;
    },
    isAuthenticated(state) {
      return !!state.token;
    },
    didLogout(state) {
      return state.didLogout;
    },
  },
};
