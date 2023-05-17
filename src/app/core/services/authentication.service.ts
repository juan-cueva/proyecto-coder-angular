import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/shared/model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private URL_AUTHENTICATION = 'https://64387f674660f26eb19da747.mockapi.io/momentos2/'
  private usuario: User;
  private usuarioLoggeado: boolean;

  constructor(
    private httpClient: HttpClient
  ) {
    let estaLoggeado = Boolean(sessionStorage.getItem('usuarioVerificado'));
    this.usuarioLoggeado = estaLoggeado;
  }

  public getUsuario(username: string): Observable<User[]> {
    return this.httpClient.get<User[]>(this.URL_AUTHENTICATION + 'usuarios/' + username)
  }

  public verificarLogin(username: string, password: string) {
    return new Promise<boolean>((resolve, reject) => {
      this.httpClient.get<User>(this.URL_AUTHENTICATION + 'usuarios/' + username).subscribe(
        data => {
          this.usuario = data;
        }, error => {
          reject(error)
        }
      );
      setTimeout(() => {
        if (this.usuario !== undefined && this.usuario.id === username && this.usuario.password === password) {
          sessionStorage.setItem('usuarioVerificado', 'true');
          sessionStorage.setItem('nombres', this.usuario.nombres);
          sessionStorage.setItem('rol', String(this.usuario.rol));
          this.usuarioLoggeado = true;
          resolve(true);
        } else {
          resolve(false);
        }
      }, 300);

    })

  }

  desloggear() {
    sessionStorage.removeItem('usuarioVerificado');
    sessionStorage.removeItem('nombres');
    sessionStorage.removeItem('rol');
    this.usuarioLoggeado = false;
  }

  estaLoggeado(): Promise<boolean> {
    return Promise.resolve(this.usuarioLoggeado);
  }

}
