import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PagedListResponseModel } from 'src/app/core/models/pagedListResponseModel';
import { environment } from 'src/environments/environment';
import { ModelListModel } from '../models/modelListModel';

@Injectable({
  providedIn: 'root'
})
export class ModelService {

  apiUrl :string = environment.apiUrl + "Models/";

  constructor(private httpClient : HttpClient) { }

  getModels(page: number = 0, size: number = 100):Observable<PagedListResponseModel<ModelListModel>>{
    let newPath = `${this.apiUrl}getall2?Page=${page}&PageSize=${size}`;
    return this.httpClient.get<PagedListResponseModel<ModelListModel>>(newPath);
  }
}
