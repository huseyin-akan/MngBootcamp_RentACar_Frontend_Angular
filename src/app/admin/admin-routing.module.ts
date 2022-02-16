import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../core/guards/admin.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  {   path: 'adminalThings', component: DashboardComponent , canActivate: [AdminGuard],
        children :[
          { path: 'dashboard', component: DashboardComponent, canActivate: [AdminGuard] }
        ]
  }, 
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
