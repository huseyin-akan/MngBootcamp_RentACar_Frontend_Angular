import { Component, OnInit } from '@angular/core';
import {PrimeNGConfig, SelectItem} from 'primeng/api';
import { CarService } from 'src/app/features/rentals/services/car.service';
import { CarListModel } from '../../models/carListModel';


@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss', './car.component.scss']
})
export class CarComponent implements OnInit {

  cars :CarListModel[] = [];
  dataLoaded : boolean = false;

  sortOptions: SelectItem[];

    sortOrder: number;

    sortField: string;

  constructor(private carService : CarService, private primengConfig: PrimeNGConfig) { }

  ngOnInit(): void {
    this.getCars();

    this.sortOptions = [
      {label: 'Price High to Low', value: '!dailyPrice'},
      {label: 'Price Low to High', value: 'dailyPrice'}
  ];

  this.primengConfig.ripple = true;
  }

  getCars(){
    this.carService.getAllRentableCars().subscribe(
      response => {
        console.log(response)
        this.dataLoaded = false;
        this.cars = response.items;
        this.dataLoaded = true;
        console.log(this.cars)
      }
    )
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

 

}
