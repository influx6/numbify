import axios from 'axios';
import { Errors } from './types';
import { Data } from '../shared/types';

const NumVerifyURL = 'http://apilayer.net/api';

export default class NumVerify {
  token: string;

  constructor(token: string){
    this.token = token;
  }

  validate = async (number: string): Promise<Data> => {
    if (!number.length){
      throw new Error('empty argument is not allowed');
    }

    const res = await axios.get(`/validate`, {
      baseURL: NumVerifyURL,
      responseType: 'json',
      params: {
        number,
        access_key: this.token,
      },
      timeout: 5000,
    }) 

    const { error }  = res.data
    if (!error){
      console.log(`[HTTP Request] | ${NumVerifyURL} | /validate?number=${number} | ${res.status} | ${JSON.stringify(res.data)}`);
    }

    if (error){
      console.log(`[HTTP Request] | ${NumVerifyURL} | /validate?number=${number} | ${error.code} | ${JSON.stringify(res.data)}`);

      switch (error.code){
        case 210: {
          throw Errors.InvalidUserData;
        }
        case 310: {
          throw Errors.InvalidCountryCode;
        }
        case 211: {
          throw Errors.InvalidUserData;
        }
        default: {
          throw Errors.AccessError;
        }
      }
      
    }

    return res.data;
  }
}
