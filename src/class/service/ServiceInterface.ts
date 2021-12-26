import { Myjson } from "@/interface/interface";

export interface ServiceInterface {
  data: string;
  getUrl: string;
  postUrl: string;

  getData(): void;
  postData(post: Myjson): Promise<string>;
}
