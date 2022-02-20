import { AlertifyService } from 'src/app/core/services/alertify.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CreateCreditCardInfosModel } from 'src/app/features/rentals/models/rentalModels/createCreditCardInfosModel';
import { RentalService } from 'src/app/features/rentals/services/rental.service';
declare var $:any;
@Component({
  selector: 'app-payment-tab',
  templateUrl: './payment-tab.component.html',
  styleUrls: ['./payment-tab.component.css']
})
export class PaymentTabComponent implements OnInit {

  constructor(
    private rentalService : RentalService,
    private router : Router,
    private alertifyService : AlertifyService
  ) { }

  createPaymentModel : CreateCreditCardInfosModel = new CreateCreditCardInfosModel();
  saveCardChecked : boolean = false;

  ngOnInit(): void {
    this.createPaymentModel.creditCardNo = "";
    this.createPaymentModel.validDate = "";
  }

  saveCard(){
    this.rentalService.setCardInfo(this.createPaymentModel);
    this.alertifyService.success("Kart bilgileri kaydedildi.")
  }

  prevPage(){
    this.router.navigate(['rental/select-extra']);
  }

}
