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

  constructor(
    private primengConfig: PrimeNGConfig,
    private activatedRoute: ActivatedRoute,
    private rentalService : RentalService
  ) {}

  ngOnInit(): void {

    this.items = [
      { label: 'Tarih Seçim', routerLink : "/rental/select-date" },
      { label: 'Araç Seçim', routerLink : "/rental/select-car" },
      { label: 'Ek Hizmet', routerLink : "/rental/select-extra"},
      { label: 'Kayıt', routerLink : "/rental/select-asd"},
      { label: 'Ödeme', routerLink : "/rental/select-casdar"},
      { label: 'Fatura', routerLink : "/rental/select-casdar"}
    ];

    this.primengConfig.ripple = true;

    this.rentalService.selectedRentalOps.subscribe(
      (response) => {
        this.selectedRentalOps = response;
      }
    )
  }

  denemasyon(){
    //this.rentalService.setSelectedCar("Husoka");
  }

 
}