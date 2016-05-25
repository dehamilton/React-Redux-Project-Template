import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MainContainer from '../components/';
import * as Actions from '../actions';

function mapStateToProps(state) {
  return {
    state,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);

