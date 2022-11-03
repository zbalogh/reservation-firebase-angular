import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeskreservationEditorComponent } from './admin/deskreservation-editor/deskreservation-editor.component';
import { AdminSettingsComponent } from './admin/settings/settings.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { DeskreservationFormComponent } from './deskreservation/deskreservation-form/deskreservation-form.component';
import { DeskreservationComponent } from './deskreservation/deskreservation.component';

import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ShowReservationComponent } from './show-reservation/show-reservation.component';


/**
 * Routing definiation for pages/components
 */
const routes: Routes =
[
    // admin settings page
    {
      path: 'admin/settings',
      component: AdminSettingsComponent,
      canActivate: [AuthGuard],
    },

    // desk reservation editor for administrator
    {
      path: 'deskreservation-editor',
      component: DeskreservationEditorComponent,
      canActivate: [AuthGuard],
    },

    {
      path: 'login',
      component: LoginComponent
    },

    // show desk reservation by the identifier
    {
      path: 'show-reservation',
      component: ShowReservationComponent
    },

    // desk reservation form
    {
      path: 'deskreservation-form',
      component: DeskreservationFormComponent
    },

    // desk reservation (show list of avail and free desks)
    {
      path: 'deskreservation',
      component: DeskreservationComponent
    },

    // home component the default when open browser without path
    {
      path: '',
      component: HomeComponent
    },

    // last route entry for case when no matching, then we display 'page not found' component
    {
      path: '**',
      component: PageNotFoundComponent
    }
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
