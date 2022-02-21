import { CityListModel } from 'src/app/features/rentals/models/cityListModel';
import { RentalService } from 'src/app/features/rentals/services/rental.service';
import { CityService } from 'src/app/features/rentals/services/city.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { AlertifyService } from 'src/app/core/services/alertify.service';
import { ActiveRentalsListDto } from 'src/app/features/rentals/models/rentalModels/activeRentalsListDto';
import { EndRentalModel } from 'src/app/features/rentals/models/rentalModels/endRentalModel';

@Component({
  selector: 'app-admin-rental',
  templateUrl: './admin-rental.component.html',
  styleUrls: ['./admin-rental.component.css'],
})
export class AdminRentalComponent implements OnInit {
  constructor(
    private alertifyService: AlertifyService,
    private formBuilder: FormBuilder,
    private cityService: CityService,
    private rentalService: RentalService
  ) {}

  rentals: ActiveRentalsListDto[] = [];
  cities: CityListModel[] = [];

  //for updating selected cars
  endRentalForm: FormGroup;
  endRentalModel: EndRentalModel = new EndRentalModel();

  citiesLoaded = false;
  rentalsLoaded = false;

  displayUpdateDialog = false;
  rentalToUpdate: ActiveRentalsListDto;
  returnedKilometer : number;
  returnedCityId : number = 0;

  returnedDate :Date = new Date();

  ngOnInit(): void {
    this.getCities();
    this.getActiveRentals();

    //this.createEndRentalForm();
  }

  // createEndRentalForm() {
  //   this.endRentalForm = this.formBuilder.group({
  //     returnedDate: ['', [Validators.required]],
  //     returnedKilometer: ['', [Validators.required]],
  //     returnedCityId: ['', [Validators.required]],
  //   });
  // }

  getActiveRentals() {
    this.rentalService.getActiveRentals().subscribe({
      next: (response) => {
        this.rentals = response.items;
        this.rentalsLoaded = true;
      },
      error: (err) => {
        this.alertifyService.error(
          'Kiralık araçlar listesi getirilirken bir hata oluştu.'
        );
      },
    });
  }

  getCities() {
    this.cityService.getCities().subscribe({
      next: (response) => {
        this.cities = response.items;
        this.citiesLoaded = true;
      },
      error: (err) => {
        this.alertifyService.error(
          'Şehirler listesi getirilirken bir hata oluştu.'
        );
      },
    });
  }

  showUpdateDialog(rental: ActiveRentalsListDto) {
    this.rentalToUpdate = rental;
    this.displayUpdateDialog = true;
  }

  endRental() {
      //this.endRentalModel = Object.assign({}, this.endRentalForm.value);
      console.log(this.endRentalModel);
      console.log(this.rentalToUpdate);

      this.endRentalModel.id = this.rentalToUpdate.id;
      this.endRentalModel.carId = this.rentalToUpdate.carId;
      this.endRentalModel.returnedDate = this.returnedDate;
      this.endRentalModel.returnedCityId = this.returnedCityId;
      this.endRentalModel.returnedKilometer = this.returnedKilometer;

      this.rentalService.endRental(this.endRentalModel).subscribe({
        next: (response) => {
          if (response != null) {
            this.alertifyService.success(
              'Araç kiralama işlemi başarılı bir şekilde sonlandırıldı.'
            );
          }
          this.displayUpdateDialog = false;
          this.getActiveRentals();
        },
        error: (err) => {
          this.alertifyService.success(
            'Araç kiralama sonlandırma işlemi başarısız oldu.'
          );
        },
      });

  }
}
