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
    private router : Router
  ) { }

  createPaymentModel : CreateCreditCardInfosModel = new CreateCreditCardInfosModel();
  saveCardChecked : boolean = false;

  ngOnInit(): void {
    this.createPaymentModel.creditCardNo = "";
    this.createPaymentModel.validDate = "";
  }

  prevPage(){
    this.router.navigate(['rental/select-extra']);
  }

}
