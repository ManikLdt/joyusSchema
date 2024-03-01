const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const timestamp = require('mongoose-timestamp');




let CancelHotelBooking = new Schema({
  customer: { type: Schema.Types.ObjectId, ref: 'Customer', default: null, sparse: true },
  booking: { type: Schema.Types.ObjectId, ref: 'HotelBooking' },
  changeRequestId: { type: Number, default: null },
  changeRequestStatus: { type: Number, default: null},
  status: { type: String,  default: 'InProgress'},
  endUserIP: { type: String, default: null },
  PaymentResponse: { type: Object, default: {} },
  sendChangeRequestResponse: { type: Object, default: {} },
  markupPrice: { type: Number, default: null },
  convenienceFeeAmount: { type: Number, default: null },
  couponDiscount: { type: Number, default: null }
});

CancelHotelBooking.plugin(timestamp);

module.exports = mongoose.model('CancelHotelBooking', CancelHotelBooking);