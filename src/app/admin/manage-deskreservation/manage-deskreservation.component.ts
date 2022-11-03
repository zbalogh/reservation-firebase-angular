import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable, Subscription } from 'rxjs';

import firebase from 'firebase/app';
import Timestamp = firebase.firestore.Timestamp;

import { FirebaseService } from 'src/app/services/firebase.service';
import { DeskReservation } from './../../model/reservation.model';

@Component({
  selector: 'app-manage-deskreservation',
  templateUrl: './manage-deskreservation.component.html',
  styleUrls: ['./manage-deskreservation.component.scss']
})
export class ManageDeskreservationComponent implements OnInit, OnDestroy {

  reservationList: DeskReservation[] = [];

  reservationLoadedSubscription?: Subscription;

  modalRef?: BsModalRef;

  selectedItem: DeskReservation | null = null;

  constructor(
    private modalService: BsModalService,
    private firebaseService: FirebaseService
  ) {}

  loadData() {
      // load all reservations from the firebase database
      this.reservationLoadedSubscription = this.firebaseService.getReservations().subscribe(
        (data: DeskReservation[]) => {
          console.log('Reservation list retrived from firebase collection.');
          this.reservationList = data;
        }
      );
  }

  ngOnInit() {
      // load data if necessary
      this.loadData();
  }

  ngOnDestroy() {
    // unsubscribe from the reservation loaded observable
    if (this.reservationLoadedSubscription) {
        this.reservationLoadedSubscription.unsubscribe();
    }
  }

  getReservationDate(reservation: DeskReservation): Date
  {
    // firebase returns datetime as JS Timestamp object,
    // so we have to convert it to Angular Date object
    let ts = reservation.reservationAt as Timestamp;
    return ts.toDate();
  }

  deleteReservation(reservation: DeskReservation, template: TemplateRef<any>)
  {
    // set the selectedItem
    this.selectedItem = reservation;
    // open confirm modal
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void
  {
    this.modalRef!.hide();
    // in this point the selected item should not be null as well as 'id' attribute
    const rid = this.selectedItem!.id!;
    console.log('Delete reservation by ID: ' + rid);
    
    this.firebaseService.deleteReservation(rid)
    .then(() => {
      // reset the selectedItem
      this.selectedItem = null;
    });
  }

  decline(): void
  {
    // reset the selectedItem
    this.selectedItem = null;
    this.modalRef!.hide();
  }

}
