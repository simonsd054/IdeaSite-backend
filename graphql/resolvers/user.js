const { User } = require('../../database/schemas');

const allUsers = [];

const userResolvers = {
  User: {
    friends: async () => { }
  },
  Query: {
    users: async () => {
      const users  = await User.find();
      // const users = [
      //   {
      //     id: 1,
      //     name: "Simon",
      //     slug: "simon",
      //     email: "simonsd054@gmail.com",
      //     password: "lol",
      //     phone: "9842485355",
      //   },
      // ];
      return users;
    },
    user: async (_, { id }) => {
      const user = await User.findById(id);
      // const user = {
      //   id: 1,
      //   name: "Simon",
      //   slug: "simon",
      //   email: "simonsd054@gmail.com",
      //   password: "lol",
      //   phone: "9842485355",
      // };
      return user;
    },
  },
  Mutation: {
    createUser: async (_, { name, email, password, phone, gender, address }) => {
      try {
        let user = {
          name,
          slug: name.toLowerCase(),
          email,
          password,
          phone,
          gender,
          address
        };
        user = await User.create(user);
        return user
      } catch (err) {
        throw err;
      }
    },
    // updateUser: async (_, { id, name, email, phone, gender, address }) => {
    //   slug = name.toLowerCase();
    //   const user = {  }
    // }
  },
};

module.exports = userResolvers;
