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

    constructor(){
        this.selectedASs = [];
        this.selectedCar = new CarListModel();
    }
}