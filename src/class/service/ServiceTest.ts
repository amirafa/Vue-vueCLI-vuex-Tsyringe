import axios from "axios";
import store from "@/store/index";
import { Myjson } from "@/interface/interface";
import { ServiceInterface } from "./ServiceInterface";

export class Service implements ServiceInterface {
  data: string;
  getUrl: string;
  postUrl: string;

  constructor() {
    this.data = "";
    this.getUrl = process.env.VUE_APP_API_TEST;
    this.postUrl = process.env.VUE_APP_API_TEST;
  }

  getData(): Promise<Myjson> {
    store.dispatch("setLoadingStatus",true)
    return new Promise((resolve:any, reject:any) => {
      axios
        //.get(`http://localhost:3000/data`)
        .get("test.json")
        .then(function (response) {
          console.log(response);
          //console.log("Get : ", response.data);
          store.dispatch('setData',response.data)
          store.dispatch("setLoadingStatus",false)
          resolve(response.data);
        })
        .catch(function (error) {
          console.log(error);
          reject(error);
        });
    });
  }

  postData(post: Myjson): Promise<string> {
    //store.dispatch("setLoadingStatus",true)
    return new Promise((resolve:any, reject:any) => {
      const headers = {
        "Access-Control-Allow-Origin": "*",
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      };
      axios
        .post(
          "test.json",
          //"http://localhost:3000/data",
          post,
          { headers }
        )
        .then((response) => {
          console.log("Server Response ", response);

          //store.dispatch("setLoadingStatus",false)
          store.dispatch("setData",post)
          
          resolve(response);
        })
        .catch(function (error) {
          store.dispatch("setLoadingStatus",false)
          console.log("postData ",error)
          reject(error);
        });
    });
  }

  set myData(params: string) {
    this.data = params;
    //console.log("data Setter");
  }

  get myData(): string {
    //console.log("data Getter");
    return this.data;
  }
}
