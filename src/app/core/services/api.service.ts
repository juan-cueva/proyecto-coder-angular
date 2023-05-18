import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../../shared/model/student';
import { Curso } from '../../shared/model/curso';
import { User } from 'src/app/shared/model/user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private URL_API = 'https://644b2be14bdbc0cc3a8c4f56.mockapi.io/coderhouse/';
  private URL_API2 = 'https://64387f674660f26eb19da747.mockapi.io/momentos2/'
  constructor(
    private httpClient: HttpClient
  ) { }

  //Mock API exclusiva para este proyecto

  public getEstudiantes(): Observable<Student[]> {
    return this.httpClient.get<Student[]>(this.URL_API + 'estudiantes');
  }

  public postEstudiante(body: Student) {
    return this.httpClient.post(this.URL_API + 'estudiantes', body)
  }

  public putEstudiante(id: string, body: Student) {
    return this.httpClient.put(this.URL_API + 'estudiantes/' + id, body);
  }

  public deleteEstudiante(id: string) {
    return this.httpClient.delete(this.URL_API + 'estudiantes/' + id);
  }

  public getCursos(): Observable<Curso[]> {
    return this.httpClient.get<Curso[]>(this.URL_API + 'cursos');
  }

  public postCurso(body: Curso) {
    return this.httpClient.post(this.URL_API + 'cursos', body)
  }

  public putCurso(id: number, body: Curso) {
    return this.httpClient.put(this.URL_API + 'cursos/' + id, body)
  }

  public deleteCurso(id: string) {
    return this.httpClient.delete(this.URL_API + 'cursos/' + id);
  }

  //Mock API compartida con otro proyecto

  public getUsuarios(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.URL_API2 + 'usuarios')
  }

  public postUsuario(body: User) {
    return this.httpClient.post(this.URL_API2 + 'usuarios', body)
  }

  public putUsuario(id: string, body: User) {
    return this.httpClient.put(this.URL_API2 + 'usuarios/' + id, body)
  }

  public deleteUsuario(id: string) {
    return this.httpClient.delete(this.URL_API2 + 'usuarios/' + id);
  }
}
