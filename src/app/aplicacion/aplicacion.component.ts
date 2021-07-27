  
import { Component, OnInit } from '@angular/core';
import { DataServicesService } from '../data-services.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { tap, startWith, debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
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
  providers:[DataServicesService]
})
export class AplicacionComponent implements OnInit {
 usuario=new Usuario();
  public keyword="name";
  conversion: any;
  datos:[];
  filterPost='';
  myControl = new FormControl();
  options:any = [];
  filteredOptions: Observable<any[]>;
  displayedColumns: string[] = ['id', 'userId', 'title', 'completed'];
  dataSource :Observable<any[]>;
  constructor(
    private http:HttpClient,
    private dataserv:DataServicesService
  ) {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(val => {
            return this.filter(val || '')
       }) 
    )
    
   }

  ngOnInit(): void {
 
  }
  ImprimirDatos(){
    this.http.get('https://medlab.xhygnusnews.com/public/api/Cie10')
    .subscribe(data=>{
      this.conversion=data;
      this.datos=this.conversion;
      console.log('pruebaAPI',this.datos);
    });
  }
  obtenerdatos():void{
    this.filteredOptions=this.dataserv.obtenerdatos();
  }
  datoentrada(value:any){
    
    if(value!==""){
      console.log(value);
      console.log(this.usuario.dato);
      this.usuario.dato=value;
      let url='https://medlab.xhygnusnews.com/public/api/Cie10?ml=';
      let busqueda=url+value;
      debugger;
      if(value.length>3){
        this.http.get(busqueda)
        .subscribe(data=>{
        this.conversion=data;
        this.datos=this.conversion;
        this.filteredOptions=this.dataserv.obtenerdatos();
      });
      }
    }
    else{
      return value;
    }
  }
  filter(val: string): Observable<any[]> {
    return this.dataserv.obtenerdatos()
     .pipe(
       map(response => response.filter(option => { 
         return option.name.toLowerCase().indexOf(val.toLowerCase()) === 0
       }))
     )
   } 
  datosTabla(){
  
  }
}
export class Usuario{
  dato:string;
}