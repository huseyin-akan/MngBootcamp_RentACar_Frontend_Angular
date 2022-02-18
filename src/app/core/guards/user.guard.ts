import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertifyService } from '../services/alertify.service';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  constructor(
    private router: Router,
    private alertifyService: AlertifyService,
    private authService : AuthService
) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree{
        
    //eğer admin otantike edildiyse true dön.
    if (this.authService.isAuthenticated()){
        return true;
    }
    
    //eğer admin otantike edilmediyse false dön, login sayfasına yönlendir ve giriş yapma uyarısı ver.
      this.router.navigate(["login"]);
      this.alertifyService.error("Sayfaya gidebilmek için giriş yapmanız gerekmektedir.!!");
      return false;
}
  
}
