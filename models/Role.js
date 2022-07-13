const mongoose = require("mongoose");
const Schema = mongoose.Schema;
exports.ROLES = ["user","admin"];
const roleSchema = new Schema(
  {
    name: String,
  },
  {
    versionKey: false, // no genera el el id por default
  }
);

module.exports = mongoose.model("Roles", roleSchema)