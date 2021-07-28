  
import { Component, OnInit } from '@angular/core';
import { DataServicesService } from '../data-services.service';
import { ServicioService } from '../servicio.service';
import { HttpClient } from '@angular/common/http';
import { Observable,of } from 'rxjs';
import { FormControl } from '@angular/forms';
import { tap, startWith, debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
export interface Data {
  cod:string;
  name:string;
  sexo:string;
  liminferior:string;
  limsuperior:string;
}
const ELEMENT_DATA: Data[] = [
];
@Component({
  selector: 'app-aplicacion',
  templateUrl: './aplicacion.component.html',
  styleUrls: ['./aplicacion.component.css'],
 
})
export class AplicacionComponent implements OnInit{
  public keyword="name";
  datos:[];
  conversion: any;
  usuario=new Usuario();
  myControl = new FormControl();
  filterPost='';
  filteredOptions: Observable<any[]>;
  displayedColumns:string[]=['cod','name','sexo','liminferior','limsuperior'];
  dataSource:any[]=[];
  opts = [];
  constructor(private dataserv :DataServicesService,public http:HttpClient,
    private serv:ServicioService){
    this.dataserv.obtenerdatos().then(data => {
      this.dataSource=data;
    });
  }
  obtenerdatosauto(value:any){
    
    if(value!==""){
      console.log(value);
      console.log(this.usuario.dato);
      this.usuario.dato=value;
      let url='https://medlab.xhygnusnews.com/public/api/Cie10?ml=';
      let busqueda=url+value;
      debugger;
      if(value.length>3){
        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          debounceTime(400),
          distinctUntilChanged(),
          switchMap(val => {
                return this.filter(val || '')
           }) 
        )
      }
    }
    else{
      return value;
    }
 
  }
  datoentrada(value:any){
    
    if(value!==""){
      console.log(value);
      console.log(this.usuario.dato);
      this.usuario.dato=value;
      let url='https://medlab.xhygnusnews.com/public/api/Cie10?ml=';
      let busqueda=url+value;
      debugger;
      if(value.length>=3){
        this.http.get(busqueda)
        .subscribe(data=>{
        this.conversion=data;
        this.datos=this.conversion;
        this.dataserv.obtenerdatos();
      });
      }
    }
    else{
      return value;
    }
  }
  ngOnInit() {

  }
  ImprimirDatos(){
    this.http.get('https://medlab.xhygnusnews.com/public/api/Cie10')
    .subscribe(data=>{
      this.conversion=data;
      this.datos=this.conversion;
      console.log('pruebaAPI',this.datos);
    });
  }
  obtenerdatos(){
    return this.opts.length ?
    of(this.opts) :
    this.http.get<any>('https://medlab.xhygnusnews.com/public/api/Cie10').pipe(tap(data => this.opts = data))
  }
  filter(val: string): Observable<any[]> {
    return this.serv.obtenerdatosapilista()
     .pipe(
       map(response => response.filter(option => { 
         return option.name.toLowerCase().indexOf(val.toLowerCase()) === 0
       }))
     )
   }  
}
export class Usuario{
  dato:string;
}