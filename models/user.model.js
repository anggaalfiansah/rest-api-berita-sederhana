const mongodb = require("mongoose");

const UserModel = new mongodb.Schema({
  Nama: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  Telpon: {
    type: String,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
  FotoProfil: {
    type: String,
  },
  CreatedAt: {
    type: Date,
    default: Date.now(),
  },
});

const UserData = mongodb.model("Users", UserModel);

module.exports = UserData;