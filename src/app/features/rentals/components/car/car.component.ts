import { RentalService } from 'src/app/features/rentals/services/rental.service';
import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig, SelectItem } from 'primeng/api';
import { CarService } from 'src/app/features/rentals/services/car.service';
import { CarListModel } from '../../models/carModels/carListModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss', './car.component.css'],
})
export class CarComponent implements OnInit {
  cars: CarListModel[] = [];
  dataLoaded: boolean = false;

  sortOptions: SelectItem[];

  sortOrder: number;

  sortField: string;

  constructor(
    private carService: CarService,
    private primengConfig: PrimeNGConfig,
    private rentalService : RentalService,
    private router : Router
  ) {}

  ngOnInit(): void {
    this.getCars();

    this.sortOptions = [
      { label: 'Price High to Low', value: '!dailyPrice' },
      { label: 'Price Low to High', value: 'dailyPrice' },
    ];

    this.primengConfig.ripple = true;
  }

  getCars() {
    this.carService.getAllRentableCars().subscribe((response) => {
      console.log(response);
      this.dataLoaded = false;
      this.cars = response.items;
      this.dataLoaded = true;
      console.log(this.cars);
    });
  }

  onSortChange(event: any) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }

  selectCar(car : CarListModel){
    this.rentalService.setSelectedCar(car);
    this.router.navigate(['rental/select-date']);
  }
}
