import { Subscription } from 'rxjs';
import { CityService } from 'src/app/features/rentals/services/city.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CityListModel } from 'src/app/features/rentals/models/cityListModel';
import { CreateRentalModel } from 'src/app/features/rentals/models/rentalModels/createRentalModel';
import { RentalService } from 'src/app/features/rentals/services/rental.service';
import { Router } from '@angular/router';
import { SelectedRentalOps } from 'src/app/features/rentals/models/rentalModels/selectedRentalOps';
declare var $:any;

@Component({
  selector: 'app-rental-tab',
  templateUrl: './rental-tab.component.html',
  styleUrls: ['./rental-tab.component.css']
})
export class RentalTabComponent implements OnInit, OnDestroy {

  rentalForm: FormGroup;
  rentalModel: CreateRentalModel; 

  cities : CityListModel[] = [];
  minDateValue : Date = new Date();
    
  dayForRental: number = 0;
  dateSelectionIsValid: boolean = true;
  mySubscription : Subscription;
  selectedValues : SelectedRentalOps;
  
  constructor(
    private cityService : CityService,
    private rentalService : RentalService,
    private formBuilder : FormBuilder,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.getCities();
    this.mySubscription = this.rentalService.selectedRentalOps.subscribe( (response) => {
      this.selectedValues = response;
    });
    this.createRentalForm();

  }

  ngOnDestroy(): void {
      this.mySubscription.unsubscribe();
  }

  onRentDateSelect(){
    this.rentalService.setRentDate(this.rentalForm.controls['rentDate'].value);
    this.checkIfDatesValid();
  }

  onReturnDateSelect(){
    this.rentalService.setReturnDate(this.rentalForm.controls['returnDate'].value);
    this.checkIfDatesValid();
  }

  onRentCitySelect(value:any){
    this.rentalService.setRentCity(this.cities[value -1]);    
  }

  onReturnCitySelect(value:any){
    this.rentalService.setReturnCity(this.cities[value -1]);
  }

  checkIfDatesValid(){
    this.dateSelectionIsValid = this.rentalService.checkIfDatesValid();
    console.log(this.dateSelectionIsValid);
  }

  createRentalForm(){
    this.rentalForm = this.formBuilder.group({
      rentCity: ['', [Validators.required]],
      returnCity: ['', [Validators.required]],
      rentDate: ['', [Validators.required]],
      returnDate: ['', [Validators.required]]
    }); 

    if(this.selectedValues.rentCity){
      this.rentalForm.setValue({
        rentCity : this.selectedValues.rentCity.id ,
        returnCity : this.selectedValues.returnCity.id,
        rentDate : this.selectedValues.rentDate,
        returnDate :  this.selectedValues.returnDate,
      });
    }
  }

  getCities(){
    this.cityService.getCities().subscribe(
      response => {
        this.cities = response.items;          
      }
    );
  }

  nextPage(){
    if (this.rentalForm.valid) {
      this.router.navigate(['rental/select-car']);
    }
  }

}
