const {
  Comment,
  Idea,
  Vote,
  User,
} = require("../../database/schemas");

const ideaResolvers = {
  Idea: {
    user: async (parent) => {
      try {
        return await User.findById(parent.user_id);
      } catch (err) {
        throw err;
      }
    },
    co_authors: async (parent) => {
      try {
        const co_authors = await User.find({
          _id: {
            $in: parent.co_authors_ids
          }
        });
        return co_authors;
      } catch (err) {
        throw err;
      }
    },
    suggested_to: async (parent) => {
      try {
        const suggested_to = await User.find({
          _id: {
            $in: parent.suggested_to_ids
          }
        });
        return suggested_to;
      } catch (err) {
        throw err;
      }
    },
    co_authors: async (parent) => {
      try {
        const derived_from = await Idea.find({
          _id: {
            $in: parent.derived_from_ids
          }
        });
        return derived_from;
      } catch (err) {
        throw err;
      }
    },
    comments: async (parent) => {
      try {
        const comments = await Comment.find({
          idea_id: parent
        })
        return comments;
      } catch (err) {
        throw err;
      }
    },
    votes: async (parent) => {
      try {
        const votes = Vote.find({
          idea_id: parent._id
        })
        return votes;
      } catch (err) {
        throw err;
      }
    },
  },
  Vote: {
    user: async (parent) => {
      try {
        const user = User.findById(parent.user_id);
        return user;
      } catch (err) {
        throw err;
      }
    },
    idea: async (parent) => {
      try {
        const idea = Idea.findById(parent.idea_id);
        return idea;
      } catch (err) {
        throw err;
      }
    }
  },
  Query: {
    ideas: async () => {
      try {
        const ideas = await Idea.find();
        return ideas;
      } catch (err) {
        throw err;
      }
    },
    idea: async (_, { id }) => {
      try {
        const idea = await Idea.findById(id);
        if (!idea) {
          const error = new Error(
            JSON.stringify({
              message: "Idea not found",
              status: 402
            })
          );
          throw error;
        }
        return idea;
      } catch (err) {
        throw err;
      }
    },
    votes: async () => {
      try {
        const votes = await Vote.find();
        return votes;
      } catch (err) {
        throw err;
      }
    },
    vote: async (_, { id }) => {
      try {
        const vote = await Vote.findById(id);
        if (!vote) {
          const error = new Error(
            JSON.stringify({
              message: "Vote not found",
              status: 402
            })
          );
          throw error;
        }
        return vote;
      } catch (err) {
        throw err;
      }
    },
  },
  Mutation: {
    createIdea: async (_, { body, co_authors, suggested_to, derived_from }) => {
      try {
        let idea = {
          body,
          user_id: "5f004f6c8822159684f4181b",
          co_authors,
          suggested_to,
          derived_from
        };
        idea = await Idea.create(idea);
        return idea;
      } catch (err) {
        throw err;
      }
    },
    createVote: async (_, { idea_id, vote }) => {
      try {
        let voteCreated = {
          user_id: "5f004f6c8822159684f4181b",
          idea_id,
          vote
        };
        voteCreated = await Vote.create(voteCreated);
        return voteCreated;
      } catch (err) {
        throw err;
      }
    },
  },
};

module.exports = ideaResolvers;
