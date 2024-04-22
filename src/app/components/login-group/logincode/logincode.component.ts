import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { GoogleUserCreateDto } from '../../../models/google-user-create-dto';
import { GoogleUserService } from '../../../services/google-user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-logincode',
  standalone: true,
  imports: [FormsModule, RouterModule,CommonModule],
  templateUrl: './logincode.component.html',
  styleUrl: './logincode.component.css'
})
export class LogincodeComponent {
isFailed:boolean = false;
buildingCode:string="";

user: SocialUser = {} as SocialUser;
loggedIn: boolean = false;
googleUserCreate: GoogleUserCreateDto = {} as GoogleUserCreateDto
constructor(private socialAuthServiceConfig: SocialAuthService, private router:Router, private GoogleUserService:GoogleUserService) { }

ngOnInit() {
 
  //authState is a custom observable that will run again any time changes are noticed.
  this.socialAuthServiceConfig.authState.subscribe((userResponse: SocialUser) => {
    this.user = userResponse;
    this.googleUserCreate.email = this.user.email;
    this.googleUserCreate.firstName = this.user.firstName;
    this.googleUserCreate.lastName = this.user.lastName;
    this.googleUserCreate.googleToken = this.user.id;
    //if login fails, it will return null.
    this.loggedIn = (userResponse != null);

    
  });
}


CreateGoogleUser()
{
  this.googleUserCreate.facilityPasscode = this.buildingCode;
  this.GoogleUserService.CreateGoogleUser(this.googleUserCreate).subscribe({
    next:(response:any)=>{
      this.router.navigate([`/login-failed`])
      },
    error:(error)=>{
      this.handleError(error);
      
    }
  });
}

private handleError(error: Error) {
  console.error("Error object component", error);
  // Check specific error types or messages
  if (error.message.includes('404')) {
    // Redirect or show a not found message
    
    this.isFailed = true;
    console.log("this is a 404 error")
    this.buildingCode ="";
  } else {
    // General error handling
    alert(error.message);
  }
}
}
