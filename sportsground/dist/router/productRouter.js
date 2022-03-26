"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _expressAsyncHandler = _interopRequireDefault(require("express-async-handler"));

var _productModel = _interopRequireDefault(require("../models/productModel"));

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const productRouter = _express.default.Router();

productRouter.get('/', (0, _expressAsyncHandler.default)(async (req, res) => {
  const products = await _productModel.default.find({});
  res.send(products);
}));
productRouter.get('/:id', (0, _expressAsyncHandler.default)(async (req, res) => {
  const product = await _productModel.default.findById(req.params.id);
  res.send(product);
}));
productRouter.post('/', _utils.isAuth, _utils.isAdmin, (0, _expressAsyncHandler.default)(async (req, res) => {
  const product = new _productModel.default({
    name: "sample",
    description: "sample",
    category: "sample",
    brand: "sample",
    image: "./images/products/1-gloves.jpeg",
    image2: "./images/products/1-gloves.jpeg",
    image3: "./images/products/1-gloves.jpeg",
    image4: "./images/products/1-gloves.jpeg"
  });
  const createdProduct = await product.save();

  if (createdProduct) {
    res.status(201).send({
      messgae: "product created",
      product: createdProduct
    });
  } else {
    res.status(500).send({
      messgae: "error in Creating Product"
    });
  }
}));
productRouter.put('/:id', _utils.isAuth, _utils.isAdmin, (0, _expressAsyncHandler.default)(async (req, res) => {
  const productId = req.params.id;
  const product = await _productModel.default.findById(productId);

  if (product) {
    product.name = req.body.name;
    product.description = req.body.description;
    product.stock = req.body.stock;
    product.price = req.body.price;
    product.image = req.body.image;
    product.image2 = req.body.image2;
    product.image3 = req.body.image3;
    product.image4 = req.body.image4;
    product.brand = req.body.brand;
    product.category = req.body.category;
    const updateProduct = await product.save();

    if (updateProduct) {
      res.send({
        messgae: "Product Updated",
        product: updateProduct
      });
    } else {
      res.status(500).send({
        error: "Error in Updating"
      });
    }
  } else {
    res.status(404).send({
      error: "Product Not Found"
    });
  }
}));
productRouter.delete('/:id', _utils.isAuth, _utils.isAdmin, (0, _expressAsyncHandler.default)(async (req, res) => {
  const product = await _productModel.default.findById(req.params.id);

  if (product) {
    const deletedproduct = await product.remove();
    res.send({
      message: "Product deleted sucessfuly",
      product: deletedproduct
    });
  } else {
    res.status(404).send({
      message: "product not found"
    });
  }
}));
var _default = productRouter;
exports.default = _default;