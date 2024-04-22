import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { environment } from '../environments/environment';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ShelterMakerFront';

  user: SocialUser = {} as SocialUser;
  loggedIn: boolean = false;

  constructor(private socialAuthServiceConfig: SocialAuthService, private router:Router) { }
 
  ngOnInit() {
    if(!this.loggedIn){
      //this.router.navigate(['']);
    }
    //authState is a custom observable that will run again any time changes are noticed.
    this.socialAuthServiceConfig.authState.subscribe((userResponse: SocialUser) => {
      this.user = userResponse;
      //if login fails, it will return null.
      this.loggedIn = (userResponse != null);
    });
  }

}
