import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as gridActions from './actions/actions';
import BbnaTable from './BbnaTable';
import filterableTableHoc from './filter/FilterableTable';
// import statsTableHoc from './tableStats/CountableTable';

const baseActions = gridActions.createGridActions('changeThisName');

export default connect(
  () => ({}),
  dispatch => bindActionCreators({ ...baseActions, deleteFees: gridActions.deleteFees }, dispatch)
)(filterableTableHoc(BbnaTable));
