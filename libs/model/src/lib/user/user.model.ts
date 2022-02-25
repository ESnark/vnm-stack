export interface User {
  id?: number;
  name: string;
  password: string;
  email: string;
  role: string;
  sub?: string | number;
  currentHashedRefreshToken?: string;
}

export type LoginDto = Pick<User, 'name' | 'password'>

export type TokenPayload = Omit<User, 'password'>

export enum UserRole {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  CUSTOMER = 'CUSTOMER',
  GUEST = 'GUEST'
}
