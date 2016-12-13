import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import InputSamplesContainer from '../index';
import * as Actions from '../../../actions/index';

function mapStateToProps(state) {
  return {
    state,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(InputSamplesContainer);

