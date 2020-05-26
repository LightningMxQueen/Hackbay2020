import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AppSettings } from 'src/app/app.config';

@Injectable({
  providedIn: 'root'
})
export class GardenService {

  constructor(private http:HttpClient) {}

  //place a plant
  plancePlant(plant_id:string,x:number,y:number):Observable<String>{
    let place = {
      "email":sessionStorage.getItem("email"),
      "plant_id":plant_id,
      "x":x,
      "y":y
    }
    return this.http
      .post<any>(AppSettings.API_ENDPOINT+"/garden/place",place)
  }

}
