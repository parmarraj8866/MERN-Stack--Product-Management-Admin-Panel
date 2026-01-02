const SubCategory = require("../Model/subcategory.model");
const { createModel, viewPopulateModel } = require("../utils/commonModel");

exports.store = async (req, res) => {
  const { category_id, sub_name, status } = req.body;
  const result = await createModel(
    SubCategory,
    { category_id, sub_name, status },
    "Subcategory Added"
  );
  res.json(result)
};

exports.index = async (req, res) => {
  const result = await viewPopulateModel(SubCategory, "category_id", "name status")

  res.json(result)
}