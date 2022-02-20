import { environment } from 'src/environments/environment';
import { AdditionalServiceService } from './additional-service.service';
import { ASListModel } from './../models/additionalServices/aSListModel';
import { CarListModel } from 'src/app/features/rentals/models/carModels/carListModel';
import { SelectedRentalOps } from './../models/rentalModels/selectedRentalOps';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ServiceType } from '../models/additionalServices/serviceType';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  private selectedRentalOpsObj : SelectedRentalOps = new SelectedRentalOps();
  private selectedRentalOpsSubject : BehaviorSubject<SelectedRentalOps>;
  public selectedRentalOps : Observable<SelectedRentalOps>;

  private dayDiff : number = 0;
  private dayForRental : number = 0;

  private additionalServices : ASListModel[];
  private cityToCityServiceKey : string = environment.cityTOCityService;

  constructor(
    private additionalServiceService : AdditionalServiceService
  ) {
    this.selectedRentalOpsSubject = new BehaviorSubject<SelectedRentalOps>(this.selectedRentalOpsObj);
    this.selectedRentalOps = this.selectedRentalOpsSubject.asObservable();
    
    this.additionalServiceService.getAdditionalServices().subscribe( (response) => {
      this.additionalServices = response.items;
    })
  }

  setSelectedCar(selectedCar : CarListModel){
    this.selectedRentalOpsObj.selectedCar = selectedCar;
    this.updateTotalSum();
    this.updateObservable();
  }

  getSelectedCar(){
    return this.selectedRentalOpsObj.selectedCar;
  }

  setRentDate(rentDate : Date){
    this.selectedRentalOpsObj.rentDate = rentDate;
    this.updateObservable();
  }

  setReturnDate(returnDate : Date){
    this.selectedRentalOpsObj.returnDate = returnDate;
    this.updateDayDiff();
    this.updateObservable();
  }

  setRentCity(rentCity : string){
    this.selectedRentalOpsObj.rentCity = rentCity;
    this.updateDayDiff();
    this.updateObservable();

    this.checkIfCitiesDiffer();
  }

  setReturnCity(returnCity : string){
    this.selectedRentalOpsObj.returnCity = returnCity;
    this.updateObservable();

    this.checkIfCitiesDiffer();
  }

  addAdditionalService(selectedAS : ASListModel){
    this.selectedRentalOpsObj.selectedASs.push(selectedAS);

    this.updateTotalSum();
    this.updateObservable();
  }

  removeAdditionalService(selectedAS : ASListModel){
    this.selectedRentalOpsObj.selectedASs = this.selectedRentalOpsObj.selectedASs.filter( x => x.id != selectedAS.id);
    this.updateTotalSum();
    this.updateObservable();
  }

  updateTotalSum(){    
    let totalSum = 0;
    
    if(this.selectedRentalOpsObj.selectedCar){
      totalSum += this.dayForRental * this.selectedRentalOpsObj.selectedCar.dailyPrice;
    }    
    
    //calculate all selected additionalServices
    for (const as of this.selectedRentalOpsObj.selectedASs) {
      if(as.serviceType == ServiceType.DailyService){
        totalSum += this.dayForRental * as.price;
      }else if(as.serviceType == ServiceType.OneTimeService){
        totalSum += as.price
      }
    }
    this.selectedRentalOpsObj.totalSum = totalSum;
  }

  checkIfASItemSelected(id : number){
    return this.selectedRentalOpsObj.selectedASs.filter(x=>x.id == id).length >0; 
  }

  private updateObservable(){
    this.selectedRentalOpsSubject.next(this.selectedRentalOpsObj);
  }

  private updateDayDiff(){
    this.dayDiff = (this.selectedRentalOpsObj.returnDate.getTime() - this.selectedRentalOpsObj.rentDate.getTime() )
    if(this.dayDiff == 0){
      this.dayForRental = 1;
    }else{
      this.dayForRental= Math.ceil( this.dayDiff / (1000 * 60 * 60 * 24)); 
    }
  }

  private checkIfCitiesDiffer(){
    if(this.selectedRentalOpsObj.rentCity !== this.selectedRentalOpsObj.returnCity && 
      (this.selectedRentalOpsObj.rentCity != "") &&
      (this.selectedRentalOpsObj.returnCity != "") )
    {
      if(!this.selectedRentalOpsObj.selectedASs.find(as => as.serviceName == this.cityToCityServiceKey))
      this.selectedRentalOpsObj.selectedASs.push(this.additionalServices.find(as => as.serviceName == this.cityToCityServiceKey))
    }else{
      this.selectedRentalOpsObj.selectedASs = this.selectedRentalOpsObj.selectedASs.filter( x => x.serviceName != this.cityToCityServiceKey)
    }
    this.updateObservable(); 
  }

}
