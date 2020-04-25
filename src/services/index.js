"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handlers_1 = require("./handlers");
exports.default = (db, api, router) => {
    router.get('/validations', handlers_1.getValidations(db));
    router.get('/validate', handlers_1.validateHandler(db, api));
    return router;
};
