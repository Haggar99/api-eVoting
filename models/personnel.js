const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const personnelSchema = new Schema({
firstName: {
    type: String,
    required: true
    },
lastName: {
    type: String,
    required: true
    },
email: {
    type: String,
    required: true,
    unique: true
    },
cin: {
    type: String,
    required: true,
    unique: true
},
createdAt: {
  type: Schema.Types.Date,
  default: new Date(),
  required: true,
},
});
var Personnel;

if (mongoose.models.Personnel) {
    Personnel = mongoose.model('Personnel');
  } else {
    Personnel = mongoose.model('Personnel', personnelSchema);
  }
  module.exports = Personnel;
// module.exports = mongoose.model('Personnel', personnelSchema);