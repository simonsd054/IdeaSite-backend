const userResolvers = require("./user");
const { merge } = require("lodash");

module.exports = merge(userResolvers);
