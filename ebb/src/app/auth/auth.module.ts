import { NgModule } from '@angular/core';

import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';
import {
  SocialLoginModule,
  GoogleLoginProvider,
} from '@abacritt/angularx-social-login';
import { Environment } from '../../environments/environment';
import { httpInterceptorProviders } from './http-interceptors';

@NgModule({
  imports: [AuthRoutingModule, SharedModule, SocialLoginModule],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: true,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(Environment.GOOGLE_CLIENT_ID),
          },
        ],
      },
    },
    httpInterceptorProviders,
  ],
})
export class AuthModule {}
