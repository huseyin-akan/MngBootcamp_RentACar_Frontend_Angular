import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './components/nav/nav.component';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { PanelModule } from 'primeng/panel';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { RatingModule } from 'primeng/rating';
import { TestsComponent } from './components/tests/tests.component';
import { DropdownModule } from 'primeng/dropdown';
import { CarComponent } from './features/rentals/components/car/car.component';
import { BrandComponent } from './features/rentals/components/brand/brand.component';
import { ListboxModule} from 'primeng/listbox';
import { ModelComponent } from './features/rentals/components/model/model.component'

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    TestsComponent,
    CarComponent,
    BrandComponent,
    ModelComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ButtonModule,
    DataViewModule,
    RatingModule,
    DialogModule,
    RippleModule,
    PanelModule,
    InputTextModule,
    CalendarModule,
    CheckboxModule,
    DropdownModule,
    ListboxModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
