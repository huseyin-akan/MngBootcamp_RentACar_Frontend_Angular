export interface ActiveRentalsListDto{
    id: number;
    rentDate : Date;
    returnDate : Date;
    rentCityId : number;
    rentCity : string;
    returnCityId : number;
    returnCity : string;
    rentedKilometer : number;
    carId : number;
    modelName: string;
    modelYear : number;
    customerId : number;
}