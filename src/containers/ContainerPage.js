import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MainContainer from '../components/container/';
import * as Actions from '../actions';

function mapStateToProps(state) {
  return {
    
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);

