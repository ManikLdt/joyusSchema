const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");
const constants = require("../../constants");
const Schema = mongoose.Schema;




const FlightSegmentSchema = new Schema({
  origin: { type: String, required: true },
  destination: { type: String, required: true },
  preferredAirlines: { type: Array, default: [] },
  preferredDepartureTime: { type: Date, required: true },
  preferredArrivalTime: { type: Date, required: true },
});

const FlightSearchSchema = new Schema({
  customer: { type: Schema.Types.ObjectId, ref: "Customer", default: null, sparse: true },
  TokenId: { type: String, required: true },
  // endUserIP: { type: String, required: true },
  adultCount: { type: Number, default: 0, required: true },
  childCount: { type: Number, default: 0, required: true },
  infantCount: { type: Number, default: 0, required: true },
  directFlight: { type: Boolean, default: false },
  oneStopFlight: { type: Boolean, default: false },
  cabinClass: { type: Number, enum: [1, 2, 3, 4, 5, 6], required: true },
  JourneyType: { type: Number, enum: [1, 2, 3], required: true },
  flightSegments: { type: [FlightSegmentSchema], default: [], required: true },
  additionalDetails: {
    ipAddress: { type: String, required: true },
    macAddress: { type: String, default: null },
    deviceType: { type: String, enum: ["WEB", "MOBILE"], required: true },
    browserType: { type: String, enum: ["CHROME", "FIREFOX"], required: true },
    coordinates: { type: Array, default: [0, 0] },
    uuid: { type: String, required: true },
  },
 
  
  isInternational: { type: Boolean, default: false },
  searchStatus: { type: String, enum: ["INITIATED", "IN_PROGRESS", "COMPLETED"], default: "INITIATED" },
  RequestOrigin: { type: String, required: true },
  // EndUserBrowserAgent: { type: String, required: true },
  PointOfSale: { type: String, required: true },
  FlightCabinClass: { type: Number, enum: [1, 2, 3, 4, 5, 6], required: true },
  flightSearchRequest: { type: Object, default: {}},
  flightSearchResponse: { type: Object, default: {} },
 // To Save personal Details of the User//
  trackingId: { type: String, default: null, index: true },
  contactNumber: { type: String, default: null },
  contactName: { type: String, default: null },
  contactEmail: { type: String, default: null },
  flightDetails: [{
    resultIndex: { type: String, default: null },
    airlineCode: { type: String, default: null },
    flightNumber: { type: String, default: null }
  }],
  markup: { type: Schema.Types.ObjectId, default: null },
  markupPrice: { type: Number, default: 0 },
  couponApplicable: { type: Schema.Types.ObjectId, default: null },
  isCouponApplied: { type: Boolean, default: false },
  couponDiscount: { type: Number, default: 0 },
  convenienceFee: { type: Schema.Types.ObjectId, default: null },
  passenger: { type: Array, default: [] }
});

FlightSearch.plugin(timestamp);

module.exports = mongoose.model("FlightSearch", FlightSearch);