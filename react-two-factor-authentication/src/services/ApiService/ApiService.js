import React from 'react'
import Axios from 'axios';

const axiosInstance  = Axios.create({ baseURL: 'http://localhost:9000' });

const axiosInternal = () => {
    axiosInstance.interceptors.response.use( 
        successHandler,
        errorHandler
    );
    return axiosInstance;
}

const errorHandler = error => {
    return error;
}

const successHandler = (response) => {
    return response
}

export const GET = (url, config = {}) => {
    try {
      config.headers = { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` };
      return axiosInternal().get(url, config);
    } catch(err) {
      throw err;
    } 
}
  
export const POST = (url, data) => {
    try {
      const headers = { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` };
      return axiosInternal().post(url, data, {headers});
    } catch(error) {
      return error;
    } 
}
