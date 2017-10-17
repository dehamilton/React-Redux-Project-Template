import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as gridActions from './actions/actions';
import BbnaTable from './BbnaTable';
import filterableTableHoc from './filter/FilterableTable';
// import statsTableHoc from './tableStats/CountableTable';

export default connect(
  () => ({}),
  dispatch => bindActionCreators(gridActions, dispatch)
)(filterableTableHoc(BbnaTable));
