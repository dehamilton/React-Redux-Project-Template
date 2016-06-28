/* global __DEVTOOLS__ */
/* global axios */

axios.interceptors.request.use(config => {
  if (typeof __DEVTOOLS__ !== 'undefined' && __DEVTOOLS__) {
    config.withCredentials = true;
  }
  
  return config;
});

/* eslint-disable */
axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if (error.data && typeof error.data.Licensed) {
    if (!error.data.Licensed) {
      window.location = '/Error/LicenseNotFound';
    } else if (!error.data.Session) {
      window.location = '/';
    }
  }

  return Promise.reject(error);
});
/* eslint-endable */
