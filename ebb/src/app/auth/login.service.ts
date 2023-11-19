import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Environment } from 'src/environments/environment';
import { LocalStorageService } from 'src/app/local-storage.service';
import { Amplify } from 'aws-amplify';
import {
  fetchAuthSession,
  CredentialsAndIdentityIdProvider,
  CredentialsAndIdentityId,
} from 'aws-amplify/auth';
import { jwtDecode } from 'jwt-decode';

// Note: This example requires installing `@aws-sdk/client-cognito-identity` to obtain Cognito credentials
// npm i @aws-sdk/client-cognito-identity
import { CognitoIdentity } from '@aws-sdk/client-cognito-identity';

// Note: The custom provider class must implement CredentialsAndIdentityIdProvider
class CustomCredentialsProvider implements CredentialsAndIdentityIdProvider {
  // Example class member that holds the login information
  federatedLogin?: {
    domain: string;
    token: string;
  };

  // Custom method to load the federated login information
  loadFederatedLogin(login?: typeof this.federatedLogin) {
    // You may also persist this by caching if needed
    this.federatedLogin = login;
  }

  async getCredentialsAndIdentityId(): Promise<any> {
    try {
      // You can add in some validation to check if the token is available before proceeding
      // You can also refresh the token if it's expired before proceeding
      if (this.federatedLogin) {
        const getIdResult = await cognitoidentity.getId({
          // Get the identityPoolId from config
          IdentityPoolId: Environment.COGNITO_CONFIG.identityPoolID,
          Logins: { [this.federatedLogin.domain]: this.federatedLogin.token },
        });

        const cognitoCredentialsResult =
          await cognitoidentity.getCredentialsForIdentity({
            IdentityId: getIdResult.IdentityId,
            Logins: { [this.federatedLogin.domain]: this.federatedLogin.token },
          });

        const credentials: CredentialsAndIdentityId = {
          credentials: {
            accessKeyId:
              cognitoCredentialsResult.Credentials?.AccessKeyId ?? '',
            secretAccessKey:
              cognitoCredentialsResult.Credentials?.SecretKey ?? '',
            sessionToken: cognitoCredentialsResult.Credentials?.SessionToken,
            expiration: cognitoCredentialsResult.Credentials?.Expiration,
          },
          identityId: getIdResult.IdentityId,
        };
        return credentials;
      }
      return new Promise((_) => {
        return undefined;
      }) as Promise<undefined>;
    } catch (e) {
      console.log('Error getting credentials: ', e);
    }
  }
  // Implement this to clear any cached credentials and identityId. This can be called when signing out of the federation service.
  clearCredentialsAndIdentityId(): void {}
}

// Create an instance of your custom provider
const customCredentialsProvider = new CustomCredentialsProvider();
Amplify.configure(
  {
    Auth: {
      Cognito: {
        userPoolId: Environment.COGNITO_CONFIG.userPoolID,
        userPoolClientId: Environment.COGNITO_CONFIG.webClientID,
      },
    },
  },
  {
    Auth: {
      // Supply the custom credentials provider to Amplify
      credentialsProvider: customCredentialsProvider,
    },
  }
);
// You can make use of the sdk to get identityId and credentials
const cognitoidentity = new CognitoIdentity({
  region: 'ap-south-1',
});
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService
  ) {
    Amplify.configure({
      Auth: {
        Cognito: {
          userPoolId: Environment.COGNITO_CONFIG.userPoolID,
          userPoolClientId: Environment.COGNITO_CONFIG.webClientID,
        },
      },
    });
    const token = this.localStorageService.getItem('token');
    this.isUserLoggedIn.next(!!token);
  }
  userSubject: BehaviorSubject<{ token: string }> = new BehaviorSubject({
    token: '',
  });
  currentUser$ = this.userSubject.asObservable();
  isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject(false);
  onLogginChange$ = this.isUserLoggedIn.asObservable();
  getUserValidation() {
    return !!this.localStorageService.getItem('token');
  }

  async signInWithGoogle() {
    if (window.google?.accounts) {
      window.google.accounts.id.initialize({
        client_id: Environment.GOOGLE_CLIENT_ID,
        callback: async (response: any) => {
          customCredentialsProvider.loadFederatedLogin({
            domain: 'accounts.google.com',
            token: response.credential,
          });
          const fetchSessionResult = await fetchAuthSession(); // will return the credentials
          console.log('fetchSessionResult: ', fetchSessionResult);
          this.localStorageService.setItem('token', response.credential);
          this.localStorageService.expTime = jwtDecode(response.credential);
          this.userSubject.next({
            token: response.credential,
          });
          this.isUserLoggedIn.next(true);
          return fetchSessionResult;
        },
      });
      window.google.accounts.id.renderButton(
        document.getElementById('googleSignInButton'),
        { theme: 'outline', size: 'large' }
      );
    }
  }
}

declare var window: any;
