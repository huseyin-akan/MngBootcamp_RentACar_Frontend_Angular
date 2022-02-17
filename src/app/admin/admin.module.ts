import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule} from 'primeng/dialog';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminBrandsComponent } from './components/admin-brands/admin-brands.component';


@NgModule({
  declarations: [
    DashboardComponent,
    AdminBrandsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TableModule,
    ButtonModule,
    DialogModule

  ],
  exports:[
    DashboardComponent
  ]
})
export class AdminModule { }
