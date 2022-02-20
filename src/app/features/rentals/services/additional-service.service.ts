import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PagedListResponseModel } from 'src/app/core/models/pagedListResponseModel';
import { environment } from 'src/environments/environment';
import { ASListModel } from '../models/additionalServices/aSListModel';

@Injectable({
  providedIn: 'root'
})
export class AdditionalServiceService {

  apiUrl :string = environment.apiUrl + "AdditionalServices/";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json'
    })
  }
  constructor(
    private httpClient : HttpClient
  ) { }

  getAdditionalServices(page:number = 0, pageSize : number = 10){
    return this.httpClient.get<PagedListResponseModel<ASListModel>>(`${this.apiUrl}getall?Page=${page}&PageSize=${pageSize}`);
  }  
}
