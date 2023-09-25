import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { LoginService } from '../login.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { Environment } from 'src/environments/environment';

@Component({
  standalone: true,
  imports: [SharedModule, HttpClientModule],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  clientId!: string;
  loginURI!: string;
  constructor(private loginService: LoginService,
    private socialAuthService: SocialAuthService,) {
    this.clientId = Environment.GOOGLE_CLIENT_ID;
    this.loginURI = Environment.GOOGLE_LOGIN_URI;
    (<any>window).login = (user: any) => {
      this.loginService.userSubject.next(user);
      this.loginService.getUserValidation(user.credential).subscribe((user)=>{
        console.log('authenticated');
      });
    }

    this.socialAuthService.authState.subscribe((user) => {
      this.loginService.userSubject.next(user);
    });
  }

  login() {
    console.log("login");
  }
}
