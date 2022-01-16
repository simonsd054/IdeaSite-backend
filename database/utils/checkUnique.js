const mongoose = require("mongoose");

async function checkUnique(model, field, data) {
  const itemCount = await mongoose.model(model).count({ [field]: data });
  return itemCount > 0 ? false : true;
}

module.exports = checkUnique;
