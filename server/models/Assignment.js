const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AssignmentSchema = new Schema({
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
  },
  deadline: {
    type: String,
    required: true,
  },
  file: {
    type: String,
    required: true,
  },
  submitted: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Assignment', AssignmentSchema);
