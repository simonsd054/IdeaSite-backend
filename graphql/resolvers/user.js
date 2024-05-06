const bcrypt = require("bcrypt")
const { CustomError } = require("../../utils")

const { User } = require("../../database/schemas")

const userResolvers = {
  User: {
    friends: async () => {},
  },
  Query: {
    users: async () => {
      const users = await User.find()
      return users
    },
    user: async (_, { id }) => {
      const user = await User.findById(id)
      return user
    },
  },
  Mutation: {
    register: async (
      _,
      { name, email, password, confirmPassword, phone, gender, address }
    ) => {
      if (password !== confirmPassword) {
        throw new CustomError("Password and Confirm Password do not match")
      }
      let user = {
        name,
        email,
        phone,
        gender,
        address,
      }
      const hashedPassword = await bcrypt.hash(password, 10)
      user.password = hashedPassword
      try {
        user = await User.create(user)
      } catch (err) {
        throw new CustomError(err.message)
      }
      return user
    },
    // updateUser: async (_, { id, name, email, phone, gender, address }) => {
    //   const user = {  }
    // }
  },
}

module.exports = userResolvers
