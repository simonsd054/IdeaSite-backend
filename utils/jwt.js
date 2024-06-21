const jwt = require("jsonwebtoken")

const createToken = (userId) => {
  return jwt.sign({ data: String(userId) }, process.env.JWT_SECRET, {
    expiresIn: "1 days",
  })
}

module.exports = { createToken }
