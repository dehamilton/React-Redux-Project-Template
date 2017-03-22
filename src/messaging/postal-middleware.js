/* library can be found at: https://github.com/dehamilton/postal-redux-middleware */

/* global postal */
/* eslint-disable no-nested-ternary */

/**
 * Action Types
 */
const POSTAL_SEND = 'POSTAL_SEND';
const POSTAL_REQUEST = 'POSTAL_REQUEST';
const POSTAL_RECEIVE_MESSAGE = 'POSTAL_RECEIVE_MESSAGE';

const REQUEST_TIMEOUT = 2000;

/**
 * Options for Postal Middleware
 *
 * {string}    options.channel - postal channel
 * {string}    options.topic - postal topic that middleware will listen to
 * {function}  options.subscriptionCallback -
 *    callback that replaces base subscription callback to implement custom dispatching -- TODO
 */

function createPostalMiddleware(options = {}) {
  if (typeof options.channel === 'undefined') {
    return () => next => action => next(action);
  }

  return ({ dispatch }) => {
    createSubscription(options, dispatch);
    return next => action => (
      action.type === POSTAL_SEND
        ? sendPostalMessage(options, dispatch, action)
        : action.type === POSTAL_REQUEST
          ? requestPostalMessage(options, dispatch, action)
          : next(action)
    );
  };
}

function createSubscription(options, dispatch) {
  postal.subscribe({
    channel: options.channel,
    topic: options.topic,
    callback: (data, envelope) => {
      if (typeof options.subscriptionCallback === 'function') {
        options.subscriptionCallback(dispatch, data, envelope);
      } else {
        dispatch(receiveMessage(envelope));
      }
    },
  });
}

function sendPostalMessage(options, dispatch, action) {
  const subscribers = postal.getSubscribersFor({ channel: options.channel, topic: action.topic });

  postal.publish({
    channel: options.channel,
    topic: action.topic,
    data: action.data,
  });

  if (subscribers.length !== 0) {
    if (typeof action.completeCallback !== 'undefined') {
      dispatch(action.completeCallback());
    }
  } else if (typeof action.internalCallback !== 'undefined') {
    dispatch(action.internalCallback());
  }
}

function requestPostalMessage(options, dispatch, action) {
  const subscribers = postal.getSubscribersFor({ channel: options.channel, topic: action.topic });
  if (subscribers.length === 0) {
    requestPostalMessageSuccess.bind({ action, dispatch })();
    return;
  }

  const channel = postal.channel(options.channel);
  channel.request({
    topic: action.topic,
    data: action.data,
    timeout: action.timeout,
  })
  .then(requestPostalMessageSuccess.bind({ action, dispatch }))
  .catch(requestPostalMessageError.bind({ action, dispatch }));
}

function requestPostalMessageSuccess(data) {
  if (typeof this.action.requestCompleteAction !== 'undefined') {
    this.dispatch(this.action.requestCompleteAction(data));
  }
}

function requestPostalMessageError(err) {
  if (typeof this.action.requestErrorAction !== 'undefined') {
    this.dispatch(this.action.requestErrorAction(err)); // ?
  }
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

function requestMessage(topic, data, requestCompleteAction, requestErrorAction, timeout = REQUEST_TIMEOUT) {
  return {
    type: POSTAL_REQUEST,
    topic,
    data,
    requestCompleteAction,
    requestErrorAction,
    timeout,
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
