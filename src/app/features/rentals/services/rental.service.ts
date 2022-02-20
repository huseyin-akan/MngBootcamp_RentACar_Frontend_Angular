import { AdditionalService } from './../models/additionalServices/additionalService';
import { SelectedRentalOps } from './../models/rentalModels/selectedRentalOps';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  private selectedRentalOpsObj : SelectedRentalOps = new SelectedRentalOps();
  private selectedRentalOpsSubject : BehaviorSubject<SelectedRentalOps>;
  public selectedRentalOps : Observable<SelectedRentalOps>;

  constructor() {
    this.selectedRentalOpsSubject = new BehaviorSubject<SelectedRentalOps>(this.selectedRentalOpsObj);
    this.selectedRentalOps = this.selectedRentalOpsSubject.asObservable();
  }

  setSelectedCar(selectedCar : string){
    this.selectedRentalOpsObj.selectedCar = selectedCar;
    this.updateObservable();
  }

  setRentDate(rentDate : Date){
    this.selectedRentalOpsObj.rentDate = rentDate;
    this.updateObservable();
  }

  setReturnDate(returnDate : Date){
    this.selectedRentalOpsObj.returnDate = returnDate;
    this.updateObservable();
  }

  setRentCity(rentCity : string){
    this.selectedRentalOpsObj.rentCity = rentCity;
    this.updateObservable();
  }

  setReturnCity(returnCity : string){
    this.selectedRentalOpsObj.returnCity = returnCity;
    this.updateObservable();
  }

  addAdditionalService(selectedAS : AdditionalService){
    this.selectedRentalOpsObj.selectedASs.push(selectedAS);
    this.updateObservable();
  }

  removeAdditionalService(selectedAS : AdditionalService){

  }

  updateTotalSum(){
    
  }

  private updateObservable(){
    this.selectedRentalOpsSubject.next(this.selectedRentalOpsObj);
  }

}
