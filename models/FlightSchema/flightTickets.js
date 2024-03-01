const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const timestamp = require('mongoose-timestamp');
const constants = require('../../constants').APP_CONSTANTS;



let FlightTicket = new Schema({
  customer: { type: Schema.Types.ObjectId, ref: "Customer", default: null, sparse: true },
  bookingId: { type: Schema.Types.ObjectId, ref: 'FlightBooking'},
  isLCC: { type: Boolean, default: true, index: true},
  lccFlight: { type: Object, default: {}},
  nonLCCFlight: { type: Object, default: {}},
  status: { type: String, enum: Object.keys(constants.DATABASE.flightTicketStatus), default: constants.DATABASE.flightTicketStatus.INITIATED},
  ticket: { type: Object, default: {} },
  releasePnrRequest: { type: Object, default: {} },
  releasePnrResponse: { type: Object, default: {} },
  flightTicketRequest: { type: Object, default: {} },
  flightTicketResponse: { type: Object, default: {} }, 
  flightBookingDetailsRequest: { type: Object, default: {} },
  flightBookingDetailsResponse: { type: Object, default: {} },
});

FlightTicket.plugin(timestamp);

module.exports = mongoose.model('FlightTicket', FlightTicket);