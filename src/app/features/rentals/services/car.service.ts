import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PagedListResponseModel } from 'src/app/core/models/pagedListResponseModel';
import { CarListModel } from '../models/carModels/carListModel';
import { UpdateCarModel } from '../models/carModels/updateCarModel';
import { CreateCarModel } from '../models/carModels/createCarModel';
import { CreatedCarDto } from '../models/carModels/createdCarDto';
import { ResponseModel } from 'src/app/core/models/responseModel';


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

  getAllCars(page:number = 0, pageSize : number = 10) :Observable<PagedListResponseModel<CarListModel>> {
    return this.httpClient.get<PagedListResponseModel<CarListModel>>(`${this.apiUrl}getall?Page=${page}&PageSize=${pageSize}`)
  }

  getAllRentableCars(page:number = 0, pageSize : number = 10) :Observable<PagedListResponseModel<CarListModel>> {
    return this.httpClient.get<PagedListResponseModel<CarListModel>>(`${this.apiUrl}getallrentables?Page=${page}&PageSize=${pageSize}`);
  }

  
  //TODO: getbyid controller'da yok ama yazılacak.
  getCarById(id : number) {
    return this.httpClient.get<CarListModel>(this.apiUrl+"get/"+id)
  }

  updateCar(carToUpdate : UpdateCarModel){
    return this.httpClient.put<UpdateCarModel>(this.apiUrl+ "update", carToUpdate, this.httpOptions);
  }

  deleteCar(id : number){
    return this.httpClient.delete<ResponseModel>(this.apiUrl+ "delete/"+id);
  }

  addCar(createCarModel : CreateCarModel){

    return this.httpClient.post<CreatedCarDto>(
      this.apiUrl + 'add',
      createCarModel,
      this.httpOptions
    );
  }
}
