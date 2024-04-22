import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { GoogleUserCreateDto } from '../../models/google-user-create-dto';
import { Router } from '@angular/router';
import { GoogleUserService } from '../../services/google-user.service';
import { GoogleUserDetailDTO } from '../../models/google-user-detail-dto';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {


  user: SocialUser = {} as SocialUser;
  display:boolean = false;
loggedIn: boolean = false;
googleUser: GoogleUserDetailDTO = {} as GoogleUserDetailDTO
constructor(private socialAuthServiceConfig: SocialAuthService, private router:Router, private GoogleUserService:GoogleUserService) { }

ngOnInit() {
 
  //authState is a custom observable that will run again any time changes are noticed.
  this.socialAuthServiceConfig.authState.subscribe((userResponse: SocialUser) => {
    this.user = userResponse;
    //if login fails, it will return null.
    this.loggedIn = (userResponse != null);
    
    this.googleUser=this.GoogleUserService.GetCurrentUser();
    if(this.googleUser.associateId != null && this.googleUser.associateIsActive == true && this.googleUser.facilityId != null && this.googleUser.facilityIsActive == true){
      this.display=true;
    }
    else{
      this.display=false;
    }
  });

  
}
}
