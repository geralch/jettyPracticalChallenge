import { HTTPCallsService } from './../services/httpcalls.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})
export class TripsComponent implements OnInit {

  public tripsRawData = []
  constructor(private service: HTTPCallsService,
    private router: Router) {
  }

  ngOnInit() {
    this.service.getRequest({}, '/drivers/trips')
      .then(response => {
        if (response) {
          this.tripsRawData = response
          this.setNumberOfDates()

        }
      })
  }

  setNumberOfDates() {
    console.log(this.tripsRawData)
    let totalDates = []
    for(let i = 0; i <this.tripsRawData.length; i++){
      if(totalDates.length >0){
        for(let j = 0; j < totalDates.length; j++){
          console.log()
          if(this.tripsRawData[i]['date'] == totalDates[j]['date']){
            totalDates[j]['tripsCount'] = totalDates[j]['tripsCount'] + 1
          }else{
            totalDates.push({
              'date' : this.tripsRawData[i]['date'],
              'tripsCount' : 1
            })
          }
        }
      }
    }
    console.log("*****")
    console.log(totalDates)
  }

}
