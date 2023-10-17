import { NgModule } from '@angular/core';

import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';
import {
  SocialLoginModule,
} from '@abacritt/angularx-social-login';

@NgModule({
  imports: [AuthRoutingModule, SharedModule, SocialLoginModule],
})
export class AuthModule {}
