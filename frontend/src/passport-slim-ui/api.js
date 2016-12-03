import axios from 'axios'
import bows from 'bows'

const logger = bows('passport:api')

const getAPI = url => {

  logger('getAPI', url)

  return axios
    .get(url, {
      responseType: 'json'
    })/*
    .then(function(response) {
      console.log(response.data);
      console.log(response.status);
      console.log(response.statusText);
      console.log(response.headers);
      console.log(response.config);
    })
  .catch(function (error) {
    if (error.response) {
      // The request was made, but the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    console.log(error.config);
  })*/
}

const fetchUser = url => getAPI(url)

const api = {
  fetchUser
}

export default api