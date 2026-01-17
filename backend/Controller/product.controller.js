const Product = require("../Model/product.model");
const fs = require("fs")
const path = require("path")
const { createModel, viewMorePopulateModel, updateModel, trashModel } = require("../utils/commonModel");;

exports.store = async (req, res) => {
  const { category_id, subcategory_id, p_name, p_price } = req.body;

  const p_image = req?.file?.filename
  const result = await createModel(
    Product,
    { category_id, subcategory_id, p_name, p_price, p_image },
    "Product Added"
  );
  res.json(result)
};

exports.index = async (req, res) => {
  const result = await viewMorePopulateModel(Product, "category_id", "name", "subcategory_id", "sub_name")
  res.json(result)
}

exports.productUpdate = async (req, res) => {
  const { id } = req.params
  const { category_id, subcategory_id, p_name, p_price } = req.body
  const findImage = await Product.findById(id)

  const p_image = req.file ? req?.file?.filename : findImage.p_image

  if (req.file) {
    let oldImage = findImage.p_image
    let oldImagePath = path.join(__dirname, "../uploads", oldImage)
    fs.unlinkSync(oldImagePath)
  }

  const product = await updateModel(Product, id, { category_id, subcategory_id, p_name, p_price, p_image }, "Product Updated!")

  res.json({
    product,
  })
}


exports.productTrash = async (req, res) => {
  const { id } = req.params

  const findProduct = await Product.findById(id)

  const image = findProduct.p_image
  const imagePath = path.join(__dirname, "../uploads", image)
  fs.unlinkSync(imagePath)

  const product = await trashModel(Product, id, "Product Deleted!")

  res.json({
    product
  })
}



exports.productSingle = async (req, res) => {
  const { id } = req.params
  const product = await Product.findById(id).populate("category_id").populate("subcategory_id")
  await product.save();
  res.json({
    product
  })
}