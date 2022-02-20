import { CreateCreditCardInfosModel } from "./createCreditCardInfosModel";

export interface CreateRentalModel{
    rentDate : Date
    returnDate : Date
    rentCityId : number
    returnCityId : number
    carId : number
    customerId : number
    additionalServiceIds : number[]
    creditCardInfos : CreateCreditCardInfosModel
}