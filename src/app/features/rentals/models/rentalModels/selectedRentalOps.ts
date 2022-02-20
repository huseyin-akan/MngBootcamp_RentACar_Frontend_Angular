import { CreateCreditCardInfosModel } from './createCreditCardInfosModel';
import { ASListModel } from './../additionalServices/aSListModel';
import { CarListModel } from '../carModels/carListModel';

export class SelectedRentalOps{
    rentDate : Date;
    returnDate : Date;
    rentCity : string;
    returnCity : string;
    selectedCar : CarListModel;
    selectedASs: ASListModel[];
    totalSum : number;
    creditCardInfos : CreateCreditCardInfosModel;

    constructor(){
        this.selectedASs = [];
        this.selectedCar = new CarListModel();
        this.creditCardInfos = new CreateCreditCardInfosModel();
    }
}