const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
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
    password: {
        type: String,
        required: true
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

module.exports = mongoose.model('Admin', adminSchema);