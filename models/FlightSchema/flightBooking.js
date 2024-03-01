const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const timestamp = require('mongoose-timestamp');
const Joi = require('joi')
const constants = require('../../constants').APP_CONSTANTS;




let FlightBooking = new Schema({



  customer: { type: Schema.Types.ObjectId, ref: "Customer", required: true, sparse: true },
  status: { type: String, enum: Object.keys(constants.DATABASE.flightBookingStatus), index: true, default: constants.DATABASE.flightBookingStatus.INITIATED},
  trackingId: { type: String, unique: true, sparse: true, default: null},
  tokenId: { type: String, default: null },
  travelStartDate: { type: Date, required: true},
  convenienceFee: { type: Schema.Types.ObjectId, ref: 'ServiceFee', default: null},
  convenienceFeeAmount: { type: Number, default: 0},
  markup: { type: Schema.Types.ObjectId, ref: 'PriceMarkup', default: null},
  markupPrice: { type: Number, default: 0},
  coupon: { type: Schema.Types.ObjectId, ref: 'Coupon', default: null},
  couponDiscount: { type: Number, default: 0},
  currency: { type: String, default: 'INR'},
  totalPayableAmount: { type: Number, default: 0},
  taxAmount: { type: Number, default: 0},
  baggageAmount: { type: Number, default: 0},
  seatAmount: { type: Number, default: 0},
  insuranceAmount: { type: Number, default: 0},
  insurance: {
    adult: { type: String, default: null },
    child: { type: String, default: null },
    infant: { type: String, default: null },
    
  },
  flightBookRequest:{ type: Object, default: {} },
  flightBookResponse: { type: Object, default: {} },
  
  
});

  FlightBooking.plugin(timestamp);

module.exports = mongoose.model('FlightBooking', FlightBooking);