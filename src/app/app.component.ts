import { AuthService } from 'src/app/core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { User } from './features/main/models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'mng-rentacar';
  normalUser: boolean = true;
  adminLoggedIn: boolean = false;
  user: User;

  constructor(
    private primengConfig: PrimeNGConfig,
    private authService : AuthService
    ) {
    this.authService.user.subscribe((x) => (this.user = x));
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
  }

  logout() {
    this.authService.logout();
  }
}
