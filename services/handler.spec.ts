import { validateHandler , getValidations } from './handlers'
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

describe('Test: Handlers.validateHandler', () => {
  const mockStore = {
    all: jest.fn(),
    has: jest.fn(),
    get: jest.fn(),
    add: jest.fn(),
  }

  const mockAPI = {
    validate: jest.fn(),
  }

  const mockResponse = {
    status: jest.fn(),
    json: jest.fn(),
  } 

  const mockRequest = {
    query: {
      number: '',
    },
  }

  const handler = validateHandler(mockStore, mockAPI);

  describe("When handler receives invalid number", () => {
    test("should be able to validate number", async () => {
      mockResponse.status.mockClear();
      mockResponse.json.mockClear();

      mockRequest.query.number = null;
      await handler(mockRequest, mockResponse);
      expect(mockResponse.status.mock.calls[0][0]).toEqual(400);
    })
  });

  describe("When handler receives invalid number", () => {
    test("should be able to validate number", async () => {
      mockResponse.status.mockClear();
      mockResponse.json.mockClear();

      mockRequest.query.number = '';
      await handler(mockRequest, mockResponse);
      expect(mockResponse.status.mock.calls[0][0]).toEqual(400);
    })
  });
});

describe('Test: Handlers.getValidations', () => {
  test("should be able to retrieve all validations", async () => {
    const res = [sampleData, sampleData]
    const mockStore = {
      all: () => Promise.resolve(res)
    }

    let status, body;
    const mockResponse = {
      status: (s: number) => { 
        status = s
        return mockResponse;
      },
      json: (b: any) => {
        body = b;
      },
    } 

    const handler = getValidations(mockStore)
    await handler({}, mockResponse)

    expect(status).toEqual(200);
    expect(body).toEqual(res);
  })
});
