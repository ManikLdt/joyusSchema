const express = require('express');
const router = express.Router();
const hotelController = require('../controller/hotelController');
const {check,  validationResult} = require('express-validator');





router.post('/search',[
  check('checkIn').notEmpty().isISO8601().withMessage('Invalid check-in date'),
  check('checkOut').notEmpty().isISO8601().withMessage('Invalid check-out date'),
  check('cityCode').notEmpty().isInt().withMessage('City code must be an integer'),
  check('countryCode').notEmpty().isLength({ min: 2, max: 2 }).withMessage('Country code must be a 2-letter string'),
  check('guestNationality').notEmpty().withMessage('Guest nationality is required'),
  check('paxRooms').isArray({ min: 1 }).withMessage('At least one room must be specified'),
  check('paxRooms.*.adults').notEmpty().isInt({ min: 1 }).withMessage('Number of adults must be at least 1'),
  check('responseTime').optional().isInt().withMessage('Response time must be an integer'),
  check('noOfNights').optional().isInt({ min: 1 }).withMessage('Number of nights must be at least 1'),
  check('isDetailedResponse').optional().isBoolean().withMessage('isDetailedResponse must be a boolean'),
  check('filters.refundable').optional().isBoolean().withMessage('refundable must be a boolean'),
  check('filters.noOfRooms').optional().isInt({ min: 0 }).withMessage('Number of rooms must be a non-negative integer'),
  check('filters.mealType').optional().isString().withMessage('Meal type must be a string'),
  check('additionalDetails.ipAddress').optional().isIP().withMessage('Invalid IP address'),
  check('additionalDetails.macAddress').optional().isMACAddress().withMessage('Invalid MAC address'),
  check('additionalDetails.deviceType').optional().isIn(['WEB', 'MOBILE']).withMessage('Invalid device type'),
  check('additionalDetails.browserType').optional().isString().withMessage('Browser type must be a string'),
  check('additionalDetails.coordinates').optional().isArray().withMessage('Coordinates must be an array'),
  check('additionalDetails.coordinates.*').optional().isNumeric().withMessage('Coordinate value must be numeric'),
  check('additionalDetails.uuid').optional().isUUID().withMessage('Invalid UUID format'),
 
],  async (req, res) => {


  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
      await hotelController.searchHotels(req, res);
  } catch (error) {
      console.error('Error in search hotels route:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// Hotel details route
router.post('/hotelDetails', [
  check('hotelCodes').notEmpty().isInt().withMessage('Hotel codes must be an integer'),
  check('Language').notEmpty().isString().withMessage('Language must be a string'),
  check('_id').notEmpty().isString().withMessage('_id must be a string'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
      await hotelController.hotelDetails(req, res);
  } catch (error) {
      console.error('Error in hotel details route:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// Pre-book hotel route
router.post('/preBook', async (req, res) => {
  try {
      await hotelController.hotelPreBook(req, res);
  } catch (error) {
      console.error('Error in pre-book hotel route:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// Book hotel route
router.post('/book', async (req, res) => {
  try {
      await hotelController.hotelBook(req, res);
  } catch (error) {
      console.error('Error in book hotel route:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// Booking details route
router.post('/bookingDetails', async (req, res) => {
  try {
      await hotelController.hotelBookingDetails(req, res);
  } catch (error) {
      console.error('Error in booking details route:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

module.exports = router;

router.post('/addPersonalDetails', async (req, res) => {
  try {
     
      const { req, userData } = req.body;

      
      await addPersonalDetails(req, userData);

     
      res.status(200).json({ success: true, message: 'Personal details added successfully.' });
  } catch (error) {
      
      console.error('Error adding personal details:', error);
      res.status(500).json({ success: false, message: 'Internal server error.' });
  }});

module.exports = router;
