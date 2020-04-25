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
const axios_1 = __importDefault(require("axios"));
const types_1 = require("./types");
const NumVerifyURL = 'http://apilayer.net/api';
class NumVerify {
    constructor(token) {
        this.validate = (number) => __awaiter(this, void 0, void 0, function* () {
            if (!number.length) {
                throw new Error('empty argument is not allowed');
            }
            const res = yield axios_1.default.get(`/validate`, {
                baseURL: NumVerifyURL,
                responseType: 'json',
                params: {
                    number,
                    access_key: this.token,
                },
                timeout: 5000,
            });
            const { error } = res.data;
            if (!error) {
                console.log(`[HTTP Request] | ${NumVerifyURL} | /validate?number=${number} | ${res.status} | ${JSON.stringify(res.data)}`);
            }
            if (error) {
                console.log(`[HTTP Request] | ${NumVerifyURL} | /validate?number=${number} | ${error.code} | ${JSON.stringify(res.data)}`);
                switch (error.code) {
                    case 210: {
                        throw types_1.Errors.InvalidUserData;
                    }
                    case 310: {
                        throw types_1.Errors.InvalidCountryCode;
                    }
                    case 211: {
                        throw types_1.Errors.InvalidUserData;
                    }
                    default: {
                        throw types_1.Errors.AccessError;
                    }
                }
            }
            return res.data;
        });
        this.token = token;
    }
}
exports.default = NumVerify;
