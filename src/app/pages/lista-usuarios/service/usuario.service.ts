import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, retry, tap } from 'rxjs';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { IResponse } from '../../common/IResponse';
import { UsuarioModel } from '../model/usuario-model.model';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  apiUrl: any = environment.apiURL;

  constructor(private _httpClient: HttpClient) {}

  SaveUser(user:  UsuarioModel) {
    let urlEndPoint = this.apiUrl + environment.sigUpEndpoint;
    return this._httpClient.post<IResponse>(urlEndPoint,user).pipe(
      catchError(this.handleError) // Manejo de errores, si es necesario
    );
  }

  ObtenerUsuarioById(param: any) {
    let urlEndPoint = this.apiUrl + environment.getByIdUserEndpoint;
    return this._httpClient.get<any>(urlEndPoint).pipe(
      catchError(this.handleError) // Manejo de errores, si es necesario
    );
  }

  ObtenerUsuarios() {
    let urlEndPoint = this.apiUrl + environment.getAllUserEndpoint;
    return this._httpClient.get<any>(urlEndPoint).pipe(
      catchError(this.handleError) // Manejo de errores, si es necesario
    );
  }

  signUp(user: any) {
    let urlEndpointupdate = this.apiUrl + environment.sigUpEndpoint;
    return this._httpClient
      .post<IResponse>(urlEndpointupdate, user)
      .pipe(catchError(this.handleError));
  }

  getUserType() {
    let urlEndPoint = this.apiUrl + environment.getUserTypeEndpoint;
    return this._httpClient.get<any>(urlEndPoint).pipe(
      catchError(this.handleError) // Manejo de errores, si es necesario
    );
  }

  // Método para manejar errores (opcional)
  private handleError(error: any): Observable<any> {
    // Implementa el manejo de errores aquí, si es necesario
    // Por ejemplo, puedes mostrar un mensaje de error en la consola o en una ventana modal
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: '',
      html: error.error.message,
      showConfirmButton: false,
      timer: 2500,
    });
    return new Observable<any>();
  }
}
