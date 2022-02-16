import { AlertifyService } from './../../../../core/services/alertify.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { RegisterICModel } from '../../models/registerICModel';
import { RegisterCCModel } from '../../models/registerCCModel';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

 selectedValue : string = "val1"; 

 registerICModel: RegisterICModel = new RegisterICModel();
 registerCCModel: RegisterCCModel = new RegisterCCModel();

 firstName : string;
 lastName : string;
 companyName : string;
 userName: string;
 email: string;
 password: string;
 taxNumber : string;
 nationalId : string;

  constructor(
    private alertifyService: AlertifyService,
    private authService : AuthService
  ) { }

  ngOnInit(): void {

  }

  updateForm(){
    if(this.selectedValue == "val1"){
      this.alertifyService.success("Bireysel Müşteri seçildi.")
      this.resetForms()
    }else{
      this.alertifyService.success("Kurumsal Müşteri seçildi.")
      this.resetForms()
    }
  }

  registerIndiviualCustomer(): void {   

    this.registerICModel.email = this.email;
    this.registerICModel.userName = this.userName;
    this.registerICModel.firstName = this.firstName;
    this.registerICModel.lastName = this.lastName;
    this.registerICModel.password = this.password;
    this.registerICModel.nationalId = this.nationalId;

    this.authService.registerIndiviualCustomer(this.registerICModel).subscribe({
      next : (data) => {
        console.log(data);
        this.alertifyService.success("kayıt başarılı");
      },
      error: (err) => this.alertifyService.error("kayıt başarılı olmadı " + err.error),
      complete : () => { this.resetForms() }
    })
  }

  registerCorporateCustomer(): void {  

    this.registerCCModel.email = this.email;
    this.registerCCModel.userName = this.userName;
    this.registerCCModel.companyName = this.companyName;
    this.registerCCModel.password = this.password;
    this.registerCCModel.taxNumber = this.taxNumber;

    this.authService.registerCorporateCustomer(this.registerCCModel).subscribe({
      next : (data) => {
        console.log(data);
        this.alertifyService.success("kayıt başarılı");
      },
      error: (err) => this.alertifyService.error("kayıt başarılı olmadı " + err.error),
      complete : () => { this.resetForms() }
    })
  }

  resetForms(){
    this.firstName = "";
    this.lastName = "";
    this.companyName = "";
    this.userName = "";
    this.email = "";
    this.password = "";
    this.taxNumber = "";
    this.nationalId = "";
  }
}
