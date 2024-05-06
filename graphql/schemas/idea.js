const { gql } = require("apollo-server-express")

const ideaSchema = gql`
  type Idea {
    id: ID!
    body: String!
    user: User!
    co_authors: [User]!
    suggested_to: [User]!
    derived_from: [Idea]!
    comments: [Comment]!
    votes: [Vote]!
  }
  extend type Query {
    ideas: [Idea]!
    idea(id: ID!): Idea!
  }
  extend type Mutation {
    createIdea(
      body: String!
      co_authors: [ID]!
      suggested_to: [ID]!
      derived_from: [ID]!
    ): Idea!
    updateIdea(
      id: ID!
      body: String!
      co_authors: [ID]!
      suggested_to: [ID]!
      derived_from: [ID]!
    ): Idea!
    deleteIdea(id: ID!): Idea!
  }
`

module.exports = ideaSchema
