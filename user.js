const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  //   id: {
  //     type: String,
  //     required: true,
  //   },

  email: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", UserSchema);
