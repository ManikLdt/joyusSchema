const axios = require('axios');
const localConfig = require('./local.json');




// HotelCodeList

async function hotelCodeListAPI(requestBody) {
  try {
    const apiUrl = localConfig.TBO_API.hotelCodeListURL;

    const payload = {
      CityCode: requestBody.CityCode,
      IsDetailedResponse: requestBody.IsDetailedResponse
    };

    const config = {
      auth: {
        username: localConfig.TBO_HOTEL_CREDENTIALS.username,
        password: localConfig.TBO_HOTEL_CREDENTIALS.password,
      },
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const response = await axios.post(apiUrl, payload, config);

    return response.data;
  } catch (error) {
    console.error('Error retrieving hotel codes:', error.response ? error.response.data : error.message);
        throw {
            message: (error.response && error.response.data && error.response.data.Status && error.response.data.Status.Description) || 'Unknown error',
            statusCode: (error.response && error.response.data && error.response.data.Status && error.response.data.Status.code) || 500
        };
  }
}


//  Hotel Search
async function hotelSearchAPI(requestBody) {
  try {
    
    const apiUrl = localConfig.TBO_API.hotelSearchURL;

    
    const config = {
      auth: {
        username: localConfig.TBO_HOTEL_CREDENTIALS.username,
        password: localConfig.TBO_HOTEL_CREDENTIALS.password,
      },
      
    };

    
    const response = await axios.post(apiUrl, requestBody, config);

    return response.data;
  } catch (error) {
    
    console.error('Error fetching hotel search:', error.response ? error.response.data : error.message);
        throw {
            message: (error.response && error.response.data && error.response.data.Status && error.response.data.Status.Description) || 'Unknown error',
            statusCode: (error.response && error.response.data && error.response.data.Status && error.response.data.Status.code) || 500
        };
    }
  }



// Hotel Details 
async function hotelDetailsAPI(requestBody) {
  try {
    const apiUrl = localConfig.TBO_API.hotelDetailsURL;

    const config = {
      auth: {
        username: localConfig.TBO_HOTEL_CREDENTIALS.username,
        password: localConfig.TBO_HOTEL_CREDENTIALS.password,
      },
      
    };

    const response = await axios.post(apiUrl, requestBody, config);

    return response.data;
  } catch (error) {
    console.error('Error fetching hotel details:', error);
    throw error;
  }
}

// Hotel PreBook
async function hotelPreBookAPI(requestBody, response) {
  try {
    const apiUrl = localConfig.TBO_API.hotelPreBookURL;
    const config = {
      auth: {
        username: localConfig.TBO_HOTEL_CREDENTIALS.username,
        password: localConfig.TBO_HOTEL_CREDENTIALS.password,
      },
     
    };
    
    const response = await axios.post(apiUrl, requestBody, config);
    return response.data;
  } catch (error) {
    console.error('Error during pre-booking API call:', error.response ? error.response.data : error.message);
    throw {
      message: (error.response && error.response.data && error.response.data.Status && error.response.data.Status.Description) || 'Unknown error',
      statusCode: (error.response && error.response.data && error.response.data.Status && error.response.data.Status.code) || 500
    };
  }
}

// Hotel Book

async function hotelBookAPI(hotelBookRequest) {
  try {
    const apiUrl = localConfig.TBO_API.hotelBookingURL;
    const config = {
      auth: {
        username: localConfig.TBO_HOTEL_CREDENTIALS.username,
        password: localConfig.TBO_HOTEL_CREDENTIALS.password,
      },
     
    };
    const response = await axios.post(apiUrl, hotelBookRequest, config);
    return response.data;
  } catch (error) {
    console.error('Error during Hotel booking API call:', error.response ? error.response.data : error.message);
    throw {
      message: (error.response && error.response.data && error.response.data.Status && error.response.data.Status.Description) || 'Unknown error',
      statusCode: (error.response && error.response.data && error.response.data.Status && error.response.data.Status.code) || 500
  }
}
}


// Hotel Booking Details 
async function hotelBookingDetailsAPI(requestBody) {
  try {
    const apiUrl = localConfig.TBO_API.hotelBookingDetailURL;
    const config = {
      auth: {
        username: localConfig.TBO_HOTEL_CREDENTIALS.username,
        password: localConfig.TBO_HOTEL_CREDENTIALS.password,
      },
    };

    const response = await axios.post(apiUrl, requestBody, config);
    return response.data;
  } catch (error) {
    console.error('Error during booking details API call:', error.response ? error.response.data : error.message);
    throw {
      message: (error.response && error.response.data && error.response.data.Status && error.response.data.Status.Description) || 'Unknown error',
      statusCode: (error.response && error.response.data && error.response.data.Status && error.response.data.Status.code) || 500
    };
  }
}


module.exports = { hotelSearchAPI, hotelCodeListAPI, hotelDetailsAPI, hotelPreBookAPI, hotelBookAPI , hotelBookingDetailsAPI};
