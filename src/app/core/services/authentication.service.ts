import { HttpClient, HttpParams } from '@angular/common/http';
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

  public verificarLogin(username: string, password: string) {
    return new Promise<boolean>((resolve, reject) => {
      const params = new HttpParams().set('username', username);     
       this.httpClient.get<User>(this.URL_AUTHENTICATION + 'usuarios/', {params}).subscribe(
        data => {
          let user: any = data;
          this.usuario = user[0];
        }, error => {
          reject(error)
        }
      );
      setTimeout(() => {
        if (this.usuario !== undefined && this.usuario.username === username && this.usuario.password === password) {
          sessionStorage.setItem('usuarioverificado', 'true');
          sessionStorage.setItem('nombres', this.usuario.nombres);
          sessionStorage.setItem('rol', String(this.usuario.rol));
          this.usuarioLoggeado = true;
          resolve(true);
        } else {
          resolve(false);
        }
      }, 500);

    })

  }

  desloggear() {
    sessionStorage.clear();
    this.usuarioLoggeado = false;
  }

  estaLoggeado(): Promise<boolean> {
    return Promise.resolve(this.usuarioLoggeado);
  }

}
