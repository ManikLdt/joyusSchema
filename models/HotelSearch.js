const mongoose = require('mongoose')
const timestamp = require('mongoose-timestamp')

const Schema = mongoose.Schema


const PaxRooms = new Schema({
  adults: { type: Number, default: 0},
  children: { type: Number, default: 0},
  childrenAges: { type: [Number], default: [0]},
});

const HotelSearch = new Schema({
  customer: { type: Schema.Types.ObjectId, ref: 'Customer', default: null, sparse: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  noOfNights: { type: Number, default: 1 },
  cityCode: { type: Number, required: true },
  countryCode: { type: String, required: true },
  preferredCurrency: { type: String, default: 0 },
  guestNationality: { type: String, default: 0 },
  isDetailedResponse :{type: Boolean, default: false},
  noOfRooms: { type: Number, default: 0 },
  paxRooms: { type: [PaxRooms], default: [] },
  reviewScore: { type: Number, default: 0 },
  hotelCodeListRequest:{ type: Object, default: {}},
  hotelCodeListResponse: { type: Object, default: {}},
  hotelSearchRequest:{ type: Object, default: {} },
  searchResponse: { type: Object, default: {} },
  hotelDetailsRequest: { type: Object, default: {} },
  hotelDetailsResponse: { type: Object, default: {} },
  searchStatus: { type: String, default: 'INITIATED' },
  contactNumber: { type: String, default: null },
  contactName: { type: String, default: null },
  contactEmail: { type: String, default: null },
  hotelDetails: {
    hotelCode: { type: String, default: null },
    city: { type: String, default: null },
    roomDetails: { type: Array, default: []}
  },
  additionalDetails: {
    ipAddress: { type: String, default: null },
    macAddress: { type: String, default: null },
    deviceType: { type: String, default: null },
    browserType: { type: String, default: null},
    coordinates: { type: [Number], index: '2d', default: [0, 0] },
    uuid: { type: String, required: true },
  },
  
 
});

HotelSearch.plugin(timestamp)

module.exports = mongoose.model('HotelSearch', HotelSearch)


