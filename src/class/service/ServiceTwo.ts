//import axios from "axios";
import store from '@/store/index'
import { Myjson } from "@/interface/interface";

export class Service {
  data: string;

  constructor() {
    this.data = "";
  }

  fetchData(): Promise<Myjson> {
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
