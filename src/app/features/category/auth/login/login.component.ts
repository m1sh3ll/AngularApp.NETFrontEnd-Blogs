import { Component } from '@angular/core';
import { LoginRequest } from '../models/login-request.model';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  model: LoginRequest;

  constructor(private authService: AuthService,
    private cookieService: CookieService,
    private router: Router
  ) {
    this.model = {
      username: '',
      password: ''
    };
  }

  onFormSubmit(): void {

  
    this.authService.login(this.model)
    .subscribe({
      next: (response) => { 
        //Set Auth Cookie
        this.cookieService.set('Authorization', `Bearer ${response.result.token}`,
          undefined, '/', undefined, true, 'Strict');

          //Set User
          this.authService.setUser({
            email: response.result.email,
            role: 'admin'
          })

          //Redirect Back to Home
          this.router.navigateByUrl('/');

      }});


    

    
  }




}
