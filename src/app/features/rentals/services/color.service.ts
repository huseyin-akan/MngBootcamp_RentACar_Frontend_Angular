import { CreateColorModel } from './../models/colorModels/createColorModel';
import { UpdatedColorDto } from './../models/colorModels/updatedColorDto';
import { UpdateColorModel } from './../models/colorModels/updateColorModel';
import { ColorListModel } from '../models/colorModels/colorListModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PagedListResponseModel } from 'src/app/core/models/pagedListResponseModel';
import { ResponseModel } from 'src/app/core/models/responseModel';
import { CreatedColorDto } from '../models/colorModels/createdColorDto';

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

  deleteColor(id : number){
    return this.httpClient.delete<ResponseModel>(`${this.apiUrl}delete/${id}`);
  }

  updateColor(color : UpdateColorModel){
    return this.httpClient.put<UpdatedColorDto>(`${this.apiUrl}update`, color )
  }

  addColor(color : CreateColorModel){
    return this.httpClient.post<CreatedColorDto>(`${this.apiUrl}add`, color)
  }
}
