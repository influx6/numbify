"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const nedb_1 = __importDefault(require("nedb"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const services_1 = __importDefault(require("./services"));
const numverify_1 = __importDefault(require("./services/numverify"));
const store_1 = __importDefault(require("./services/store"));
const port = process.env.PORT || 3030;
const numVerifyToken = process.env.NUMVERIFY_TOKEN;
const appDir = path_1.default.join(__dirname, '../app/build');
const db = new nedb_1.default();
const store = new store_1.default(db);
const api = new numverify_1.default(numVerifyToken);
const app = express_1.default();
app.use(cors_1.default());
app.use(morgan_1.default(':method | :url | :status | bodyLength :res[content-length] | :response-time ms'));
app.use(express_1.default.json());
// Serve static files from the React app
app.use(express_1.default.static(appDir));
const router = express_1.default.Router();
// register handlers with router and set to /apu.
app.use('/api', services_1.default(store, api, router));
// The "catchall" handler: for any request that doesn't
// match one above, send back Reacts index.html file.
app.get('*', (req, res) => {
    res.sendFile(path_1.default.join(appDir, 'index.html'));
});
app.listen(port, () => {
    console.log(`server is listening on ${port}`);
});
