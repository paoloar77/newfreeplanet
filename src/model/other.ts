export interface IToken {
  access: string
  // browser: string
  token: string
  data_login: Date
}

export interface ILinkReg {
  idlink: string
}

export interface ICallResult {
  code?: string
  msg?: string
}

export interface IIdToken {
  x_auth_token: string
}

export interface IResult {
  status: number
  statusText: string
}
