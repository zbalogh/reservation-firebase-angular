import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'reservation-firebase-gui';

  constructor(private translate: TranslateService,
              private authService: AuthService,
              private titleService: Title)
  {
    // add the supported languages
    translate.addLangs(['en', 'hu']);

    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|hu/) ? browserLang : 'en');

    // set the title for the browser
    translate.get('headtitle').subscribe( str => {
    // set the title
    titleService.setTitle(str);
    });
  }

  isLoggedin() {
    return this.authService.isUserLoggedIn();
  }

}
