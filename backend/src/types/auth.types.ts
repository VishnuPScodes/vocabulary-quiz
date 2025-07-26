export interface IAuthBody {
  username: string;
  password: string;
  email: string;
}

export interface IAuthResponse {
  accessToken: string;
  refreshToken: string;
}
export interface IAuthError {
  message: string;
  statusCode: number;
}
export interface IAuthRequest {
  body: IAuthBody;
  headers: {
    authorization?: string;
  };
}
