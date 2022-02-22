import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
declare let $:any;

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, OnDestroy {

  adminLoggedIn = false;
  myAdminSubcsription : Subscription;
  
  constructor(
    private authService : AuthService,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.adminLoggedIn = this.authService.adminIsLoggedIn();

    this.myAdminSubcsription = this.authService.isAdminLogged.subscribe( val => {
      this.adminLoggedIn = val;
    } )
  }

  ngOnDestroy(): void {
    this.myAdminSubcsription.unsubscribe();
  }

}
