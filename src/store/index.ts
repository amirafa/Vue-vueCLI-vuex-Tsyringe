import Vue from "vue";
import Vuex from "vuex";
//import axios from "axios";
import { Myjson } from "@/interface/interface";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loadingStatus: false as boolean,
    data: {} as Myjson ,
    getUrl: "https://run.mocky.io/v3/c18c464e-6771-4de2-8d09-603c09624130" as string, //.get(`http://localhost:3000/data`)
    postUrl: "https://run.mocky.io/v3/c18c464e-6771-4de2-8d09-603c09624130" as string,
  },
  mutations: {
    SET_LOADING_STATUS(state, status:boolean) {
      state.loadingStatus = status;
    },
    SET_DATA(state, data:Myjson) {
      state.data = data;
    },
  },
  //-------------------------------
  actions: {
    setData(context,data:Myjson){
      context.commit("SET_DATA", data);
    },
    setLoadingStatus(context,bool:boolean){
      context.commit("SET_LOADING_STATUS", bool);
    },
  },
  //-------------------------------
  getters: {
    getData(state):Myjson {
      return state.data;
    },
    getLoadingStatus(state):boolean {
      return state.loadingStatus;
    },
    getTabs(state):Array<string>{
      return state.data.data.tabs;
    },
    getPlugins(state){
      return state.data.data.plugins
    },
    getTabData(state){
      return state.data.data.tabdata
    },
  },
  //-------------------------------
  modules: {},
});

// fetchData(context) {
//   console.log("context",context)
//   context.commit("SET_LOADING_STATUS", true);
//   axios
//     //.get(`http://localhost:3000/data`)
//     .get(this.state.getUrl)
//     .then( (response: any) => {
//       context.commit("SET_LOADING_STATUS", false);
//       context.commit("SET_DATA", response.data);
//     });
// },
//********************************************** */
// postData(context, post) {
//   context.commit("SET_LOADING_STATUS", true);
//   const headers = {
//     "Access-Control-Allow-Origin": "*",
//     Accept: "application/json, text/plain, */*",
//     "Content-Type": "application/json",
//   };
//   axios
//     .post(
//       this.state.postUrl, //"http://localhost:3000/data",
//       post,
//       { headers }
//     )
//     .then(function (response) {
//       console.log("Post Response ", response);
//     });
// },
//************************************************* */
// fetchData(context) {
//   return new Promise((resolve, reject) => {
//     //console.log("context", context);
//     context.commit("SET_LOADING_STATUS", true);
//     axios
//       //.get(`http://localhost:3000/data`)
//       .get(this.state.getUrl)
//       .then((response: any) => {
//         context.commit("SET_DATA", response.data);
//         context.commit("SET_LOADING_STATUS", false);
//         resolve(response.data);
//       })
//       .catch((err) => {
//         context.commit("SET_LOADING_STATUS", false);
//         reject(err);
//       });
//   });
// },
//***************************************** */
// postData(context, post) {
//   //console.log("postData ",post)
//   return new Promise((resolve, reject) => {
//     //context.commit("SET_LOADING_STATUS", true);
//     const headers = {
//       "Access-Control-Allow-Origin": "*",
//       Accept: "application/json, text/plain, */*",
//       "Content-Type": "application/json",
//     };
//     axios
//       .post(
//         this.state.postUrl, //"http://localhost:3000/data",
//         post,
//         { headers }
//       )
//       .then((response) => {
//         console.log("Server Response ", response);
//         //context.commit("SET_LOADING_STATUS", false);
//         context.commit("SET_DATA", post); //**beta**
//         resolve(response);
//       })
//       .catch((err) => {
//         //context.commit("SET_LOADING_STATUS", false);
//         console.log("store->postData err",err)
//         reject(err);
//       });
//   });
// },
