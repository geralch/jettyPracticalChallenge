import { HTTPCallsService } from './../services/httpcalls.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public userEmail : string = '';
  public userPassword : string = '';
  public showError : boolean = false;
  public errorText : string = '';

  constructor(private service: HTTPCallsService,
    private router: Router) {
  }

  ngOnInit() {
  }

  loginIn() {
    let sessionData = {
      driver: {
        email: this.userEmail,
        password: this.userPassword
      }
    }
    this.service.loginRequest(sessionData, '/drivers/session')
      .then((response) => {
        let autorization = localStorage.getItem('Authorization');
        if (autorization != null) {
          if(response.hasOwnProperty('id')){
            this.router.navigate(['/home'])
            this.showError = false
          }
        }else{
          this.showError = true
          this.errorText = localStorage.getItem('ErrorText')
        }
      })
  }
}
