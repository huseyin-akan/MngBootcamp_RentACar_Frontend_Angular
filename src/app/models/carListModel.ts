import { CarState } from './enum/carState';

export interface CarListModel{
    id : number
    modelYear : number
    description : string
    kilometer : number
    dailyPrice : number
    brand : string
    model: string
    imageUrl : string
    color : string
    city : string
    findexScore : number
    minAge : number
    carClass : string
    modelId : number
    colorId : number
    cityId : number
    plate : string
    carState : CarState
}