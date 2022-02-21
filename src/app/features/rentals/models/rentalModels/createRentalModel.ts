import { CreateCreditCardInfosModel } from "./createCreditCardInfosModel";

export class CreateRentalModel{
    rentDate : Date
    returnDate : Date
    rentCityId : number
    returnCityId : number
    carId : number
    customerId : number
    promotionCode : string
    additionalServiceIds : number[]
    creditCardInfos : CreateCreditCardInfosModel

    constructor() {
        this.additionalServiceIds = [];
    }
}