const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const timestamp = require('mongoose-timestamp');


let Customers = new Schema({
  firstName: { type: String, trim: true, required: true },
  lastName: { type: String, trim: true, required: true },
  title: { type: String, default: null },
  email: { type: String, index: true },
  countryCode: { type: String },
  phoneNo: { type: String, },
  password: { type: String },
  otp: { type: String },
  otpExpiration: { type: Date }, 
  deviceToken: { type: String, default: null },
  deviceType: {
    type: String,
    index: true
  },
  accessToken: { type: String, default: null },
  profilePic: { type: String, default: null },
  emailVerificationToken: { type: String, default: null },
  resetPasswordToken: { type: String, default: null },
  isDeleted: { type: Boolean, index: true, default: false },
  isBlocked: { type: Boolean, index: true, default: false },
  isVerified: { type: Boolean, default: false },
  isLoggedIn: { type: Boolean, default: false },
  newCustomer: { type: Boolean, default: true }, 
  sendNotifications: { type: Boolean, default: true },
  fbURL: { type: String, default: null },
  instagramURL: { type: String, default: null },
  twitterURL: { type: String, default: null },
  bio: { type: String, default: null },
  bioAr: { type: String, default: null },
  headline: { type: String, default: null },
  documents: { type: [String], default: [] },
  iban: { type: String, default: null },
  bank: { type: String, default: null },
  isTNCAgreed: { type: Boolean, default: false },
  totalFollowers: { type: Number, default: 0 },
  totalFollowing: { type: Number, default: 0 },
  isPremium: { type: Boolean, default: false },
  nextPaymentDate: { type: Date, default: Date.now() },
  firstTimeLogin: { type: Boolean, default: true },
  lastActivity: { type: Date, default: Date.now() },
  lastLoginTimestamp: { type: Date, default: Date.now() }
});

Customers.plugin(timestamp);

module.exports = mongoose.model('Customers', Customers);
