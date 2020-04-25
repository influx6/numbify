import * as express from 'express';

import { NumberStore, NumberService } from './types'
import { validateHandler, getValidations } from './handlers'

export default (db: NumberStore, api: NumberService, router: express.Router) => {
  router.get('/validations', getValidations(db));
  router.get('/validate', validateHandler(db, api));
  return router
}

