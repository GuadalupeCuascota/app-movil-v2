import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Materia } from '../Models/materias';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class RegistroMateriaService {

  constructor(private httpClient: HttpClient) { }

getMaterias(){
  return this.httpClient.get<Array<Materia>>(environment.baseUrl+"/materias");
}




}
