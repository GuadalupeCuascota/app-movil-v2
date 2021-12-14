import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {TemaMateria } from '../Models/temaMateria';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class RegistroTemaMateriaService {

  constructor(private httpClient: HttpClient) { 

  }
  getTemasMateria(id_tema_materia:number){
    return this.httpClient.get<Array<TemaMateria>>(environment.baseUrl+"/temaMateria/"+id_tema_materia);
  }
}

