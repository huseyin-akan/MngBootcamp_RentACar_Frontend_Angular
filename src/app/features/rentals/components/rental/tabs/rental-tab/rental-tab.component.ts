import { CityService } from 'src/app/features/rentals/services/city.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CityListModel } from 'src/app/features/rentals/models/cityListModel';
import { CreateRentalModel } from 'src/app/features/rentals/models/rentalModels/createRentalModel';
import { RentalService } from 'src/app/features/rentals/services/rental.service';
import { Router } from '@angular/router';
declare var $:any;

@Component({
  selector: 'app-rental-tab',
  templateUrl: './rental-tab.component.html',
  styleUrls: ['./rental-tab.component.css']
})
export class RentalTabComponent implements OnInit {

  rentalForm: FormGroup;
  rentalModel: CreateRentalModel; 

  cities : CityListModel[] = [];
  minDateValue : Date = new Date();
    
  dayForRental: number = 0;
  wrongDateSelection: boolean = false;
  
  constructor(
    private cityService : CityService,
    private rentalService : RentalService,
    private formBuilder : FormBuilder,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.getCities();
    this.createRentalForm();
  }

  onRentDateSelect(){
    this.rentalService.setRentDate(this.rentalForm.controls['rentDate'].value);
  }

  onReturnDateSelect(){
    this.rentalService.setReturnDate(this.rentalForm.controls['returnDate'].value);
  }

  onRentCitySelect(value:any){
    console.log(value)
    this.rentalService.setRentCity(this.cities[value -1].name);
  }

  onReturnCitySelect(value:any){
    this.rentalService.setReturnCity(this.cities[value -1].name);
  }

  //TODO: wrong date selection control!!
  //TODO: farklı şehir seçimi yapılırsa, AS eklenecek.

  createRentalForm(){
    this.rentalForm = this.formBuilder.group({
      rentedCityId: ['', [Validators.required]],
      returnedCityId: ['', [Validators.required]],
      rentDate: ['', [Validators.required]],
      returnDate: ['', [Validators.required]]
    });
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
