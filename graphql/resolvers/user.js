const allUsers = [];

const userResolvers = {
  User: {},
  Query: {
    users: async () => {
      console.log("lol");
      const users = [
        {
          id: 1,
          name: "Simon",
          slug: "simon",
          email: "simonsd054@gmail.com",
          password: "lol",
          phone: "9842485355",
        },
      ];
      return users;
    },
    user: async (_, { id }) => {
      const user = {
        id: 1,
        name: "Simon",
        slug: "simon",
        email: "simonsd054@gmail.com",
        password: "lol",
        phone: "9842485355",
      };
      return user;
    },
  },
  Mutation: {
    createUser: async (_, { id, name, email, password, phone }) => {
      slug = name.toLowerCase();
      const user = { id, name, slug, email, password, phone };
      allUsers.push(user);
      console.log(allUsers);
      return allUsers;
    },
  },
};

module.exports = userResolvers;
