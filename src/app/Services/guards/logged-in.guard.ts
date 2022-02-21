import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoggedInGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
   
  ):boolean
    {
    if (localStorage.getItem('Token')) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
