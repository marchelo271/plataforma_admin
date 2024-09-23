import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class adminGuard implements CanActivate {

  constructor(private _adminService: AdminService, private _router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (!this._adminService.isAuthenticated(['gerente'])) {
       this._router.navigate(['/login']); 
       return false; 
    } 
    return true; 
  }
}
