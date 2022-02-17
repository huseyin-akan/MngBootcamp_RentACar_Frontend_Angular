import { BrandListModel } from './../../../features/rentals/models/brandListModel';
import { Component, OnInit } from '@angular/core';
import { BrandService } from 'src/app/features/rentals/services/brand.service';
import { AlertifyService } from 'src/app/core/services/alertify.service';

@Component({
  selector: 'app-admin-brands',
  templateUrl: './admin-brands.component.html',
  styleUrls: ['./admin-brands.component.css']
})
export class AdminBrandsComponent implements OnInit {

  constructor(
    private brandService : BrandService,
    private alertifyService : AlertifyService
    ) { }

  brands: BrandListModel[] = [];
  dataLoaded = false;

  displayUpdateDialog = false;
  brandToUpdate :BrandListModel;

  ngOnInit(): void {
    this.getBrands();
  }

  getBrands(){
    this.brandService.getBrands().subscribe({
      next : (response) => {
        this.brands = response.items;
        this.dataLoaded = true;
        console.log(response)
      },
      error: (err) => {
        this.alertifyService.error("Markalar getirilirken bir hata oluştu.")
      },
      complete: () => {

      } 
    });
  }

  showUpdateDialog(brand: BrandListModel){
    this.displayUpdateDialog = true;
    this.brandToUpdate = brand;
  }

}
