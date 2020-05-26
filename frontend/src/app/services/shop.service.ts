import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ShopObject } from 'src/app/models/Object';

import { AppSettings } from 'src/app/app.config';
@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private http:HttpClient){}

  //get items in the shop
  getShopItems():Observable<ShopObject[]>{
    return this.http
      .get<ShopObject[]>(AppSettings.API_ENDPOINT+"/object/shop")
      .pipe(map(res => res['result']))
  }

  //the user tries to buy an item
  buyItem(object_id:string):Observable<String>{
    let purchase ={
      "email":sessionStorage.getItem("email"),
      "_id":object_id
    }
    return this.http
      .post<any>(AppSettings.API_ENDPOINT+"/object/buy",purchase)
  }
}
