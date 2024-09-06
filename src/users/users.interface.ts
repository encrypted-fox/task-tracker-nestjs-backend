export interface User {
  id: number,
  username: string,
  password: string,
  email: string,

  phone?: string,

  firstName?: string,
  middleName?: string,
  lastName?: string,

  avatar?: string,
  description?: string,

  roles: string,
}

export interface AuthUser {
  username: string,
  email: string,

  phone?: string,

  firstName?: string,
  middleName?: string,
  lastName?: string,

  avatar?: string,
  description?: string,

  token?: string
}