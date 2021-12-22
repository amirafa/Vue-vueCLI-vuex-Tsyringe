import { Service } from "@/class/service/Service"
import { Myjson } from "@/interface/interface";

export class DiContainer {

    service: any;

    constructor(service:any){
        this.service = service
    }

    async injectGet():Promise<Myjson>{
        return await this.service.fetchData();
    }

    async injectPost(data:Myjson):Promise<any>{
        return this.service
        .postData(data)
    }
}