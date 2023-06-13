import { BaseLoginProvider, SocialUser } from '@abacritt/angularx-social-login';

declare let AppleID: any;

export class AppleLoginProvider extends BaseLoginProvider {
  public static readonly PROVIDER_ID: string = 'APPLE';

  protected auth2: any;

  constructor(private clientId: string, private _initOptions: any = { scope: 'email name' }) {
    super();
  }

  public initialize(): Promise<void> {
    return new Promise((resolve, _reject) => {
      this.loadScript(
        AppleLoginProvider.PROVIDER_ID,
        'https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js',
        () => {
          AppleID.auth.init({
            clientId: this.clientId,
            scope: 'name email',
            redirectURI: 'https://' + window.location.host + '/auth',
            state: '[ANYTHING]', //used to prevent CSFR
            usePopup: true,
          });
          resolve();
        },
      );
    });
  }

  public getLoginStatus(): Promise<any> {
    return new Promise((resolve, reject) => {
      // todo: implement
      resolve(null);
    });
  }

  public async signIn(signInOptions?: any): Promise<any> {
    try {
      return await AppleID.auth.signIn();
    } catch (er) {
      console.log(er);
    }
  }

  public signOut(revoke?: boolean): Promise<any> {
    return new Promise((resolve, reject) => {
      // AppleID doesnt have revoke method
      resolve(null);
    });
  }
}
