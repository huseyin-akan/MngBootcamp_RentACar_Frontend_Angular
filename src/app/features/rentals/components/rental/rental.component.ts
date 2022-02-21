import { InvoiceService } from './../../services/invoice.service';
import { AlertifyService } from 'src/app/core/services/alertify.service';
import { Subscription } from 'rxjs';
import { CityService } from './../../services/city.service';
import { CarService } from './../../services/car.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { PrimeNGConfig, SelectItem } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { SelectedRentalOps } from '../../models/rentalModels/selectedRentalOps';
import { RentalService } from '../../services/rental.service';
import { AuthService } from 'src/app/core/services/auth.service';
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
  userLoggedIn : boolean = false;

  constructor(
    private primengConfig: PrimeNGConfig,
    private rentalService : RentalService,
    private authService : AuthService,
    private alertifyService : AlertifyService,
    private invoiceService : InvoiceService,
    private router : Router
  ) {}

  ngOnInit(): void {

    this.items = [
      { label: 'Tarih Seçim', routerLink : "/rental/select-date" },
      { label: 'Araç Seçim', routerLink : "/rental/select-car" },
      { label: 'Ek Hizmet', routerLink : "/rental/select-extra"},
      { label: 'Ödeme', routerLink : "/rental/payment"},
      { label: 'Fatura', routerLink : "/rental/invoice"}
    ];

    this.primengConfig.ripple = true;

    this.rentalService.selectedRentalOps.subscribe(
      (response) => {
        this.selectedRentalOps = response;
      }
    )

    this.authService.isLogged.subscribe({
      next : (response) => {
        this.userLoggedIn = response;
      }
    })
  }

  rentCar(){
    this.rentalService.rentCar().subscribe(
      {
        next : (response) => {
          this.alertifyService.success("Kiralama İşlemi Başarılı oldu");
          this.invoiceService.setInvoice(response);
          this.router.navigate(['rental/invoice']);
        },
        error : (err) => {
          this.alertifyService.error("Kiralama İşlemi başarısız oldu. Çünkü " + err.error.Detail);
          console.log(err);
        }
      }
    );
  }

 
}
