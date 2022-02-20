import { RentalTabComponent } from './features/rentals/components/rental/tabs/rental-tab/rental-tab.component';
import { RentalComponent } from './features/rentals/components/rental/rental.component';
import { AdminColorsComponent } from './admin/components/admin-colors/admin-colors.component';
import { AddCarComponent } from './admin/components/add-car/add-car.component';
import { AdminCarsComponent } from './admin/components/admin-cars/admin-cars.component';
import { UserGuard } from './core/guards/user.guard';
import { RegisterComponent } from './features/main/components/register/register.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './features/main/components/error/error.component';
import { HomeComponent } from './features/main/components/home/home.component';
import { LoginComponent } from './features/main/components/login/login.component';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';
import { AdminBrandsComponent } from './admin/components/admin-brands/admin-brands.component';
import { AdminGuard } from './core/guards/admin.guard';
import { CarComponent } from './features/rentals/components/car/car.component';
import { AddColorComponent } from './admin/components/add-color/add-color.component';

const routes: Routes = [
  { path: "login" , component : LoginComponent},
  { path: "register" , component : RegisterComponent},
  { path: "home", component: HomeComponent},
  { path: "cars", component : CarComponent, canActivate: [UserGuard]},
  { path: 'adminalThings', component: DashboardComponent , canActivate: [AdminGuard],
      children :[
          { path: 'dashboard', component: DashboardComponent },
          { path: 'brands', component: AdminBrandsComponent},
          { path: 'cars', component: AdminCarsComponent },
          { path: 'addcar', component: AddCarComponent },
          { path: 'colors', component: AdminColorsComponent },
          { path: 'addcolor', component: AddColorComponent },
        ]
  },
  {path : "rental", component: RentalComponent,
    children : [
      {path : 'choose-date', component : RentalTabComponent }
    ]},

  //boş veride ana sayfaya gönder.
  {path:'' , redirectTo: '/home', pathMatch : "full"},

  // bilinmeyen istekler için hata sayfasına yönlendir.
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
