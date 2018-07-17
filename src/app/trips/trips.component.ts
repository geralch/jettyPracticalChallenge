import { HTTPCallsService } from './../services/httpcalls.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from "lodash";
import * as moment from "moment";

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})
export class TripsComponent implements OnInit {

  private tripsRawData : any = [];
  public trips : any = [];
  public trip : any = {};
  public stopsModalShow : boolean = false;
  constructor(private service: HTTPCallsService,
    private router: Router) {
  }

  ngOnInit() {
    this.service.getRequest({}, '/drivers/trips')
      .then(response => {
        if (response) {
          this.tripsRawData = response
          this.setFormateTrips()
        }
      })
  }

  setFormateTrips() {
    let formateTrips = _.chain(this.tripsRawData)
      .groupBy("date")
      .toPairs()
      .map((currentItem) => {
        return _.zipObject(["date", "trips"], currentItem);
      })
      .value();
    formateTrips = _.orderBy(formateTrips, ['date'], ['desc'])
    moment.locale('es');
    for (let i = 0; i < formateTrips.length; i++) {
      let date = formateTrips[i]['date']
      formateTrips[i]['dateText'] = moment(date).format('dddd | DD MMMM')
      for (let j = 0; j < formateTrips[i]['trips'].length; j++) {
        let lastIndex = formateTrips[i]['trips'][j]['trip_stops'].length - 1
        let hour = formateTrips[i]['trips'][j]['time']
        formateTrips[i]['trips'][j]['firtsStop'] = formateTrips[i]['trips'][j]['trip_stops'][0]['name']
        formateTrips[i]['trips'][j]['lastStop'] = formateTrips[i]['trips'][j]['trip_stops'][lastIndex]['name']
        formateTrips[i]['trips'][j]['dateText'] = moment(date).format('dddd | DD MMMM')
        formateTrips[i]['trips'][j]['hourMoment'] = moment(date + ' ' + hour, 'YYYY-MM-DD hh:mm A').format('HH:mm')
      }
      formateTrips[i]['trips'] = _.orderBy(formateTrips[i]['trips'], ['hourMoment'], ['asc'])
    }
    this.trips = formateTrips
  }

  showStops(trip){
    this.stopsModalShow = true;
    this.trip = {}
    this.trip = trip
    console.log(this.trip)
  }
}
