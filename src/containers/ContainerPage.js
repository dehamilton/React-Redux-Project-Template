/* eslint-disable */
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MainContainer from '../components/';
import * as Actions from '../actions';

function mapStateToProps(state) {
  return {
    state,
  };
}

function decorateAction(actionCreator) {
  return (...args) => {
    const result = actionCreator(...args);
    // if (result.cacheable) {
    //   console.log('cacheable actionCreator: ', result);
    // }
    return result;
  }; 
}

function decorateBoundActionCreators(actions) {
  var decoratedActions = {};
  var keys = Object.keys(actions);
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var action = actions[key];
    decoratedActions[key] = decorateAction(action);
  }
  return decoratedActions;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(decorateBoundActionCreators(Actions), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);

