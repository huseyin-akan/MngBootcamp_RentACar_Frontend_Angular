import { ServiceType } from "./serviceType";

export interface ASListModel{
    id : number;
    serviceName : string;
    description : string;
    imageUrl : string;
    price : number;
    servicePoint : number;
    serviceType : ServiceType;
}