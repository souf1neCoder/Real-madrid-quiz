import { createStore } from "vuex";


export default createStore({
  state: {
    questions: [],
    score: 0,
  },
  mutations: {
    SETQUESTIONS(state, payload) {
      state.questions.push(payload);
    },
    CLEARSTORE(state) {
      state.questions = [];
      state.score = 0;
    },
    INCREMENTSCORE(state){
      state.score++
    }
  },
  actions: {
    ClearStore({ commit }) {
      commit("CLEARSTORE");
    },
     setQuestions({ commit },q) {
      commit("SETQUESTIONS",q);
    },
    incrementScore({ commit }) {
      commit("INCREMENTSCORE");
    }

  },
  getters: {
    getQuestions(state) {
      return state.questions;
    },
    getScore(state) {
      return state.score;
    }
  },
  modules: {},
});
