import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { CarListModel } from 'src/app/features/rentals/models/carModels/carListModel';
import { CarService } from 'src/app/features/rentals/services/car.service';
import { RentalService } from 'src/app/features/rentals/services/rental.service';
declare var $:any;

@Component({
  selector: 'app-car-select-tab',
  templateUrl: './car-select-tab.component.html',
  styleUrls: ['./car-select-tab.component.css']
})
export class CarSelectTabComponent implements OnInit {

  constructor(
    private carService : CarService,
    private rentalService : RentalService,
    private router : Router
  ) { }

  cars :CarListModel[] = [];
  sortOptions: SelectItem[];
  sortOrder: number;
  sortField: string;
  selectedCar : CarListModel;

  ngOnInit(): void {
    this.getCars();

    this.sortOptions = [
      {label: 'Price High to Low', value: '!dailyPrice'},
      {label: 'Price Low to High', value: 'dailyPrice'}
  ];

  this.selectedCar = this.rentalService.getSelectedCar();
  }

  getCars(){
    this.carService.getAllRentableCars().subscribe(
      response => {
        this.cars = response.items;
      }
    )
  }

  selectCar(car : CarListModel){
    this.selectedCar = car;
    this.rentalService.setSelectedCar(car);
  }

  onSortChange(event:any) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
        this.sortOrder = -1;
        this.sortField = value.substring(1, value.length);
    }
    else {
        this.sortOrder = 1;
        this.sortField = value;
    }
  }

  nextPage(){
    if (this.selectedCar) {
      this.router.navigate(['rental/select-extra']);
    }
  }

  prevPage(){
    this.router.navigate(['rental/select-date']);
  }

}
