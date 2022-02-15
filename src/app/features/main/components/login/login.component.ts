import { AlertifyService } from '../../../../core/services/alertify.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginModel } from '../../models/loginModel';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginModel : LoginModel;
  loginForm : FormGroup;
  
  constructor(private formBuilder: FormBuilder, 
    private alertifyService: AlertifyService ,
    private authService : AuthService, 
    private router: Router
    ) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.loginModel = Object.assign({}, this.loginForm.value);

      this.authService.login(this.loginModel).subscribe(response=>{
        
        this.alertifyService.success("Sisteme giriş başarılı oldu");
        console.log(response);
        localStorage.setItem("token", response.accessToken.token);
        
        //metodu tetikleyip admin girdiyse arayüzün değişmesini sağlıyoruz.
        this.authService.adminIsLoggedIn();

        //birisi log oldu diyoruz.
        this.authService.isLogged.next(true);

        //logged in kişisi ismini, usernameini veriyoruz.
        this.authService.nameSurname.next(this.authService.getNameSurname());
        this.authService.userName.next(this.authService.getUserName());

        this.router.navigate(['/home']);
      },
      responseError=>{
        this.alertifyService.error(responseError.error);
        console.log(responseError.error);
      });
    }else{
      this.alertifyService.error("Alanlar boş geçilemez!!!");
    }
  }
}
