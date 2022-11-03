
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { DeskReservationInfo } from '../model/reservation-info.model';
import { environment } from '../../environments/environment';
import { FirebaseService } from '../services/firebase.service';


@Component({
  selector: 'app-deskreservation',
  templateUrl: './deskreservation.component.html',
  styleUrls: ['./deskreservation.component.scss']
})
export class DeskreservationComponent implements OnInit, OnDestroy {

  // create an empty reservationInfo object
  // it stores the reservation info for each desk (status info: free or reserved)
  reservationInfo: DeskReservationInfo = {
      reservationList: new Array<number>(environment.NUMBER_OF_ALL_DESKS)
  };

  // it holds the subscription for the firebase observable retrieved from the firebase query
  reservationInfoSubscription?: Subscription;

  numberOfAllDesks: number = environment.NUMBER_OF_ALL_DESKS;
  numberOfReservedDesks: number = 0;
  numberOfFreeDesks: number = 0;

  constructor(private fbService: FirebaseService) {
  }

  loadData() {
    // get all reservations from the firebase store
    // and we set the given position in the array related to the desk number
    this.reservationInfoSubscription = this.fbService.getReservations()
      .subscribe(reservations => {
          // clear/init reservationInfo
          this.clearReservationInfo();

          // set the flag (status) for the reserved desk
          for (let r of reservations) {
            let index = r.deskNumber - 1;
            this.reservationInfo.reservationList[index] = 1;  // 1 = reserved
            //console.log(JSON.stringify(r));
          }

          // set counters
          this.numberOfReservedDesks = reservations.length;
          this.numberOfFreeDesks = this.numberOfAllDesks - this.numberOfReservedDesks;

          console.log('Loaded and initialized reservationInfo');
      });
  }

  private clearReservationInfo()
  {
    // clear 'reservationList' array in the 'reservationInfo' object
    // set the flag (status) to zero (free)
    for (let i=0; i<environment.NUMBER_OF_ALL_DESKS; i++) {
        this.reservationInfo.reservationList[i] = 0;  // 0 = free
    }
  }

  ngOnInit() {
      this.loadData();
  }

  ngOnDestroy() {
    // unsubscribe from the reservationInfoSubscription
    if (this.reservationInfoSubscription) {
        this.reservationInfoSubscription.unsubscribe();
        console.log('Unsubscribed from reservationInfo query');
    }
  }

}
