import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BrandListModel } from '../models/brandListModel';
import { ListResponseModel } from 'src/app/core/models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  apiUrl :string = environment.apiUrl + "Brands/";

  constructor(private httpClient : HttpClient) { }

  getBrands(page: number, size: number):Observable<ListResponseModel<BrandListModel>>{
    let newPath = `${this.apiUrl}getall?Page=${page}&PageSize=${size}`;
    return this.httpClient.get<ListResponseModel<BrandListModel>>(newPath);
  }
}
