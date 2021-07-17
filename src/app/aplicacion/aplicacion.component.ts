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
}
