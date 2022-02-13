import { PageRequest } from './../models/paginate/pageRequest';
import { CarListModel } from './../models/carListModel';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Paginate } from '../models/paginate/paginate';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl :string = environment.apiUrl + "Cars/";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json'
    })
  }

  constructor(private httpClient : HttpClient) { }

  getAllCars() :Observable<Paginate<CarListModel>> {
    return this.httpClient.get<Paginate<CarListModel>>(this.apiUrl+"getall")
  }

  getAllRentableCars(page:number = 0, pageSize : number = 10) :Observable<Paginate<CarListModel>> {
    return this.httpClient.get<Paginate<CarListModel>>(`${this.apiUrl}getallrentables?Page=${page}&PageSize=${pageSize}`);
  }

  
  //TODO: getbyid controller'da yok ama yazılacak.
  getCarById(id : number) {
    return this.httpClient.get<CarListModel>(this.apiUrl+"get/"+id)
  }

  // addCar(createCarModel : CreateCarModel){
  //   return this.httpClient.post<ResponseModel>(
  //     this.apiUrl + 'add',
  //     createCarModel,
  //     this.httpOptions
  //   );
  // }
}
