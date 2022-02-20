import { Subscription } from 'rxjs';
import { CityService } from './../../services/city.service';
import { CarService } from './../../services/car.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { PrimeNGConfig, SelectItem } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { SelectedRentalOps } from '../../models/rentalModels/selectedRentalOps';
import { RentalService } from '../../services/rental.service';
//for Jquery
declare var $: any;

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.scss', './rental.component.css'],
})
export class RentalComponent implements OnInit {
  
  items: MenuItem[];
  subscription : Subscription;
  selectedRentalOps : SelectedRentalOps;  
  
  dayForRental: number = 0;
  wrongDateSelection: boolean = false;

  constructor(
    private primengConfig: PrimeNGConfig,
    private activatedRoute: ActivatedRoute,
    private rentalService : RentalService
  ) {}

  ngOnInit(): void {

    this.items = [
      { label: 'Tarih Seçim' },
      { label: 'Araç Seçim' },
      { label: 'Ek Hizmet'},
      { label: 'Kayıt'},
      { label: 'Ödeme'},
      { label: 'Fatura'}
    ];

    this.primengConfig.ripple = true;

    this.rentalService.selectedRentalOps.subscribe(
      (response) => {
        this.selectedRentalOps = response;
      }
    )

  }

  denemasyon(){
    this.rentalService.setSelectedCar("Husoka");
  }

 
}
