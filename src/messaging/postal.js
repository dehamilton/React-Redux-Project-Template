/* global postal */

/**
 * Action Types
 */
const POSTAL_SEND = 'POSTAL_SEND';
const POSTAL_REQUEST = 'POSTAL_REQUEST';
const POSTAL_RECEIVE_MESSAGE = 'POSTAL_RECEIVE_MESSAGE';

/**
 * Options for Postal Middleware
 *
 * {string}    options.channel - postal channel
 * {string}    options.topic - postal topic that middleware will listen to
 * {function}  options.subscriptionCallback -
 *              callback that replaces base subscription callback to implement custom dispatching -- TODO
 */

// Create saga that will listen for POSTAL_RECEIVE_MESSAGE action.
import createSagaMiddleware from 'redux-saga';
import { watchPostalReceiveMessage } from './sagas';
const sagaMiddleware = createSagaMiddleware(watchPostalReceiveMessage);

function createPostalMiddleware(options = {}) {
  const postalMiddleware = createPostal(options);
  return { postalMiddleware, sagaMiddleware };
}

function createPostal(options = {}) {
  if (typeof options.channel === 'undefined') {
    return () => next => action => next(action);
  }

  return ({ dispatch }) => {
    createSubscription(options, dispatch);
    return next => action => {
      if (action.type === POSTAL_SEND) {
        return sendPostalMessage(options, dispatch, action);
      } else if (action.type === POSTAL_REQUEST) {
        return requestPostalMessage(options, dispatch, action);
      }
      return next(action);
    };
  };
}

function createSubscription(options, dispatch) {
  postal.subscribe({
    channel: options.channel,
    topic: options.topic,
    callback(data, envelope) {
      dispatch(receiveMessage(envelope));
      if (typeof envelope.reply === 'function') {
        envelope.reply(null, { });
      }
    },
  });
}

/**
 * send only if there are subscribers. In this way, we can provide default functionality
 * but allow subscribers to override.
 */
function sendPostalMessage(options, dispatch, action) {
  const subscribers = postal.getSubscribersFor({ channel: options.channel, topic: action.topic });
  if (subscribers.length !== 0) {
    postal.publish({
      channel: options.channel,
      topic: action.topic,
      data: action.data,
    });
    dispatch(action.completeCallback());
  } else {
    dispatch(action.internalCallback());
  }

  return;
}

function requestPostalMessage(options, dispatch, action) {
  const subscribers = postal.getSubscribersFor({ channel: options.channel, topic: action.topic });
  if (subscribers.length !== 0) {
    const channel = postal.channel(options.channel);
    channel.request({
      topic: action.topic,
      data: action.data,
    })
    .then(requestPostalMessageSuccess.bind({ action, dispatch }))
    .catch(requestPostalMessageError.bind({ action, dispatch }));
  }

  return;
}

function requestPostalMessageSuccess(data) {
  this.dispatch(this.action.completeCallback(data));
}

function requestPostalMessageError(err) {
  this.dispatch(this.action.completeCallback(err)); // ?
}

/**
 * Action creators
 */

function sendMessage(topic, data, subscribersCallback, internalCallback) {
  return {
    type: POSTAL_SEND,
    topic,
    data,
    completeCallback: subscribersCallback,
    internalCallback,
  };
}

function requestMessage(topic, data, subscribersCallback, internalCallback) {
  return {
    type: POSTAL_REQUEST,
    topic,
    data,
    completeCallback: subscribersCallback,
    internalCallback,
  };
}

function receiveMessage(envelope) {
  return {
    type: POSTAL_RECEIVE_MESSAGE,
    envelope,
  };
}

/**
 * Exports
 */

export default createPostalMiddleware;
export { sendMessage, requestMessage, receiveMessage, POSTAL_RECEIVE_MESSAGE };
