import { Myjson } from "@/interface/interface";

export interface ServiceInterface {
  data: string;
  getUrl: string;
  postUrl: string;

  getData():  Promise<Myjson>;
  postData(post: Myjson): Promise<string>;
}
