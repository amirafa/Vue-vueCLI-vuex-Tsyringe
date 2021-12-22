import { Service } from "@/class/service/Service"
import { Myjson } from "@/interface/interface";

export class DiContainer {

    service: Service

    constructor(){
        this.service = new Service();
    }

    async injectGet():Promise<Myjson>{
        return await this.service.getData();
    }

    async injectPost(data:Myjson):Promise<any>{
        return this.service
        .postData(data)
    }
}