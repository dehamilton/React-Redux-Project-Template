/* eslint no-unused-vars: [2, { "args": "none" }] */

// import { ITEM_SELECTED, FILTER_RESET, SELECTED_ITEMS_ACTION } from '../actions/actionConstants';
// import { map, indexOf } from 'lodash';
// import browserStorage from '../utils/storage';

const storageMiddleware = store => next => action => {
  const result = next(action);
	
  // let formsObject = browserStorage.getJson('forms');
  
  // browserStorage.setJson('forms', formsObject);
	
  return result;
};

export default storageMiddleware;

// const runOutsideEvent = store => next => action => {
//     let p = new Promise(function(resolve, reject) {
//       resolve('resolved!');
//     });
    
//     p.then(value => {
//       console.log('runOutsideEvent promise.then', value);
//       setTimeout(() => {
//         let result = next(action);
//         console.log('runOutsideEvent promise.then inside settimeout', value);
//         return result;
//       }, 3000);
//     });
//   };
