const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const candidatSchema = new Schema({
    firstName: {
        type: String,
    },
    lastName: {
        tyep: String,
    },
    cin: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    vote: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Votant',
        }
    ],
    adminId: {
        type: Schema.Types.ObjectId,
        ref: 'Admin',
        required: true
    },
    nombreVote: {
        type: String
    },
    createdAt: {
      type: Schema.Types.Date,
      default: new Date(),
      required: true,
    },
});

module.exports = mongoose.model('Candidat', candidatSchema);