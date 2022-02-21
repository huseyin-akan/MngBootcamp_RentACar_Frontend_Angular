import { CityListModel } from './../models/cityListModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PagedListResponseModel } from 'src/app/core/models/pagedListResponseModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  apiUrl :string = environment.apiUrl + "Cities/";

  constructor(private httpClient : HttpClient) { }

  getCities(page: number= 0, size: number = 100){
    let newPath = `${this.apiUrl}getall?Page=${page}&PageSize=${size}`;
    return this.httpClient.get<PagedListResponseModel<CityListModel>>(newPath);
  }
}
