import { CarState } from "src/app/core/models/enum/carState";

export class UpdateCarModel{
    id : number;
    modelId : number;
    colorId : number; 
    cityId : number;
    plate : string;
    modelYear : number;
    findexScore : number;
    kilometer : number;
    carState : CarState;
}