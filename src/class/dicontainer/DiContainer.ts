import { Service } from "@/class/service/Service";
import { Myjson } from "@/interface/interface";
import { inject, injectable } from "tsyringe";

@injectable()
export class DiContainer {
  //myService: Service

  constructor(@inject(Service) public myService: Service) {
    // this.myService = new Service();
  }

  async injectGet(): Promise<Myjson> {
    return await this.myService.getData();
  }

  async injectPost(data: Myjson): Promise<any> {
    return this.myService.postData(data);
  }
}
