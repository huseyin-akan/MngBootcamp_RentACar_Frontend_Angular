import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AdditionalServiceService } from './../../../../services/additional-service.service';
import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { ASListModel } from 'src/app/features/rentals/models/additionalServices/aSListModel';
import { RentalService } from 'src/app/features/rentals/services/rental.service';
declare var $:any;

@Component({
  selector: 'app-extras-tab',
  templateUrl: './extras-tab.component.html',
  styleUrls: ['./extras-tab.component.css']
})
export class ExtrasTabComponent implements OnInit {

  constructor(
    private additionalServiceService : AdditionalServiceService,
    private rentalService : RentalService,
    private router : Router
  ) { }

  additionalServices : ASListModel[] = [];
  sortOptions: SelectItem[];
  sortOrder: number;
  sortField: string;

  ngOnInit(): void {
    this.getAdditionalServices();

    this.sortOptions = [
      {label: 'Price High to Low', value: '!dailyPrice'},
      {label: 'Price Low to High', value: 'dailyPrice'}
  ];
  }

  getAdditionalServices(){
    this.additionalServiceService.getAdditionalServices().subscribe(
      response => {
        this.additionalServices = response.items.filter(x => x.serviceName != environment.cityTOCityService);
      }
    );
  }

  onSortChange(event:any) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
        this.sortOrder = -1;
        this.sortField = value.substring(1, value.length);
    }
    else {
        this.sortOrder = 1;
        this.sortField = value;
    }
  }

  addAS(as : ASListModel){
    this.rentalService.addAdditionalService(as);
  }

  removeAS(as : ASListModel){
    this.rentalService.removeAdditionalService(as);
  }

  checkIfItemAdded(id :number){
    return this.rentalService.checkIfASItemSelected(id);
  }

  nextPage(){
    this.router.navigate(['rental/payment']);
  }

  prevPage(){
    this.router.navigate(['rental/select-car']);
  }

}
