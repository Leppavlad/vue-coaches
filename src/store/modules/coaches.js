export default {
  namespaced: true,
  state() {
    return {
      lastFetch: null,
      coaches: [],
      coachesFiltered: [],
      currentCoach: {},
    };
  },
  mutations: {
    filterCoaches(state, payload) {
      if (payload == "all") {
        state.coachesFiltered = state.coaches;
      } else {
        const filters = [];
        for (let filter of payload) {
          if (filter.checked) {
            filters.push(filter.id);
          }
        }
        state.coachesFiltered = [];
        state.coaches.forEach((coach) => {
          for (let coachArea of coach.areas) {
            if (filters.includes(coachArea)) {
              state.coachesFiltered.push(coach);
              return;
            }
          }
        });
      }
    },
    createCoach(state, payload) {
      state.coaches.push(payload);
    },
    setCoaches(state, payload) {
      state.coaches = payload;
    },
    setFetchTimestamp(state) {
      state.lastFetch = new Date().getTime();
    },
    setCurrentCoach(state, payload) {
      state.currentCoach = payload;
    },
  },
  actions: {
    filterCoaches(context, payload) {
      context.commit("filterCoaches", payload);
    },
    async createCoach(context, payload) {
      const userId = context.rootGetters.userId;
      const token = context.rootGetters.token;
      const response = await fetch(
        `https://htc-vue-default-rtdb.firebaseio.com/coaches/${userId}.json?auth=${token}`,
        {
          method: "PUT",
          body: JSON.stringify(payload),
        }
      );
      const responseData = await response.json();
      if (!response.ok) {
        const error = new Error(
          responseData.error.message || "Failed creating coach"
        );
        throw error;
      }
      context.commit("createCoach", { ...payload, id: userId });
    },
    async loadCoaches(context, payload) {
      if (!payload.forceRefresh && !context.getters.shouldUpdate) {
        return;
      }
      const response = await fetch(
        "https://htc-vue-default-rtdb.firebaseio.com/coaches.json"
      );
      const responseData = await response.json();

      if (!response.ok) {
        const error = new Error(
          responseData.error.message || "Failed to fetch!"
        );
        throw error;
      }

      const coaches = [];
      for (let key in responseData) {
        const coach = {
          firstName: responseData[key].firstName,
          lastName: responseData[key].lastName,
          description: responseData[key].description,
          hourlyRate: responseData[key].hourlyRate,
          areas: responseData[key].areas,
          id: key,
        };
        coaches.push(coach);
      }

      context.commit("setCoaches", coaches);
      context.commit("setFetchTimestamp");
    },
    async loadCoach(context, payload) {
      const coachId = payload;
      const response = await fetch(
        `https://htc-vue-default-rtdb.firebaseio.com/coaches/${coachId}.json`
      );
      const responseData = await response.json();

      if (!response.ok) {
        const error = new Error(
          responseData.error.message || "Failed to fetch!"
        );
        throw error;
      }

      context.commit("setCurrentCoach", responseData);
    },
  },
  getters: {
    coaches(state) {
      return state.coaches;
    },
    coachesFiltered(state) {
      return state.coachesFiltered;
    },
    hasCoaches(state) {
      return state.coaches && state.coaches.length > 0;
    },
    hasCoachesFiltered(state) {
      return state.coachesFiltered && state.coachesFiltered.length > 0;
    },
    shouldUpdate(state) {
      const lastFetch = state.lastFetch;
      if (!lastFetch) return true;
      const currentTime = new Date().getTime();
      return (currentTime - lastFetch) / 1000 > 60;
    },
    currentCoach(state) {
      return state.currentCoach;
    },
  },
};
