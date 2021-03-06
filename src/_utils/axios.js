/* global __DEVTOOLS__ */
/* global axios */

axios.interceptors.request.use((config) => {
  if (typeof __DEVTOOLS__ !== 'undefined' && __DEVTOOLS__) {
    config.withCredentials = true;
  }
  config.headers = {
    'X-Accept-JSON': '1.1',
    'Content-Type': 'application/json',
  };
  
  return config;
});

/* eslint-disable */
axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if (error.data && typeof error.data.Licensed !== 'undefined') {
    if (!error.data.Licensed) {
      window.location = '/Error/LicenseNotFound';
    } else if (!error.data.Session) {
      window.location = '/';
    }
  }

  return Promise.reject(error);
});
/* eslint-enable */
