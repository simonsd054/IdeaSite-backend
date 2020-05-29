const { gql } = require("apollo-server-express");

const userSchema = gql`
  type User {
    id: ID!
    name: String!
    slug: String!
    email: String!
    password: String!
    gender: String
    phone: String!
    address: String
  }
  type Query {
    users: [User]
    user(id: ID!): User
  }
  type Mutation {
    createUser(
      name: String!
      email: String!
      password: String!
      confirmPassword: String!
      phone: String!
    ): [User]
  }
`;

module.exports = userSchema;
