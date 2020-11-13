import React from 'react';
import Cookies from 'js-cookie';
import axios from 'axios'


export default async function APIRequest(method, data) {
  let response;
  try {
     response = await axios.post(
      '/api/' + method,
      data,
      { headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.log(err);
    return {status: 'error'};
  }

  console.log(response.data);
  return response.data;
}

