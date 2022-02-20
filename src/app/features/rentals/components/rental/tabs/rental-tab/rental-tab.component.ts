import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CreateRentalModel } from 'src/app/features/rentals/models/rentalModels/createRentalModel';
declare var $:any;

@Component({
  selector: 'app-rental-tab',
  templateUrl: './rental-tab.component.html',
  styleUrls: ['./rental-tab.component.css']
})
export class RentalTabComponent implements OnInit {

  rentalForm: FormGroup;
  rentalModel: CreateRentalModel; 
  
  constructor() { }

  ngOnInit(): void {

  }

}
