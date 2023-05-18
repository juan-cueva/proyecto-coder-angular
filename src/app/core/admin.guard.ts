import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivateChild {

  constructor(
    private router: Router
  ) { }

  
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const usuarioString = sessionStorage.getItem('usuarioactual');
    const usuario = usuarioString ? JSON.parse(usuarioString) : '';
    if(usuario.rol === 0) {
      return this.router.navigate(['/landing']).then(() => false);
    }
    return true;
  }
  
}
