import { AdditionalService } from './../additionalServices/additionalService';

export class SelectedRentalOps{
    rentDate : Date;
    returnDate : Date;
    rentCity : string;
    returnCity : string;
    selectedCar : string;
    selectedASs: AdditionalService[];
    totalSum : number;

    constructor(){
        this.selectedASs = [];
    }
}