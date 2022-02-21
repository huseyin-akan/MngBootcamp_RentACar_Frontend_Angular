import { AuthService } from 'src/app/core/services/auth.service';
import { PromotionCodeService } from './../../../../services/promotion-code.service';
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
    private alertifyService : AlertifyService,
    private promotionCodeService : PromotionCodeService,
    private authService : AuthService
  ) { }

  createPaymentModel : CreateCreditCardInfosModel = new CreateCreditCardInfosModel();
  saveCardChecked : boolean = false;
  isLogged : boolean;
  discountRate : number;
  promotionCodeValid : boolean = false;
  promotionCodeError : string = "";
  promotionCodeEntered : boolean = false;

  ngOnInit(): void {
    this.createPaymentModel.creditCardNo = "";
    this.createPaymentModel.validDate = "";

    this.authService.isLogged.subscribe(
      response => {
        this.isLogged = response;
      }
    );
  }

  saveCard(){
    this.rentalService.setCardInfo(this.createPaymentModel);
    this.alertifyService.success("Kart bilgileri kaydedildi.")
  }

  checkForPromotionCode(){
    this.promotionCodeEntered = true;

    this.promotionCodeService.getPromotionCode(this.createPaymentModel.code).subscribe({
      next: (response) => {
        this.discountRate = response.discountRate;
        this.promotionCodeValid = true;        
      },
      error : (err) => {
        this.promotionCodeError = err.error.Detail;
        this.promotionCodeValid = false;
        this.discountRate = 0;
      },
      complete: () => {
        this.rentalService.setDiscountRate(this.discountRate);
        console.log(this.discountRate + " burada discount rate var.")
      }
    });
  }

  prevPage(){
    this.router.navigate(['rental/select-extra']);
  }

}
