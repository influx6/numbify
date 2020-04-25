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
const handlers_1 = require("./handlers");
const sampleData = {
    valid: true,
    number: "85251420926",
    local_format: "51420926",
    international_format: "+85251420926",
    country_prefix: "+852",
    country_code: "HK",
    country_name: "Hong Kong, China",
    location: "",
    carrier: "China Mobile (Hong Kong) Company Ltd (CMHK)",
    line_type: "mobile",
};
describe('Test: Handlers.validateHandler', () => {
    const mockStore = {
        all: jest.fn(),
        has: jest.fn(),
        get: jest.fn(),
        add: jest.fn(),
    };
    const mockAPI = {
        validate: jest.fn(),
    };
    const mockResponse = {
        status: jest.fn(),
        json: jest.fn(),
    };
    const mockRequest = {
        query: {
            number: '',
        },
    };
    const handler = handlers_1.validateHandler(mockStore, mockAPI);
    describe("When handler receives invalid number", () => {
        test("should be able to validate number", () => __awaiter(void 0, void 0, void 0, function* () {
            mockResponse.status.mockClear();
            mockResponse.json.mockClear();
            mockRequest.query.number = null;
            yield handler(mockRequest, mockResponse);
            expect(mockResponse.status.mock.calls[0][0]).toEqual(400);
        }));
    });
    describe("When handler receives invalid number", () => {
        test("should be able to validate number", () => __awaiter(void 0, void 0, void 0, function* () {
            mockResponse.status.mockClear();
            mockResponse.json.mockClear();
            mockRequest.query.number = '';
            yield handler(mockRequest, mockResponse);
            expect(mockResponse.status.mock.calls[0][0]).toEqual(400);
        }));
    });
});
describe('Test: Handlers.getValidations', () => {
    test("should be able to retrieve all validations", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = [sampleData, sampleData];
        const mockStore = {
            all: () => Promise.resolve(res)
        };
        let status, body;
        const mockResponse = {
            status: (s) => {
                status = s;
                return mockResponse;
            },
            json: (b) => {
                body = b;
            },
        };
        const handler = handlers_1.getValidations(mockStore);
        yield handler({}, mockResponse);
        expect(status).toEqual(200);
        expect(body).toEqual(res);
    }));
});
