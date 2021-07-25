const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const voteSchema = new Schema({
    votantId: {
        type: Schema.Types.ObjectId,
        ref:'Votant',
        unique: true,
        required: true
    },
    candidatId: {
        type: Schema.Types.ObjectId,
        ref: 'Candidat',
        required: true
    },
    createdAt: {
      type: Schema.Types.Date,
      default: new Date(),
      required: true,
    },
});

module.exports = mongoose.model('Vote', voteSchema);
