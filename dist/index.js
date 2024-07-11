"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dbConnect_1 = require("./config/dbConnect");
const cors_1 = __importDefault(require("cors"));
const auth_routes_1 = __importDefault(require("./routes/auth-routes"));
const test_rotutes_1 = __importDefault(require("./routes/test-rotutes"));
const user_routes_1 = __importDefault(require("./routes/user-routes"));
const image_upload_routes_1 = __importDefault(require("./routes/image-upload.routes"));
const post_routes_1 = __importDefault(require("./routes/post-routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use("/api/auth", auth_routes_1.default);
app.use("/api/post", post_routes_1.default);
app.use("/api/test", test_rotutes_1.default);
app.use("/api/user", user_routes_1.default);
app.use("/api", image_upload_routes_1.default);
const PORT = process.env.PORT || 3001;
(0, dbConnect_1.connectDB)().then(() => {
    app.listen(PORT, () => console.log(`APP LISTENING AT PORT ${PORT}`));
});
