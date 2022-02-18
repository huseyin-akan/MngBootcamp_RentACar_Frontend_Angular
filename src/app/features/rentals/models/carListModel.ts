import { CarState } from "src/app/core/models/enum/carState";

export class CarListModel{
    id : number
    model: string
    modelId: number
    color : string
    colorId : number
    city : string
    cityId : number
    plate : string
    modelYear : number
    findexScore : number
    kilometer : number
    dailyPrice : number
    imageUrl : string
    brand : string    
    carState : CarState
}