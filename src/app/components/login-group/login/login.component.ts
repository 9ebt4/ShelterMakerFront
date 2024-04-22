import {GoogleSigninButtonModule, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GoogleUserService } from '../../../services/google-user.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [GoogleSigninButtonModule, NgbModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  user: SocialUser = {} as SocialUser;
  loggedIn: boolean = false;


  constructor(private socialAuthServiceConfig: SocialAuthService, private GoogleUserService:GoogleUserService, private router:Router) { }
 
  ngOnInit() {
    //authState is a custom observable that will run again any time changes are noticed.
    this.socialAuthServiceConfig.authState.subscribe((userResponse: SocialUser) => {
      this.user = userResponse;
      console.log(this.user);
      
      //if login fails, it will return null.
      this.loggedIn = (userResponse != null);
      this.loadUser(this.user.id)
    });
  }
  //login component doesn't account for logging out.
  signOut(): void {
    this.socialAuthServiceConfig.signOut();
  }

  loadUser(googleToken: string) {
    this.GoogleUserService.GetGoogleUserByGoogleToken(googleToken).subscribe({
      next: (googleUser) => {
        // Handle the user data
        console.log(googleUser);

        this.GoogleUserService.SetCurrentUser(googleUser);

        if(googleUser.associateId != null && googleUser.associateIsActive == true && googleUser.facilityId != null && googleUser.facilityIsActive == true){
          this.router.navigate(['/home']);
        }
        else if (googleUser.facilityId == null || googleUser.facilityIsActive == false){
          this.router.navigate(['/login-failed'])
        }
        else if(googleUser.associateId==null || googleUser.associateIsActive == false){
          this.router.navigate(['/login-failed'])
        }
        
        else{

        }
      },
      error: (err:Error) => {
        // Handle the error
        console.log("Component log - Error object:", err.message);
        this.handleError(err);
      }
    });
  }
  private handleError(error: Error) {
    console.error("Error object component", error);
    // Check specific error types or messages
    if (error.message.includes('404')) {
      // Redirect or show a not found message
      console.log(this.user.id);
      console.log("this is a 404 error");
      this.router.navigate(['/logincode']);
    } else {
      // General error handling
      alert(error.message);
    }
  }

}
