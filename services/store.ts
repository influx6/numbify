import _ from 'lodash';
import DataStore from 'nedb';
import { Data, StoredData } from '../shared/types';

export default class NumberInMemoryStore {
  _db: DataStore;

  constructor(store: DataStore){
    this._db = store;
    this._db.ensureIndex({ fieldName: 'valid' });
    this._db.ensureIndex({ fieldName: 'number', unique: true });
  }
  
  // all resolves with all data in store.
  all = async (valid?: any): Promise<Data[]> => {
    let filter = {}
    if (_.isBoolean(valid)) {
      filter = { valid: valid ? 1 : 0 }
    }

    return new Promise((resolve, reject) => {
      this._db.find(filter, (err: Error, docs: StoredData[]) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(docs.map((dd: StoredData) => {
          return { ...dd, valid: dd.valid === 1 };
        }));
      })
    });
  }

  // add resolves with provided data and _id (default index)
  // for data.
  add = async (d: Data): Promise<Data> => {
    return new Promise((resolve, reject) => {
      this._db.insert({...d, valid: d.valid ? 1 : 0}, (err, doc) => {
        if (err) {
          reject(err);
          return;
        }
        resolve({ ...doc, valid: doc.valid === 1});
      })
    });
  }

  // get resolves with data associated with giving number
  // if in store else `not found` error if not found. 
  get = async (number: string): Promise<Data> => {
    return new Promise((resolve, reject) => {
      this._db.findOne({ number }, (err, doc: StoredData|null) => {
        if (err) {
          reject(err);
          return;
        }
        if (doc == null) {
          reject(new Error('not found'))
          return;
        }
        resolve({...doc, valid: doc.valid === 1});
      })
    });
  }

  // has resolves true/false if giving number is in store.
  has = async (number: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      this._db.findOne({ number }, (err, doc: StoredData|null) => {
        if (err) {
          reject(err);
          return;
        }
        if (!doc) {
          resolve(false);
          return;
        }
        resolve(true);
      })
    });
  }
}
