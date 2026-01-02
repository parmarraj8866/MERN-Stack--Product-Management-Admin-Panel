const Product = require("../Model/product.model");
const { createModel, viewMorePopulateModel } = require("../utils/CommonModel");

exports.store = async (req, res) => {
  const { category_id, subcategory_id, p_name, p_price, status } = req.body;
  const result = await createModel(
    Product,
    { category_id, subcategory_id, p_name, p_price, status, p_image: req?.file?.filename },
    "Product Added"
  );
  res.json(result)
};

exports.index = async (req, res) => {
  const result = await viewMorePopulateModel(Product, "category_id", "name", "subcategory_id", "sub_name")
  res.json(result)
}