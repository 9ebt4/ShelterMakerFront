import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError as observableThrowError, throwError } from 'rxjs';
import { GoogleUserDetailDTO } from '../models/google-user-detail-dto';
import { environment } from '../../environments/environment';
import { GoogleUserCreateDto } from '../models/google-user-create-dto';

@Injectable({
  providedIn: 'root'
})
export class GoogleUserService {

  constructor(private http:HttpClient) { }

  currentUser:GoogleUserDetailDTO = {} as GoogleUserDetailDTO;

  SetCurrentUser(u:GoogleUserDetailDTO){
    this.currentUser=u;
  }
  
  GetCurrentUser():GoogleUserDetailDTO{
    return this.currentUser;
  }

  GetGoogleUserByGoogleToken(googleToken:string):Observable<GoogleUserDetailDTO>{
    return this.http.get<GoogleUserDetailDTO>(`${environment.baseUrl}GoogleUser/googleid/${googleToken}`)
    .pipe(
      catchError(this.handleError)
    );
  }
  
  CreateGoogleUser(userDTO:GoogleUserCreateDto):Observable<any>{
    return this.http.post(`${environment.baseUrl}GoogleUser`, userDTO)
    .pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error("Service log - Error object:", error);

    // Optionally prepare a user-friendly message or specific error details
    let errorMessage = 'Something bad happened; please try again later.';
    if (error.error instanceof ErrorEvent) {
        // Client-side error
        errorMessage = `Client-side error: ${error.error.message}`;
    } else {
        // Server-side error
        errorMessage = `Server error: ${error.status}, message: ${error.message}`;
    }

    // Throw an error with both the message and the complete original error
    return throwError(() => new Error(errorMessage));
}
}
