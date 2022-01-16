const mongoose = require("mongoose");
const { checkUnique } = require("../utils");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    slug: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator: async function (v) {
          try {
            return await checkUnique("User", "email", v);
          } catch (err) {
            throw new Error("Some error occurred");
          }
        },
        message: (props) => `${props.value} already exists`
      }
    },
    email_verified_at: Date,
    password: {
      type: String,
      required: true
    },
    address: String,
    gender: String,
    phone: {
      type: Number,
      required: true
    },
    fiends_ids: [{
      type: mongoose.Schema.Types.ObjectId
    }]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("User", userSchema);