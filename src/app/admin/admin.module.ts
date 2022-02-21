import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule} from 'primeng/dialog';
import { ConfirmPopupModule} from 'primeng/confirmpopup';
import { TagModule } from 'primeng/tag';
import { CardModule} from 'primeng/card';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminBrandsComponent } from './components/admin-brands/admin-brands.component';
import { AdminCarsComponent } from './components/admin-cars/admin-cars.component';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { AddCarComponent } from './components/add-car/add-car.component';
import { AdminColorsComponent } from './components/admin-colors/admin-colors.component';
import { AddColorComponent } from './components/add-color/add-color.component';
import { AdminRentalComponent } from './components/admin-rental/admin-rental.component';
import { CalendarModule } from 'primeng/calendar';


@NgModule({
  declarations: [
    DashboardComponent,
    AdminBrandsComponent,
    AdminCarsComponent,
    AddCarComponent,
    AdminColorsComponent,
    AddColorComponent,
    AdminRentalComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule,
    TableModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    TagModule,
    ButtonModule,
    DropdownModule,
    DialogModule,
    ConfirmPopupModule,
    CardModule,
    CalendarModule
  ],
  exports:[
    DashboardComponent
  ]
})
export class AdminModule { }
