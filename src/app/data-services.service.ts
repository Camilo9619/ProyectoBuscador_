import { Injectable } from '@angular/core';
import {HttpClientModule,HttpClient} from '@angular/common/http';
import { Observable, of, Subscription } from 'rxjs';
import { tap, startWith, debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})

export class DataServicesService {
  constructor(private http: HttpClient) { }

  opts:any = [];
  obtenerdatos() {
    return this.opts.length ?
      of(this.opts) :
      this.http.get<any>('https://medlab.xhygnusnews.com/public/api/Cie10').pipe(tap(data => this.opts = data))
  }
}
