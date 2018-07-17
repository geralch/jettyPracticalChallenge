import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public userFullName : string = ''

  constructor() { }

  ngOnInit() {
    let userData = JSON.parse(localStorage.getItem('user'))
    this.userFullName = userData['name'] + ' ' + userData['lastname']
  }

}
