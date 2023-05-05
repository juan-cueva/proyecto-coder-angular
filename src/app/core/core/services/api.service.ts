import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../../../shared/model/student';
import { Curso } from '../../../shared/model/curso';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private URL_API = 'https://644b2be14bdbc0cc3a8c4f56.mockapi.io/coderhouse/';

  constructor(
    private httpClient: HttpClient
  ) { }

  public getEstudiantes(): Observable<Student[]> {
    return this.httpClient.get<Student[]>(this.URL_API + 'estudiantes');
  }

  public getCursos(): Observable<Curso[]> {
    return this.httpClient.get<Curso[]>(this.URL_API + 'cursos');
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
}
