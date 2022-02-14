import { CarState } from "src/app/core/models/enum/carState";

export interface CarListModel{
    id : number
    modelYear : number
    dailyPrice : number
    brand : string
    model: string
    imageUrl : string
    color : string
    city : string
    carState : CarState
}