import { Injectable } from '@angular/core';
import {HttpClientModule,HttpClient} from '@angular/common/http';
import { Observable, of, Subscription } from 'rxjs';
import { tap, startWith, debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})

export class DataServicesService {
  constructor(private http: HttpClient) { }
  obtenerdatos(): Promise<any>{
    return this.http.get('https://medlab.xhygnusnews.com/public/api/Cie10').toPromise();
  }
}