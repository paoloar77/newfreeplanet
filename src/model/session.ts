import { IUserState } from '@src/model/UserStore'

export interface SessionState {
  redirectUri: string | null,
  timestamp: number | null,
  token: string | null,
  user: IUserState | null,
}

export interface CsrfCookie {
  message: string | null,
}

export interface AuthUser {
  redirectUri?: string | null,
  token?: string | null,
}

export interface LoginUser {
  email: string,
  password: string,
  'device_name': string,
  'remember_me': boolean,
}

export interface AuthResponse {
  token: string | null,
  user: IUserState | null,
}
