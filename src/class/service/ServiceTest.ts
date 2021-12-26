//import axios from "axios";
import store from '@/store/index'
import { Myjson } from "@/interface/interface";
import { ServiceInterface } from "./ServiceInterface";

export class Service implements ServiceInterface{
  data: string;
  getUrl:string;
  postUrl:string;

  constructor() {
    this.data = "";
    this.getUrl=process.env.VUE_APP_API_TEST
    this.postUrl=process.env.VUE_APP_API_TEST
  }

  getData(): Promise<Myjson> {
    store.dispatch("setLoadingStatus",true)
    return new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
  }

  postData(post: Myjson):Promise<string>  {
    //store.dispatch("setLoadingStatus",true)
    return new Promise((resolve) => {
      setTimeout(resolve, 1000);
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
