import Nedb from 'nedb';

import NumberInMemoryStore from './store';
import { Data } from '../shared/types';

const sampleData: Data = {
  valid:true,
  number:"85251420926",
  local_format:"51420926",
  international_format:"+85251420926",
  country_prefix:"+852",
  country_code:"HK",
  country_name:"Hong Kong, China",
  location:"",
  carrier:"China Mobile (Hong Kong) Company Ltd (CMHK)",
  line_type:"mobile",
}

describe("Test: NumberInMemoryStore.all with filter", () => {
  const db = new Nedb();
  const otherNumber = `56421911`
  const otherNumberWithCountry = `852${otherNumber}`
  const store = new NumberInMemoryStore(db);

  beforeAll(async () => {
    await store.add(sampleData);
    await store.add({ 
      ...sampleData, 
      valid: false,
      local_format: otherNumber,
      number: otherNumberWithCountry, 
      international_format: `+${otherNumberWithCountry}`,
    });
  });

  describe("When retrieving only invalid results from store ", () => {
    var result;
    beforeAll(() => {
      result = store.all(false);
    });

    test("should retrieved one record", async () => {
      const records = await result;
      expect(records).toHaveLength(1)
      expect(records[0].number).toEqual(otherNumberWithCountry);
    });
  })

  describe("When retrieving all valid results from store ", () => {
    var result;
    beforeAll(() => {
      result = store.all(true);
    });

    test("should retrieved one record", async () => {
      const records = await result;
      expect(records).toHaveLength(1)
      expect(records[0].number).toEqual(sampleData.number);
    });
  })
})

describe("Test: NumberInMemoryStore.all", () => {
  const db = new Nedb();
  const store = new NumberInMemoryStore(db);

  beforeAll(async () => {
    await store.add(sampleData);
  });

  describe("When retrieving all results from store", () => {
    var result;
    beforeAll(() => {
      result = store.all();
    });

    test("should have resolved successfully", () => {
      expect(result).resolves.toBeTruthy();
    });

    test("should retrieved one record", async () => {
      const records = await result;
      expect(records).toHaveLength(1)
    });
  })
})

describe("Test: NumberInMemoryStore.add", () => {
  const db = new Nedb();
  const store = new NumberInMemoryStore(db);

  describe("When adding a number into the store", () => {
    var result;
    beforeAll(() => {
      result = store.add(sampleData);
    });

    test("should have resolved successfully", () => {
      expect(result).resolves.toBeTruthy();
    });

    test("should have added number successfully", async () => {
      const saved = await result;
      const { _id } = saved;
      expect(saved).toEqual({ ...sampleData, _id });
    });
  })

  describe("When adding a duplicate number into the store", () => {
    var result;
    beforeAll(() => {
      result = store.add(sampleData);
    });

    test("should have resolved successfully", () => {
      expect(result).rejects.toThrow();
    });
  })
})

describe("Test: NumberInMemoryStore.has", () => {
  const db = new Nedb();
  const store = new NumberInMemoryStore(db);

  beforeAll(async () => {
      await store.add(sampleData);
  })

  describe("When retrieving a number from the store", () => {
    let result;
    beforeAll(() => {
      result = store.has(sampleData.number);
    });

    test("should have resolved with true", async () => {
      const hasData = await result
      expect(hasData).toEqual(true);
    });
  })

  describe("When retrieving a number not existing from the store", () => {
    let result;
    beforeAll(() => {
      result = store.has('4332323232');
    });

    test("should have resolved with false", async () => {
      const hasData = await result
      expect(hasData).toEqual(false);
    });
  })
})

describe("Test: NumberInMemoryStore.get", () => {
  const db = new Nedb();
  const store = new NumberInMemoryStore(db);

  beforeAll(async () => {
      await store.add(sampleData);
  })

  describe("When retrieving a number from the store", () => {
    let result;
    beforeAll(() => {
      result = store.get(sampleData.number);
    });

    test("should have resolved successfully", () => {
      expect(result).resolves.toBeTruthy();
    });

    test("should have retrieved number's data", async () => {
      const saved = await result;
      const { _id } = saved;
      expect(saved).toEqual({ ...sampleData, _id });
    });
  })

  describe("When retrieving a number not existing from the store", () => {
    var result;
    beforeAll(() => {
      result = store.get('4332323232');
    });

    test("should have reject with an error", () => {
      expect(result).rejects.toThrow('not found');
    });
  })
})
