

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const timestamp = require('mongoose-timestamp');





let HotelBooking = new Schema({
  customer: { type: Schema.Types.ObjectId, ref: 'Customer', required: true, sparse: true },
  PaymentMode: { type: String, default: 'LIMIT' },
  searchId: { type: mongoose.Schema.Types.ObjectId, required: true },
  convenienceFee: { type: String, default: '' },
  convenienceFeeAmount: { type: Number, default: 0 },
  totalPayableAmount: { type: Number, default: 0 },
  markup: { type: Schema.Types.ObjectId, ref: 'PriceMarkup', default: null},
  markupPrice: { type: Number, default: 0 },
  //coupon: { type: Schema.Types.ObjectId, ref: 'Coupon', default: null},
  //couponDiscount: { type: Number, default: 0 },
  taxAmount: { type: Number, default: 0 },
  customerDetails: { type: [Object], default: [] },
  bookingCode: { type: String, required: true },
  totalBaseFare: { type: Number, default: null },
  totalFare: { type: Number, default: null },
  emailId: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  bookingType: { type: String, required: true }, 
  hotelPreBookRequest: { type: Object, default: {} }, 
  preBookResponse: { type: Object, default: {} },
  hotelBookingRequestBody: { type: Object, default: {} },
  hotelBookingResponse : { type: Object, default: {} },
  hotelBookingDetailsRequest: { type: Object, default: {} },
  hotelBookingDetailsResponse : { type: Object, default: {} }
});



HotelBooking.plugin(timestamp);

 module.exports = mongoose.model('HotelBooking', HotelBooking);
