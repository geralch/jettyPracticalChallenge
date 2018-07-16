import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HTTPCallsService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private url = "https://jettymx-st.herokuapp.com/api";

  constructor(private http: Http, private router: Router) {
    // if (!this.headers.hasOwnProperty("Authorization")) {
    //   localStorage.get('Authorization').then((val) => {
    //     this.headers.set("Authorization", val)
    //   });
    // }
  }

  loginRequest(parametros: any, path: string = ""): Promise<any> {
    return this.http.post(this.url + path, JSON.stringify(parametros), { headers: this.headers })
      .toPromise()
      .then(response => {
        let auth_token = response.json()['auth_token'];
        let email = response.json()['email'];
        let autorization = 'Token ' + auth_token + ' , email=' + email;

        localStorage.setItem('auth_token', auth_token);
        localStorage.setItem('email', email);
        localStorage.setItem('Authorization', autorization);

        localStorage.removeItem('ErrorCode');
        localStorage.removeItem('ErrorText');

        let user = {
          'id': response.json()['id'],
          'name': response.json()['name'],
          'lastname': response.json()['last_name'],
          'email': response.json()['email'],
        };
        return user
      })
      .catch(error => {
        this.handleError(error)
        let problem = {}
        return problem;
      })
  }

  logOutRequest() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('email');
    localStorage.removeItem('Authorization');
  }

  setHeaders(){
    if(localStorage.getItem('Authorization') != null){
      this.headers.set("Authorization", localStorage.getItem('Authorization'))
    }
  }

  getRequest(parametros: any, path: string = ""): Promise<any[]> {
    this.setHeaders()
    return this.http.get(this.url + path, { headers: this.headers, body: JSON.stringify(parametros) })
      .toPromise()
      .then(response => {
        return response.json() as any[]
      })
      .catch(error => {
        this.handleError(error)
        console.log("error Response Data: " + error)
        let problem = []
        return problem;

      });
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    console.log(error);

    localStorage.removeItem('auth_token');
    localStorage.removeItem('email');
    localStorage.removeItem('Authorization');

    localStorage.setItem('ErrorCode', error.status);
    localStorage.setItem('ErrorText', JSON.parse(error['_body'])['message']);
    return Promise.resolve([]);
  }
}
