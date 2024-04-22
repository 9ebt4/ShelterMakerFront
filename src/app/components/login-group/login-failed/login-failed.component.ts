import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-failed',
  standalone: true,
  imports: [],
  templateUrl: './login-failed.component.html',
  styleUrl: './login-failed.component.css'
})
export class LoginFailedComponent {

  user: SocialUser = {} as SocialUser;
  loggedIn: boolean = false;
 
  constructor(private socialAuthServiceConfig: SocialAuthService, private router:Router) { }
  
  ngOnInit() {
   
    //authState is a custom observable that will run again any time changes are noticed.
    this.socialAuthServiceConfig.authState.subscribe((userResponse: SocialUser) => {
      this.user = userResponse;
    
      //if login fails, it will return null.
      this.loggedIn = (userResponse != null);
  
      
    });
  }

  signOut(): void {
    this.socialAuthServiceConfig.signOut();
    this.router.navigate(['']);
  }
  
}
