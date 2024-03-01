const HotelSearch = require('../models/HotelSearch');
const HotelBooking = require('../models/HotelBooking'); 
const Customer = require('../models/customers'); 
const { hotelSearchAPI } = require('../tboAPIIntegeration'); 
const { hotelCodeListAPI } = require('../tboAPIIntegeration');
const { hotelDetailsAPI } = require('../tboAPIIntegeration');
const { hotelPreBookAPI } = require('../tboAPIIntegeration');
const { hotelBookAPI } = require('../tboAPIIntegeration');
const { hotelBookingDetailsAPI } = require('../tboAPIIntegeration');
const mongoose = require('mongoose');
const uuid = require('uuid');

const underscore = require('underscore');

const hotelController = {


  searchHotels: async (req, res) => {
    try {
      
        let accessToken = req.body.accessToken;
        let hotelSearchData = new HotelSearch({
            checkIn: req.body.checkIn,
            checkOut: req.body.checkOut,
            noOfNights: req.body.noOfNights,
            cityCode: req.body.cityCode,
            countryCode: req.body.countryCode,
            guestNationality: req.body.guestNationality,
            noOfRooms: req.body.paxRooms.length,
            paxRooms: req.body.paxRooms,
            filters: req.body.filters,
            additionalDetails: req.body.additionalDetails
        });

        if (accessToken) {
            let customer = await Customer.findOne({ accessToken });
            if (!customer) {
                return res.status(404).json({ success: false, message: 'Customer not found' });
            }
            hotelSearchData.customer = customer._id;
        }

        await hotelSearchData.save();

        const hotelCodeListRequest = {
            CityCode: req.body.cityCode,
            IsDetailedResponse: false
        };

        hotelSearchData.hotelCodeListRequest = hotelCodeListRequest;

        const hotelCodeListResponse = await hotelCodeListAPI(hotelCodeListRequest);
        hotelSearchData.hotelCodeListResponse = hotelCodeListResponse;

        let top100Hotels = hotelCodeListResponse.Hotels.slice(0, 100);
        let hotelCodes = underscore.pluck(top100Hotels, 'HotelCode');

        const hotelSearchRequest = {
            checkIn: req.body.checkIn,
            checkOut: req.body.checkOut,
            HotelCodes: hotelCodes.toString(),
            guestNationality: req.body.guestNationality,
            paxRooms: req.body.paxRooms,
            responseTime: req.body.responseTime,
            isDetailedResponse: req.body.isDetailedResponse,
            filters: req.body.filters
        };

        hotelSearchData.hotelSearchRequest = hotelSearchRequest;

        const searchResponse = await hotelSearchAPI(hotelSearchRequest);
        hotelSearchData.searchResponse = searchResponse;

        await hotelSearchData.save();

        res.status(200).json({ success: true, _id: hotelSearchData._id, searchResponse });
    } catch (error) {
        console.error('Hotel Not Found', error);
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ success: false, message: error.message });
    }
},


// Hotel Details

  hotelDetails: async (req, res) => {
    try {
      

      
      const hotelDetailsRequest = {
        Hotelcodes: req.body.hotelCodes,
        Language: req.body.Language
      };

      const { _id } = req.body;
      const objectId = mongoose.Types.ObjectId(_id);
    
  
    await HotelSearch.findOneAndUpdate({ _id: objectId }, { hotelDetailsRequest });
  

      const hotelDetailsResponse = await hotelDetailsAPI(hotelDetailsRequest);
      await HotelSearch.findOneAndUpdate({ _id: objectId }, { hotelDetailsResponse });
      
      res.status(200).json(hotelDetailsResponse);
    } catch (error) {
      console.error('Error fetching hotel details:', error);
      res.status(500).json({ success: false, message: 'Hotel Not Found' });
    }
  },


// Personal Details

addPersonalDetails: async (req, _id, userData) => {
  try {
     
    
    const objectId = mongoose.Types.ObjectId(_id);
    let personalDetails = await HotelSearch.findOne({ _id: objectId });
      
      
      if (personalDetails) {
          await HotelSearch.updateOne(
              { _id: objectId },
              {
                  $set: {
                      contactNumber: req.body.contactNumber,
                      contactName: req.body.contactName,
                      contactEmail: req.body.contactEmail,
                      hotelDetails: req.body.hotelDetails,
                      markup: req.body.markup ? ObjectId(req.body.couponApplicable) : null,
                      markupPrice: req.body.markupPrice,
                      couponApplicable: req.body.couponApplicable ? ObjectId(req.body.couponApplicable) : null,
                      isCouponApplied: req.body.isCouponApplied,
                      couponDiscount: req.body.couponDiscount,
                      convenienceFee: req.body.convenienceFee ? ObjectId(req.body.couponApplicable) : null,
                      passenger: req.body.passenger,
                      user: userData && userData.id ? ObjectId(userData.id) : undefined
                  }
              }
          );
          return;
      } else {
          console.error('Personal details not found for searchId:', _id);
          return Promise.reject('Personal details not found');
      }
  } catch (err) {
      console.error('Internal Server Error:', err);
      return Promise.reject('Internal Server Error');
  }
},






  //Hotel PreBook
 hotelPreBook: async (req, res) => {
    try {
        
     
        if (!req.body.accessToken) {
            throw new Error("Cannot Book Hotel, Customer Login Failed");
        }

      
        const customer = await Customer.findOne({ accessToken: req.body.accessToken });

       
        if (!customer) {
            throw new Error("Cannot Book Hotel, Customer Login Failed");
        }

        const hotelBooking = new HotelBooking({
          TotalPayableAmount: req.body.TotalPayableAmount,
          coupon: req.body.coupon,
          couponDiscount: req.body.couponDiscount,
          taxAmount: req.body.taxAmount,
          customerDetails: req.body.customerDetails,
          bookingCode: req.body.bookingCode,
          totalFare: req.body.totalFare,
          emailId: req.body.emailId,
          phoneNumber: req.body.phoneNumber,
          bookingType: req.body.bookingType,
          totalBaseFare: req.body.totalBaseFare,
          customer: customer._id,
          searchId: mongoose.Types.ObjectId(req.body._id),
      });
  
     
      await hotelBooking.save();
      await HotelSearch.updateOne(
        { _id: mongoose.Types.ObjectId(req.body._id) },
        { $set: { customer: customer._id } }
    );
        
        const hotelPreBookRequest = {
            BookingCode: req.body.bookingCode,
            PaymentMode: "LIMIT"
        };
        hotelBooking.hotelPreBookRequest = hotelPreBookRequest;
        await hotelBooking.save();

        
        const preBookResponse = await hotelPreBookAPI(hotelPreBookRequest);

       
        hotelBooking.preBookResponse = preBookResponse;
        await hotelBooking.save();

       
        res.status(200).json({ success: true, _id: hotelBooking._id, preBookResponse });
    } catch (error) {
        console.error('Error during pre-booking:', error);
        res.status(500).json({ success: false, message: error.message });
    }
},


  //Hotel Book

  hotelBook: async (req, res) => {
    try {
        const ClientReferenceId = uuid.v4();
        const BookingReferenceId = uuid.v4();

        const hotelBookingRequestBody = {
            BookingCode: req.body.bookingCode,
            CustomerDetails: req.body.customerDetails,
            ClientReferenceId: ClientReferenceId,
            BookingReferenceId: BookingReferenceId,
            TotalFare: req.body.totalFare,
            EmailId: req.body.emailId,
            PhoneNumber: req.body.phoneNumber,
            BookingType: req.body.bookingType
        };

        const { customer } = req.body;
        const objectId = mongoose.Types.ObjectId(customer);

        
        await HotelBooking.findOneAndUpdate(
            { customer: objectId },
            { $set: hotelBookingRequestBody }
        );

        
        const hotelBookingResponse = await hotelBookAPI(hotelBookingRequestBody);
        await HotelBooking.findOneAndUpdate(
            { customer: objectId },
            { $set: { hotelBookingResponse } }
        );

        res.json(hotelBookingResponse);
    } catch (error) {
        console.error('Error during booking:', error);
        res.status(500).json({ success: false, message: 'Hotel Booking Failed' });
    }
},


  // HotelBooking Details

hotelBookingDetails: async (req, res) => {
  try {
    const hotelBookingDetailsRequest = {
      ConfirmationNumber: req.body.ConfirmationNumber,
      PaymentMode: req.body.PaymentMode,
      
    };

    const { customer } = req.body;
    const objectId = mongoose.Types.ObjectId(customer);
    await HotelBooking.findOneAndUpdate({ customer: objectId }, { hotelBookingDetailsRequest });



     const hotelBookingDetailsResponse = await hotelBookingDetailsAPI(hotelBookingDetailsRequest);
     await HotelBooking.findOneAndUpdate({ customer: objectId }, { hotelBookingDetailsResponse });



     res.status(200).json(hotelBookingDetailsResponse);
  } catch (error) {
    console.error('Error during booking:', error);
    res.status(500).json({ success: false, message: 'Oops Something went Wrong ' });
  }
},


// Hotel Cancellation





};

module.exports = hotelController;

