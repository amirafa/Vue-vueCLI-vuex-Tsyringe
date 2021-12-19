import axios from "axios";
import store from '@/store/index'

export class Service {
  data: string;

  constructor() {
    this.data = "";
  }

  showData(){
    return store.getters.getLoadingStatus
  }

  fetchData(): Promise<string> {
    store.dispatch("setLoadingStatus",true)
    return new Promise<string>((resolve, reject) => {
      axios
        //.get(`http://localhost:3000/data`)
        .get(`https://run.mocky.io/v3/c18c464e-6771-4de2-8d09-603c09624130`)
        .then(function (response) {
          console.log("Get : ", response.data);
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

  postData(post: any): Promise<string> {
    //store.dispatch("setLoadingStatus",true)
    return new Promise<string>((resolve, reject) => {
      const headers = {
        "Access-Control-Allow-Origin": "*",
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      };
      axios
        .post(
          "https://run.mocky.io/v3/c18c464e-6771-4de2-8d09-603c09624130",
          //"http://localhost:3000/data",
          post,
          { headers }
        )
        .then(function (response) {
          console.log("Server Response ", response);
          //store.dispatch("setLoadingStatus",false)
          resolve(response.data);
        })
        .catch(function (error) {
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
