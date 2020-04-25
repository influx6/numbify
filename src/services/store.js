"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
class NumberInMemoryStore {
    constructor(store) {
        // all resolves with all data in store.
        this.all = (valid) => __awaiter(this, void 0, void 0, function* () {
            let filter = {};
            if (lodash_1.default.isBoolean(valid)) {
                filter = { valid: valid ? 1 : 0 };
            }
            return new Promise((resolve, reject) => {
                this._db.find(filter, (err, docs) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(docs.map((dd) => {
                        return Object.assign(Object.assign({}, dd), { valid: dd.valid === 1 });
                    }));
                });
            });
        });
        // add resolves with provided data and _id (default index)
        // for data.
        this.add = (d) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this._db.insert(Object.assign(Object.assign({}, d), { valid: d.valid ? 1 : 0 }), (err, doc) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(Object.assign(Object.assign({}, doc), { valid: doc.valid === 1 }));
                });
            });
        });
        // get resolves with data associated with giving number
        // if in store else `not found` error if not found. 
        this.get = (number) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this._db.findOne({ number }, (err, doc) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    if (doc == null) {
                        reject(new Error('not found'));
                        return;
                    }
                    resolve(Object.assign(Object.assign({}, doc), { valid: doc.valid === 1 }));
                });
            });
        });
        // has resolves true/false if giving number is in store.
        this.has = (number) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this._db.findOne({ number }, (err, doc) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    if (!doc) {
                        resolve(false);
                        return;
                    }
                    resolve(true);
                });
            });
        });
        this._db = store;
        this._db.ensureIndex({ fieldName: 'valid' });
        this._db.ensureIndex({ fieldName: 'number', unique: true });
    }
}
exports.default = NumberInMemoryStore;
