import { AlertifyService } from './../../../../core/services/alertify.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { RegisterICModel } from '../../models/registerICModel';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

 selectedValue : string = "val1"; 

 registerModel: RegisterICModel = new RegisterICModel();
 //TODO: Corporate Customer için de yazmak lazım.

 firstName : string;
 lastName : string;
 companyName : string;
 userName: string;
 email: string;
 password: string;



  constructor(
    private alertifyService: AlertifyService,
    private authService : AuthService
  ) { }

  ngOnInit(): void {

  }

  updateForm(){
    if(this.selectedValue == "val1"){
      this.alertifyService.success("Bireysel Müşteri seçildi.")
    }else{
      this.alertifyService.success("Kurumsal Müşteri seçildi.")
    }
  }

  registerIndiviualCustomer(): void {
        
    this.registerModel.email = this.email;
    this.registerModel.userName = this.userName;
    this.registerModel.firstName = this.firstName;
    this.registerModel.lastName = this.lastName;
    this.registerModel.password = this.password;

    this.authService.registerIndiviualCustomer(this.registerModel).subscribe(
      data => {
        console.log(data);
        this.alertifyService.success("kayıt başarılı");
      },
      err => {
        this.alertifyService.error("kayıt başarılı olmadı " + err.error);
      }
    );
  }

}
