/* global __DEVTOOLS__ */
/* global axios */

axios.interceptors.request.use(config => {
  if (typeof __DEVTOOLS__ !== 'undefined' && __DEVTOOLS__) {
    config.withCredentials = true;
  }
  
  return config;
});
