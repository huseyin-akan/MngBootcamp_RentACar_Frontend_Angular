import { CarListModel } from '../carModels/carListModel';
import { AdditionalService } from './../additionalServices/additionalService';

export class SelectedRentalOps{
    rentDate : Date;
    returnDate : Date;
    rentCity : string;
    returnCity : string;
    selectedCar : CarListModel;
    selectedASs: AdditionalService[];
    totalSum : number;

    constructor(){
        this.selectedASs = [];
        this.selectedCar = new CarListModel();
    }
}