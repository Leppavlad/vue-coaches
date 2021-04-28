export default {
  namespaced: true,
  state() {
    return {
      requests: [],
    };
  },
  mutations: {
    addRequest(state, payload) {
      state.requests.push(payload);
    },
    setRequests(state, payload) {
      state.requests = payload;
    },
  },
  actions: {
    async sendRequest(context, payload) {
      const request = payload;
      const response = await fetch(
        `https://htc-vue-default-rtdb.firebaseio.com/requests/${payload.to}.json`,
        {
          method: "POST",
          body: JSON.stringify(request),
        }
      );
      const responseData = await response.json();
      if (!response.ok) {
        const error = new Error(
          responseData.error.message || "Failed to send request"
        );
        throw error;
      }
      context.commit("addRequest", request);
    },
    async loadRequests(context) {
      const userId = context.rootGetters.userId;
      const token = context.rootGetters.token;
      const response = await fetch(
        `https://htc-vue-default-rtdb.firebaseio.com/requests/${userId}.json?auth=${token}`
      );
      const responseData = await response.json();
      if (!response.ok) {
        const error = new Error(
          responseData.error.message || "Failed to load requests"
        );
        throw error;
      }

      const requests = [];
      for (let key in responseData) {
        const request = responseData[key];
        request.id = key;
        requests.push(request);
      }

      context.commit("setRequests", requests);
    },
  },
  getters: {
    requests(state) {
      return state.requests;
    },
    hasRequests(_, getters) {
      return getters.requests && getters.requests.length > 0;
    },
  },
};
