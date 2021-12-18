//import { getData } from "./getData.js";
import axios from "axios";

export class Service {
  data: string;

  constructor() {
    this.data = "";
  }

  fetchData(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      axios
        //.get(`http://localhost:3000/data`)
        .get(`https://run.mocky.io/v3/c18c464e-6771-4de2-8d09-603c09624130`)
        .then(function (response) {
          console.log("Get : ", response.data);
          resolve(response.data);
        })
        .catch(function (error) {
          console.log(error);
          reject(error);
        });
    });
  }

  postData(post: any): Promise<string> {
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
          console.log("Post Response ", response);
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
