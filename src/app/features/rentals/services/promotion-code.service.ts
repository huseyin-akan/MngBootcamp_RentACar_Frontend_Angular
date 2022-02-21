import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PagedListResponseModel } from 'src/app/core/models/pagedListResponseModel';
import { AuthService } from 'src/app/core/services/auth.service';
import { environment } from 'src/environments/environment';
import { PromotionCodeListModel } from '../models/promotionCodeModels/promotionCodeListModel';

@Injectable({
  providedIn: 'root'
})
export class PromotionCodeService {

  apiUrl :string = environment.apiUrl + "PromotionCodes/";

  constructor(
    private httpClient : HttpClient,
    private authService : AuthService
    ) { }

  getPromotionCodes(page: number= 0, size: number = 100){
    let newPath = `${this.apiUrl}getall?Page=${page}&PageSize=${size}`;
    return this.httpClient.get<PagedListResponseModel<PromotionCodeListModel>>(newPath);
  }

  getPromotionCode(code :string){
    let id = this.authService.getUserId();
    let newPath = `${this.apiUrl}get?code=${code}&customerId=${id}`;
    return this.httpClient.get<PromotionCodeListModel>(newPath);
  }
}
