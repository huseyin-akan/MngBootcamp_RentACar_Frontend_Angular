import { LoginResultModel } from './../../features/main/models/loginResultModel';
import { RegisterICModel } from './../../features/main/models/registerICModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginModel } from 'src/app/features/main/models/loginModel';
import { environment } from 'src/environments/environment';
import { AlertifyService } from './alertify.service';
import { RegisterCCModel } from 'src/app/features/main/models/registerCCModel';
import { User } from 'src/app/features/main/models/user';

const role = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
const name ="http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name";
const id = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isAdminLogged = new BehaviorSubject(false);
  public isLogged = new BehaviorSubject(false);  
  public userName = new BehaviorSubject(this.getUserName());
  public nameSurname = new BehaviorSubject(this.getNameSurname());

  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  apiUrl :string = environment.apiUrl;

  constructor(
    private httpClient: HttpClient,
    private jwtHelper: JwtHelperService,
    private router: Router,
    private alertifyService : AlertifyService
  ) 
  { 
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  login(loginModel: LoginModel) {
    return this.httpClient.post<LoginResultModel>(
      environment.apiUrl + 'Auth/login',
      loginModel
    );
  }

  logout() {
    // remove user from local storage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    this.userSubject.next(null);
    this.isAdminLogged.next(false);
    this.isLogged.next(false);
    this.nameSurname.next("");
    this.userName.next("");

    this.router.navigate(['/login']);
  }

  registerIndiviualCustomer(registerModel: RegisterICModel) {
    console.log(this.apiUrl + 'individualcustomers/add')
    
    return this.httpClient.post<LoginResultModel>(      
      this.apiUrl + 'individualcustomers/add',
      registerModel
    );
  }
  //http://localhost:5167/api/IndividualCustomers/add http://localhost:5167/api/

  registerCorporateCustomer(registerModel: RegisterCCModel) {
    return this.httpClient.post<LoginResultModel>(
      environment.apiUrl + 'CorporateCustomers/add',
      registerModel
    );
  }

  isAuthenticated() {
    let token = localStorage.getItem('token')

    //token varsa ve süresi dolmamışsa otantike et.
    if ( token && !this.jwtHelper.isTokenExpired(token) ) {
      return true;
    }

    this.router.navigate(["login"]);
    return false;
  }

  getUserRoles():string[]{
    let token = localStorage.getItem("token");
    
    if(this.isLoggedIn()){
      let result = this.jwtHelper.decodeToken(token)[role];
      //TO DO:burada result için kontrol yapılmalı. eğer null ise bir durum, eğer string ise başka bir durum söz konusu.
      if (typeof result =="string") {
        return [result];
      }else if(typeof result =="object"){
        return result;
      }     
    }
    return [];    
  }

  //TODO: Şirket için companyName almak gerekecek. Bunun için backende destek getirmemiz lazım.
  getNameSurname() :string{
    let token = localStorage.getItem("token");
    if(this.isLoggedIn()){
      return this.jwtHelper.decodeToken(token)[name];
    }
    return "";    
  }

  getUserName() :string{
    let token = localStorage.getItem("token");
    if(this.isLoggedIn()){
      return this.jwtHelper.decodeToken(token)["username"];
    }
    return "";    
  }

  getUserEmail():string{
    let token = localStorage.getItem("token");
    if(this.isLoggedIn()){
      return this.jwtHelper.decodeToken(token)["email"];
    }
    return null;    
  }

  //burası değişmeli, number yerine tarih dönsün bence.
  getExpirationTime() :number{
    let token = localStorage.getItem("token");
    if(this.isLoggedIn()){
      return this.jwtHelper.decodeToken(token)["exp"];
    }
    return null;      
  }

  getUserId() : number{
    let token = localStorage.getItem("token");
    if(this.isLoggedIn()){
      return this.jwtHelper.decodeToken(token)[id];
    }
    return null;    
  }

  isAUserLoggedIn():boolean{
    if(this.jwtHelper.tokenGetter()){   
      return true;      
    } 
    return false;
  }

  adminIsLoggedIn() : boolean{
    if(this.isLoggedIn()){
      let roles:string[] = this.getUserRoles();
      let result = roles.some( item => item == "Admin");
      this.isAdminLogged.next(result); 
      return result;
    }
    this.isAdminLogged.next(false);
    return false;    
  }

  isLoggedIn():boolean{
    if(this.jwtHelper.tokenGetter()){   
      this.isLogged.next(true); 
      return true;      
    } 
    this.isLogged.next(false);
    return false;
  }
}
