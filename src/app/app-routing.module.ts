import { RegisterComponent } from './features/main/components/register/register.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './features/main/components/error/error.component';
import { HomeComponent } from './features/main/components/home/home.component';
import { LoginComponent } from './features/main/components/login/login.component';

const routes: Routes = [
  {path: "login" , component : LoginComponent},
  {path: "register" , component : RegisterComponent},
  {path: "home", component: HomeComponent},

  //boş veride ana sayfaya gönder.
  {path:'' , redirectTo: '', pathMatch : "full"},

  // bilinmeyen istekler için hata sayfasına yönlendir.
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
