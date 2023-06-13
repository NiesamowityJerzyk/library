export interface IUser {
  id: number;
  email: string;
  createdAt: string;
  updatedAt: string;
  role: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  avatarUrl: string;
  stripeCustomerId: string;
  stripeSubscriptionId: string;
  subscribedTo: Date;
  stripeSubscriptionCredits: number;
  stripeMaxSubscriptionCredits: number;
  stripeAdditionalCredits: number;
  facebookAccessToken: string;
  facebookAccessTokenExpirationDate: Date;
  facebookRefreshAccessTokenRetries: number;
}

export interface IResponseUser {
  user: IUser;
  token: string;
  refreshToken: string;
}

export interface IAuthTokens {
  token: string;
  refreshToken: string;
}

export interface IAuthToken {
  token: string;
}

export interface ILogin {
  email: string;
  password: string;
  betaTestToken: string;
}
