import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertifyService } from 'src/app/core/services/alertify.service';
import { CityListModel } from 'src/app/features/rentals/models/cityListModel';
import { ColorListModel } from 'src/app/features/rentals/models/colorModels/colorListModel';
import { ModelListModel } from 'src/app/features/rentals/models/modelListModel';
import { CarService } from 'src/app/features/rentals/services/car.service';
import { CityService } from 'src/app/features/rentals/services/city.service';
import { ColorService } from 'src/app/features/rentals/services/color.service';
import { ModelService } from 'src/app/features/rentals/services/model.service';
import { CreateCarModel } from 'src/app/features/rentals/models/carModels/createCarModel';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent implements OnInit {

  constructor(
    private carService : CarService,
    private modelService : ModelService,
    private colorService : ColorService,
    private cityService : CityService,
    private alertifyService : AlertifyService,
    private formBuilder: FormBuilder,
    private router : Router
  ) { }

  addCarForm : FormGroup;
  createCarModel : CreateCarModel = new CreateCarModel();
  models : ModelListModel[] = [];
  colors : ColorListModel[] = [];
  cities : CityListModel[] = [];

  modelsLoaded = false;
  colorsLoaded = false;
  citiesLoaded = false; 

  ngOnInit(): void {
      this.getModels();
      this.getColors();
      this.getCities();

      this.createAddCarForm();
  }

  addCar(){
    this.createCarModel = Object.assign({}, this.addCarForm.value);
    this.carService.addCar(this.createCarModel).subscribe({
      next : (response) => {
        this.alertifyService.success("Araç ekleme işlemi başarılı oldu.");
        this.router.navigate(['/adminalThings/cars']);
      },
      error : (err) => {
        this.alertifyService.error("Araç ekleme işlemi başarısız oldu. Çünkü: " + err.error.Errors[0].ErrorMessage)
      }
    });
  }

  createAddCarForm() {
    this.addCarForm = this.formBuilder.group({
      modelId: ['', [Validators.required]],
      colorId: ['', [Validators.required]],
      cityId: ['', [Validators.required]],
      plate: ['', [Validators.required, Validators.maxLength(10)]],
      modelYear: ['', [Validators.required]],
      findexScore: ['', [Validators.required]],
      kilometer: ['', [Validators.required]]
    });
  }

  getModels(){
    this.modelService.getModels().subscribe({
      next : (response) => {
        this.models = response.items;
        this.modelsLoaded = true;
      },
      error: (err) => {
        this.alertifyService.error("Modeller getirilirken bir hata oluştu.")
      }
    });
  }
  
  getCities(){
    this.cityService.getCities().subscribe({
      next : (response) => {
        this.cities = response.items;
        this.citiesLoaded = true;
      },
      error: (err) => {
        this.alertifyService.error("Şehirler getirilirken bir hata oluştu.")
      }
    });
  }

  getColors(){
    this.colorService.getColors().subscribe({
      next : (response) => {
        this.colors = response.items;
        this.colorsLoaded = true;
      },
      error: (err) => {
        this.alertifyService.error("Renkler getirilirken bir hata oluştu. Çünkü: " + err.error)
      }
    });
  }

}
