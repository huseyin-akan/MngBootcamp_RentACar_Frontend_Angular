import { ASListModel } from './../additionalServices/aSListModel';

export interface CreatedInvoiceDto{
    id : number;
    invoiceNo : number;
    customerMail : string;
    invoiceDate : Date;
    totalSum : number;
    rentedDate : Date;
    returnDate : Date;
    totalDayCount : number;
    rentedKilometer : number;
    brand : string;
    carModel : string;
    carDailyPrice : number;
    modelYear : number;
    plate : string;
    additionalServices : ASListModel[];
}