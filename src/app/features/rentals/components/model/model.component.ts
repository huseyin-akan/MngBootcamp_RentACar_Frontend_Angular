import { ModelListModel } from './../../models/modelListModel';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.css']
})
export class ModelComponent implements OnInit {

  constructor() { }
  models : ModelListModel[];

  ngOnInit(): void {
    this.getModels();
  }

  getModels(){
    
  }

}
