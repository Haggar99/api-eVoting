
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const votantSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    cin: {
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
    isVoted: {
        type: Boolean,
        required: true,
        default: false
    },
    createdAt: {
      type: Schema.Types.Date,
      default: new Date(),
      required: true,
    },
});

module.exports = mongoose.model('Votant', votantSchema);
