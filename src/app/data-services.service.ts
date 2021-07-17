import { Injectable } from '@angular/core';
import {HttpClientModule,HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataServicesService {
  private URL='https://medlab.xhygnusnews.com/public/api/Cie10';
  constructor(private http:HttpClient){ }
  obtenerdatosAPI():Observable<any[]>{
   return this.http.get<any[]>(this.URL);
  }
}
