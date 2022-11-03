import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { FirebaseService } from 'src/app/services/firebase.service';
import { DeskReservation } from './../../model/reservation.model';

@Component({
  selector: 'app-deskreservation-editor',
  templateUrl: './deskreservation-editor.component.html',
  styleUrls: ['./deskreservation-editor.component.scss']
})
export class DeskreservationEditorComponent implements OnInit, OnDestroy {

  // it is the desk ID in the database
  id: string | null = '';

  // it is the desk number retrieved from the query parameters
  desknumber: string | null = '';

  // it is 'true' if this page is running in 'editor mode'
  editor = false;

  // it is true if the form is submitted
  submitted = false;

  // it represents the model object for the form
  deskReservation: DeskReservation = {} as DeskReservation;

  // subscription
  reservationSubscription?: Subscription;


  constructor(
    private route: ActivatedRoute,
    private firebaseService: FirebaseService
  ) {}

  ngOnInit() {
    // get the desk ID
    this.id = this.route.snapshot.queryParamMap.get('id');

    // get the desk number
    this.desknumber = this.route.snapshot.queryParamMap.get('desknumber');

    // get the editor mode (optional)
    this.editor = this.route.snapshot.queryParamMap.get('editor') === 'true';

    // get the selected reservation from the store by the given ID
    if (this.id) {
      this.loadDeskReservation(this.id);
    }
    else {
      console.log('Unable to get reservation because the id parameter is null.');
    }
  }

  loadDeskReservation(reservationID: string): void
  {
      this.reservationSubscription = this.firebaseService.getReservationById(reservationID)
      .subscribe(
        (data) => {
          if (data) {
              //console.log('Reservation data found with the given ID: ' + reservationID + ' | ' + JSON.stringify(data));
              // create a copy from the "data" and assign it to the "deskReservation"
              this.deskReservation = {...data};
          } else {
              console.log('No reservation data found with the given ID: ' + reservationID);
          }
        },
        (error) => {
            console.log('Error while getting reservation with the given ID: ' + reservationID + ' | ' + error);
        }
      );
  }

  ngOnDestroy()
  {
    // unsubscribe
    if (this.reservationSubscription) {
      this.reservationSubscription.unsubscribe();
    }
  }

  /**
   * This method handles the form submit event
   */
  onSubmit(reservationForm: NgForm)
  {
      // if the form is invalid then return
      if (!reservationForm.form.valid) {
          return;
      }

      this.firebaseService.updateDeskReservation(this.deskReservation.id!, this.deskReservation)
      .then(() => {
          // set the 'submitted' flag
          this.submitted = true;
      })
      .catch((error) => {
          console.log('error while saving the desk reservation: ' + error);
      });
  }

}
