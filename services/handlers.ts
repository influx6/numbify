import _ from 'lodash';
import { NumberStore, NumberStoreAll, NumberService, Errors } from './types';

const numberClean = /[_\W]+/g;
export const validateHandler = (db: NumberStore, api: NumberService) => {
  return async (req, res) => {
    const { number } = req.query;
    if (!number) {
      res.status(400)
      res.json({
        error: "number query parameter required",
      });
      return;
    }

    const cleanedNumber = number.replace(numberClean, '')
    if (!cleanedNumber || cleanedNumber.length === 0){
      res.status(400)
      res.json({
        error: "only valid numbers supported",
      });
      return;
    }

    try {
      let verifiedData;

      const hasNumber = await db.has(cleanedNumber);
      if (!hasNumber) {
        const numberData = await api.validate(cleanedNumber);
        verifiedData = await db.add(numberData);
      }else{
        verifiedData = await db.get(cleanedNumber)
      }

      res.status(200).json(verifiedData);
    } catch(e) {
      switch(e) {
        case Errors.InvalidCountryCode:
          res.status(400);
          res.json({
            error: "country code provided does not exists",
          });
          return;
        case Errors.InvalidUserData:
          res.status(400);
          res.json({
            error: "invalid data from user",
          });
          return;
        case Errors.AccessError:
        default:
          res.status(500);
          res.json({
            error: "service is unable to respond at the moment",
          });
          return;
      }
    }
  }
}

export const getValidations = (db: NumberStoreAll) => {
  return async (req, res) => {
    const records = await db.all();
    res.status(200).json(records);
  }
}
