import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { PanelModule } from 'primeng/panel';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { RatingModule } from 'primeng/rating';
import { DropdownModule } from 'primeng/dropdown';
import { CarComponent } from './features/rentals/components/car/car.component';
import { BrandComponent } from './features/rentals/components/brand/brand.component';
import { ListboxModule} from 'primeng/listbox';
import { ModelComponent } from './features/rentals/components/model/model.component';
import { HomeComponent } from './features/main/components/home/home.component';
import { NavComponent } from './features/main/components/nav/nav.component';
import { LoginComponent } from './features/main/components/login/login.component';
import { JwtModule } from '@auth0/angular-jwt';
import { ProfileSectionComponent } from './features/main/components/nav/profile-section/profile-section.component';
import { RegisterComponent } from './features/main/components/register/register.component';
import { ErrorComponent } from './features/main/components/error/error.component';
import { RadioButtonModule} from 'primeng/radiobutton';
import { AdminModule } from './admin/admin.module';
import { TableModule} from 'primeng/table';
import { ConfirmPopupModule} from 'primeng/confirmpopup';
import { ConfirmationService } from 'primeng/api';

export function tokenGetter() {
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [
    AppComponent,
    CarComponent,
    BrandComponent,
    ModelComponent,
    HomeComponent,
    NavComponent,
    LoginComponent,
    ProfileSectionComponent,
    RegisterComponent,
    ErrorComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RadioButtonModule,
    ButtonModule,
    ConfirmPopupModule,
    DataViewModule,
    RatingModule,
    DialogModule,
    RippleModule,
    TableModule,
    TagModule,
    PanelModule,
    InputTextModule,
    CalendarModule,
    CheckboxModule,
    DropdownModule,
    ListboxModule,
    AdminModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter
      }
    })
  ],
  providers: [ConfirmationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
