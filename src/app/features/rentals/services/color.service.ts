import { ColorListModel } from './../models/colorListModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PagedListResponseModel } from 'src/app/core/models/pagedListResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  apiUrl :string = environment.apiUrl + "Colors/";

  constructor(private httpClient : HttpClient) { }

  getColors(page: number= 0, size: number = 100){
    let newPath = `${this.apiUrl}getall?Page=${page}&PageSize=${size}`;
    return this.httpClient.get<PagedListResponseModel<ColorListModel>>(newPath);
  }

  deleteColor(){

  }

  updateColor(){
    
  }
}
