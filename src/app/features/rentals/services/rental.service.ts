import { ASListModel } from './../models/additionalServices/aSListModel';
import { CarListModel } from 'src/app/features/rentals/models/carModels/carListModel';
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

  private dayDiff : number = 0;
  private dayForRental : number = 0;

  constructor() {
    this.selectedRentalOpsSubject = new BehaviorSubject<SelectedRentalOps>(this.selectedRentalOpsObj);
    this.selectedRentalOps = this.selectedRentalOpsSubject.asObservable();
  }

  setSelectedCar(selectedCar : CarListModel){
    this.selectedRentalOpsObj.selectedCar = selectedCar;
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
  }

  setReturnCity(returnCity : string){
    this.selectedRentalOpsObj.returnCity = returnCity;
    this.updateObservable();
  }

  addAdditionalService(selectedAS : ASListModel){
    this.selectedRentalOpsObj.selectedASs.push(selectedAS);
    this.updateObservable();
  }

  removeAdditionalService(selectedAS : ASListModel){
    this.selectedRentalOpsObj.selectedASs = this.selectedRentalOpsObj.selectedASs.filter( x => x.id != selectedAS.id);
  }

  updateTotalSum(){    
    
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

}
