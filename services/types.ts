import { Data } from '../shared/types';

export const Errors = {
  InvalidCountryCode: new Error('invalid country code from user'),
  InvalidUserData: new Error('invalid data from user'),
  AccessError: new Error('access error'),
}

export interface NumberService {
  validate(number: string): Promise<Data>
}

export interface NumberStoreAll {
  all(): Promise<Data[]>
}

export interface NumberStore extends NumberStoreAll {
  add(d: Data): Promise<Data>
  get(number: string): Promise<Data>
  has(number: string): Promise<boolean>
}
