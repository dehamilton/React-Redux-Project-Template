/* eslint-disable */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AutoSizer, FlexTable, FlexColumn } from 'react-virtualized';
import classNames from 'classnames';
import 'react-virtualized/styles.css';
import * as gridActions from './actions';
import CheckBoxColumn from './columns/CheckboxColumn';
import ClickableColumn from './columns/ClickableColumn';
import ItemDateTimeColumn from './columns/ItemDateTimeColumn';
import IndeterminateCheckBoxHeader from './headers/IndeterminateCheckBoxHeader';
import SortableHeader from './headers/SortableHeader';
import EmptyStateView from './emptyStateView/EmptyStateView';

require('./virtualized.scss');
require('./grid.css');

@connect(() => ({}),
  dispatch => bindActionCreators(gridActions, dispatch)
)
export default class BbnaTable extends Component {
  static propTypes = {
    tableData: PropTypes.array.isRequired,
    tableStats: PropTypes.object.isRequired,
    tableSorting: PropTypes.object.isRequired,
    changeSort: PropTypes.func.isRequired,
    itemSelected: PropTypes.func.isRequired,
    toggleSelectAllItems: PropTypes.func.isRequired,
    openItemForEdit: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    onAddClick: PropTypes.func.isRequired,
    helpLink: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);
   
    this.rowClassName = this.rowClassName.bind(this);
    this.checkboxHeaderRenderer = this.checkboxHeaderRenderer.bind(this);
    this.sortableHeaderRenderer = this.sortableHeaderRenderer.bind(this);
    this.noRowsRenderer = this.noRowsRenderer.bind(this);
    this.nameCellRenderer = this.nameCellRenderer.bind(this);
    this.idCellRenderer = this.idCellRenderer.bind(this);
    this.dateCellRenderer = this.dateCellRenderer.bind(this);
  }

  onCellClick(e, cellInfo) {
    if (typeof e !== 'undefined' && (e.ctrlKey === true || e.shiftKey === true)) {
      const pressedKey = e.ctrlKey === true ? 'ctrlKey' : 'shiftKey';
      this.props.itemSelected(cellInfo.rowData.id, false, cellInfo.rowIndex, pressedKey);
    } else {
      this.props.itemSelected(cellInfo.rowData.id, true, cellInfo.rowIndex, '');
    }
  }

  noRowsRenderer() {
    const { isLoading, onAddClick, helpLink } = this.props;
    if (!isLoading) {
      return (
        <EmptyStateView
          onAddClick={onAddClick}
          helpLink={helpLink}
        />
      );
    }
    return '';
  }

  idCellRenderer(cellInfo) {
    return (
      <span className="table-cell" onClick={e => this.onCellClick(e, cellInfo)}>
        <CheckBoxColumn
          dataRow={cellInfo.rowData}
          name={'chk_' + cellInfo.rowData.id}
          checked={!!cellInfo.rowData.__selected}
        />
      </span>
    );
  }

  nameCellRenderer(cellInfo) {
    const { openItemForEdit } = this.props;

    return (
      <span className="table-cell" onClick={e => this.onCellClick(e, cellInfo)}>
        <ClickableColumn
          rowId={cellInfo.rowData.id}
          text={cellInfo.rowData.name}
          onClick={openItemForEdit}
        />
      </span>
    );
  }

  dateCellRenderer(cellInfo) {
    return (
      <span className="table-cell" onClick={e => this.onCellClick(e, cellInfo)}>
        <ItemDateTimeColumn
          date={cellInfo.rowData.lastEditedUtc}
          format={'MM/DD/YYYY'}
        />
      </span>
    );
  }

  checkboxHeaderRenderer() {
    return (
      <IndeterminateCheckBoxHeader
        clickAction={this.props.toggleSelectAllItems}
        tableStats={this.props.tableStats}
      />
    );
  }

  sortableHeaderRenderer(rowHeader) {
    const { tableSorting, changeSort } = this.props;

    return (
      <SortableHeader
        columnKey={rowHeader.dataKey}
        label={rowHeader.label}
        sorting={tableSorting}
        onSortChanged={changeSort}
        className="col-header"
      />
    );
  }

  rowClassName(rowData) {
    const isRowSelected = rowData.index >= 0 && this.props.tableData[rowData.index].__selected;
    return classNames({ selectedRow: isRowSelected });
  }

  render() {
    const [gridHeight, headerHeight, overscanRowsCount, rowHeight] = [300, 30, 50, 35];
    const { tableData } = this.props;
    const rowGetter = ({ index }) => tableData[index];

    return (
      <div className="bbnaTableContainer">
        <AutoSizer disableHeight>
          {({ width }) => (
            <FlexTable
              className="bbna-table-grid"
              headerClassName="headerColumn"
              rowClassName={this.rowClassName}
              headerHeight={headerHeight}
              height={gridHeight}
              noRowsRenderer={this.noRowsRenderer}
              overscanRowCount={overscanRowsCount}
              rowHeight={rowHeight}
              rowGetter={rowGetter}
              rowCount={tableData.length}
              width={width}
            >
              <FlexColumn
                headerRenderer={this.checkboxHeaderRenderer}
                dataKey="id"
                width={35}
                className="bbna-cell bbna-checkbox"
                headerClassName="bbna-th bbna-checkbox bbna-col-min no-sort"
                cellRenderer={this.idCellRenderer}
              />
              <FlexColumn
                headerRenderer={this.sortableHeaderRenderer}
                label="Name"
                dataKey="name"
                width={400}
                className="bbna-cell"
                flexGrow={1}
                cellRenderer={this.nameCellRenderer}
              />
              <FlexColumn
                headerRenderer={this.sortableHeaderRenderer}
                label="Modified"
                dataKey="lastEditedUtc"
                width={200}
                className="bbna-cell"
                flexGrow={1}
                cellRenderer={this.dateCellRenderer}
              />
            </FlexTable>
          ) }
        </AutoSizer>
      </div>
    );
  }
}
