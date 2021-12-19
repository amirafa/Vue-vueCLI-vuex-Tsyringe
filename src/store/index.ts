import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loadingStatus: false,
    data: {},
    getUrl: "https://run.mocky.io/v3/c18c464e-6771-4de2-8d09-603c09624130",
    postUrl: "https://run.mocky.io/v3/c18c464e-6771-4de2-8d09-603c09624130",
  },
  mutations: {
    SET_LADING_STATUS(state, status) {
      state.loadingStatus = status;
    },
    SET_DATA(state, data) {
      state.data = data;
    },
  },
  actions: {
    fetchData(context) {
      context.commit("SET_LOADING_STATUS", true);
      axios
        //.get(`http://localhost:3000/data`)
        .get(this.state.getUrl)
        .then(function (response: any) {
          context.commit("SET_LOADING_STATUS", false);
          context.commit("SET_DATA", response.data);
        });
    },
    postData(context, post) {
      context.commit("SET_LOADING_STATUS", true);
      const headers = {
        "Access-Control-Allow-Origin": "*",
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      };
      axios
        .post(
          this.state.postUrl, //"http://localhost:3000/data",
          post,
          { headers }
        )
        .then(function (response) {
          console.log("Post Response ", response);
        });
    },
  },
  getters: {
    getData(state){
      return state.data;
    }
  },
  modules: {},
});
