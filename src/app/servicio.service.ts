import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subscription } from 'rxjs';
import { tap, startWith, debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  constructor(private http:HttpClient) { }
  opts = [];
  obtenerdatosapilista(){
    return this.opts.length ?
    of(this.opts) :
    this.http.get<any>('https://medlab.xhygnusnews.com/public/api/Cie10').pipe(tap(data => this.opts = data))
  }
}
