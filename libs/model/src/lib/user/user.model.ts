export interface User {
  id: number;
  name: string;
  password: string;
  email?: string;
  role: string;
  currentHashedRefreshToken?: string;
}

export type LoginDto = Pick<User, 'name' | 'password'>

export enum UserRole {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  CUSTOMER = 'CUSTOMER',
  GUEST = 'GUEST'
}
