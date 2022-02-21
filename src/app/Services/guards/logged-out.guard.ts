import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoggedOutGuard implements CanActivate {
  datos: any = {};
  constructor(
    private router:Router){

  }
  
  IsRol(){
    
    this.datos=JSON.parse(localStorage.getItem('payload'));
     
        return this.datos.id_rol
     

  }
  canActivate(): boolean {
      if (localStorage.getItem('Token')) {
        if(this.IsRol()==4){
          this.router.navigate(['/menu-opciones-se/menu-principal'])
        }else{
          if(this.IsRol()==5){
            this.router.navigate(['/menu-opciones/tabs'])
          }
        }
        
        return false;
      } else {
        return true;
      }
  }
  
}
