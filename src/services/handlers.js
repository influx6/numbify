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
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
const numberClean = /[_\W]+/g;
exports.validateHandler = (db, api) => {
    return (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { number } = req.query;
        if (!number) {
            res.status(400);
            res.json({
                error: "number query parameter required",
            });
            return;
        }
        const cleanedNumber = number.replace(numberClean, '');
        if (!cleanedNumber || cleanedNumber.length === 0) {
            res.status(400);
            res.json({
                error: "only valid numbers supported",
            });
            return;
        }
        try {
            let verifiedData;
            const hasNumber = yield db.has(cleanedNumber);
            if (!hasNumber) {
                const numberData = yield api.validate(cleanedNumber);
                verifiedData = yield db.add(numberData);
            }
            else {
                verifiedData = yield db.get(cleanedNumber);
            }
            res.status(200).json(verifiedData);
        }
        catch (e) {
            switch (e) {
                case types_1.Errors.InvalidCountryCode:
                    res.status(400);
                    res.json({
                        error: "country code provided does not exists",
                    });
                    return;
                case types_1.Errors.InvalidUserData:
                    res.status(400);
                    res.json({
                        error: "invalid data from user",
                    });
                    return;
                case types_1.Errors.AccessError:
                default:
                    res.status(500);
                    res.json({
                        error: "service is unable to respond at the moment",
                    });
                    return;
            }
        }
    });
};
exports.getValidations = (db) => {
    return (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const records = yield db.all();
        res.status(200).json(records);
    });
};
