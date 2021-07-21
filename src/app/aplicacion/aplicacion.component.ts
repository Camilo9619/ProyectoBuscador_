  
import { Component, OnInit } from '@angular/core';
import { DataServicesService } from '../data-services.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
 


@Component({
  selector: 'app-aplicacion',
  templateUrl: './aplicacion.component.html',
  styleUrls: ['./aplicacion.component.css'],
  providers:[DataServicesService]
})
export class AplicacionComponent implements OnInit {
 usuario=new Usuario();
 
  public keyword="name";
  public data$: Observable<any[]>;
  conversion: any;
  datos:[];
  filterPost='';

  constructor(
    private http:HttpClient,
    private dataserv:DataServicesService
  ) { }

  ngOnInit(): void {
   this.ImprimirDatos();
   this.obtenerdatos();
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
    this.data$=this.dataserv.obtenerdatosAPI();
  }
  datoentrada(value:any){
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
      this.data$=this.dataserv.obtenerdatosAPI();
      });
    }
  }
}
export class Usuario{
  dato:string;
}