const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// creating StudentSchema
const StudentSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true
  },
  indexNo: {
    type: Number,
    required: true
  },
  fName: {
    type: String,
    required: true
  },
  lName: {
    type: String,
    required: true
  },
  otherNames: String,
  avatar: String,
  department: {
    type: Schema.Types.ObjectId,
    ref: 'Department'
  },
  password: {
    type: String,
    required: true
  },
  phoneNo: {
    type: String,
    required: true
  },
  cRep: {
    type: Boolean,
    default: false
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  confirmationToken: String,
  confirmationTokenExpires: Date,
  passwordResetToken: String,
  passwordResetTokenExpires: Date
});

module.exports = mongoose.model('Student', StudentSchema);
