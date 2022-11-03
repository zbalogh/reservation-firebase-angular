import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalModule } from 'ngx-bootstrap/modal';

import { TranslateModule } from '@ngx-translate/core';
import { TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DeskreservationComponent } from './deskreservation/deskreservation.component';
import { DeskreservationFormComponent } from './deskreservation/deskreservation-form/deskreservation-form.component';
import { ShowReservationComponent } from './show-reservation/show-reservation.component';
import { LoginComponent } from './auth/login/login.component';
import { AdminSettingsComponent } from './admin/settings/settings.component';
import { ManageDeskreservationComponent } from './admin/manage-deskreservation/manage-deskreservation.component';
import { DeskreservationEditorComponent } from './admin/deskreservation-editor/deskreservation-editor.component';


/**
 * Factory function for tranlator in order to create a HTTP loader to load language files.
 */
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    PageNotFoundComponent,
    DeskreservationComponent,
    DeskreservationFormComponent,
    ShowReservationComponent,
    AdminSettingsComponent,
    ManageDeskreservationComponent,
    DeskreservationEditorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    ModalModule.forRoot(),
    TranslateModule.forRoot({
      // customize the translate loader: how to download the language files
      loader: {
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [HttpClient]
      }
    }),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    // our routing module provides the routing for pages/components
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
