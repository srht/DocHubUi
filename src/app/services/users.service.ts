import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { LoginModel } from '../models/users/login';
import { RegisterModel } from '../models/users/register';
import { RegisterResponseModel } from '../models/users/registerResponse';
import { LoginResponseModel } from '../models/users/loginResponse';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient) { }

  GetDocuments(): Observable<Document[]> {

    let newPath = environment.apiEndpoint + "documents";
    return this.httpClient.get<Document[]>(newPath);
  }

  GetDocumentById(id: string): Observable<Document> {
    let newPath = environment.apiEndpoint + "documents/" + id
    return this.httpClient.get<Document>(newPath);
  }

  DeleteDocumentById(id: string) {
    let newPath = environment.apiEndpoint + "documents/" + id
    this.httpClient.delete<Document>(newPath).subscribe(res => console.log(res));
  }

  Login(loginModel: LoginModel) {
    let newPath = environment.apiEndpoint + "users/login"
    this.httpClient.post<LoginResponseModel>(newPath, loginModel)//, { observe: 'response', withCredentials: true })
      .subscribe((loginResponse) => {
        //.subscribe((response: HttpResponse<any>) => { -->  für samesite cookie set

        // Header verisine erişim
        /*const headers = response.headers;
        console.log('Headers:', headers.keys());
        console.log(headers)*/
        if (loginResponse.token) {

          sessionStorage.setItem('username', loginResponse.username);
          sessionStorage.setItem('token', loginResponse.token);
        }

      })
  }


  Register(register: RegisterModel) {
    let newPath = environment.apiEndpoint + "users/register"
    this.httpClient.post<RegisterResponseModel>(newPath, register).subscribe(res => console.log(res))
  }
}
