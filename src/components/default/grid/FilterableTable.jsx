import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as gridActions from './actions/actions';
import BbnaTable from './index';
import filterableTableHoc from './filter/FilterableTable';
import statsTableHoc from './tableStats/CountableTable';

export const FilterableTable = connect(
  () => ({}),
  dispatch => bindActionCreators(gridActions, dispatch))(filterableTableHoc(statsTableHoc(BbnaTable, 'above')));
