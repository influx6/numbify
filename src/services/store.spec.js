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
const nedb_1 = __importDefault(require("nedb"));
const store_1 = __importDefault(require("./store"));
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
describe("Test: NumberInMemoryStore.all with filter", () => {
    const db = new nedb_1.default();
    const otherNumber = `56421911`;
    const otherNumberWithCountry = `852${otherNumber}`;
    const store = new store_1.default(db);
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield store.add(sampleData);
        yield store.add(Object.assign(Object.assign({}, sampleData), { valid: false, local_format: otherNumber, number: otherNumberWithCountry, international_format: `+${otherNumberWithCountry}` }));
    }));
    describe("When retrieving only invalid results from store ", () => {
        var result;
        beforeAll(() => {
            result = store.all(false);
        });
        test("should retrieved one record", () => __awaiter(void 0, void 0, void 0, function* () {
            const records = yield result;
            expect(records).toHaveLength(1);
            expect(records[0].number).toEqual(otherNumberWithCountry);
        }));
    });
    describe("When retrieving all valid results from store ", () => {
        var result;
        beforeAll(() => {
            result = store.all(true);
        });
        test("should retrieved one record", () => __awaiter(void 0, void 0, void 0, function* () {
            const records = yield result;
            expect(records).toHaveLength(1);
            expect(records[0].number).toEqual(sampleData.number);
        }));
    });
});
describe("Test: NumberInMemoryStore.all", () => {
    const db = new nedb_1.default();
    const store = new store_1.default(db);
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield store.add(sampleData);
    }));
    describe("When retrieving all results from store", () => {
        var result;
        beforeAll(() => {
            result = store.all();
        });
        test("should have resolved successfully", () => {
            expect(result).resolves.toBeTruthy();
        });
        test("should retrieved one record", () => __awaiter(void 0, void 0, void 0, function* () {
            const records = yield result;
            expect(records).toHaveLength(1);
        }));
    });
});
describe("Test: NumberInMemoryStore.add", () => {
    const db = new nedb_1.default();
    const store = new store_1.default(db);
    describe("When adding a number into the store", () => {
        var result;
        beforeAll(() => {
            result = store.add(sampleData);
        });
        test("should have resolved successfully", () => {
            expect(result).resolves.toBeTruthy();
        });
        test("should have added number successfully", () => __awaiter(void 0, void 0, void 0, function* () {
            const saved = yield result;
            const { _id } = saved;
            expect(saved).toEqual(Object.assign(Object.assign({}, sampleData), { _id }));
        }));
    });
    describe("When adding a duplicate number into the store", () => {
        var result;
        beforeAll(() => {
            result = store.add(sampleData);
        });
        test("should have resolved successfully", () => {
            expect(result).rejects.toThrow();
        });
    });
});
describe("Test: NumberInMemoryStore.has", () => {
    const db = new nedb_1.default();
    const store = new store_1.default(db);
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield store.add(sampleData);
    }));
    describe("When retrieving a number from the store", () => {
        let result;
        beforeAll(() => {
            result = store.has(sampleData.number);
        });
        test("should have resolved with true", () => __awaiter(void 0, void 0, void 0, function* () {
            const hasData = yield result;
            expect(hasData).toEqual(true);
        }));
    });
    describe("When retrieving a number not existing from the store", () => {
        let result;
        beforeAll(() => {
            result = store.has('4332323232');
        });
        test("should have resolved with false", () => __awaiter(void 0, void 0, void 0, function* () {
            const hasData = yield result;
            expect(hasData).toEqual(false);
        }));
    });
});
describe("Test: NumberInMemoryStore.get", () => {
    const db = new nedb_1.default();
    const store = new store_1.default(db);
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield store.add(sampleData);
    }));
    describe("When retrieving a number from the store", () => {
        let result;
        beforeAll(() => {
            result = store.get(sampleData.number);
        });
        test("should have resolved successfully", () => {
            expect(result).resolves.toBeTruthy();
        });
        test("should have retrieved number's data", () => __awaiter(void 0, void 0, void 0, function* () {
            const saved = yield result;
            const { _id } = saved;
            expect(saved).toEqual(Object.assign(Object.assign({}, sampleData), { _id }));
        }));
    });
    describe("When retrieving a number not existing from the store", () => {
        var result;
        beforeAll(() => {
            result = store.get('4332323232');
        });
        test("should have reject with an error", () => {
            expect(result).rejects.toThrow('not found');
        });
    });
});
