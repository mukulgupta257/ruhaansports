"use strict";

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _config = _interopRequireDefault(require("./config"));

var _userRouter = _interopRequireDefault(require("./router/userRouter.js"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _orderRouter = _interopRequireDefault(require("./router/orderRouter.js"));

var _productRouter = _interopRequireDefault(require("./router/productRouter.js"));

var _UploadRouter = _interopRequireDefault(require("./router/UploadRouter.js"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();

_mongoose.default.connect(_config.default.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(_ => {
  console.log("connected to mongodb");
}).catch(error => {
  console.log(error.reason);
});

app.use((0, _cors.default)());
app.use(_bodyParser.default.json());
app.use("/api/uploads", _UploadRouter.default);
app.use("/api/users", _userRouter.default);
app.use("/api/products", _productRouter.default);
app.use("/api/orders", _orderRouter.default);
app.use(_express.default.static(_path.default.join(__dirname, '/../frontend')));
app.get('*', (req, res) => {
  res.sendFile(__dirname, "/../frontend/index.html");
});
app.use((err, req, res, next) => {
  const status = err.name && err.name === 'ValidationError' ? 400 : 500;
  res.status(status).send({
    message: err.message
  });
});
app.listen(5000, _ => {
  console.log('serve at http://localhost:5000');
});