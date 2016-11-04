/* global _ */

import React, { Component, PropTypes } from 'react';
import { AutoSizer, FlexTable, FlexColumn } from 'react-virtualized';
import classNames from 'classnames';
import 'react-virtualized/styles.css';
import CheckBoxColumn from './columns/CheckboxColumn';
import ClickableColumn from './columns/ClickableColumn';
import ItemDateTimeColumn from './columns/ItemDateTimeColumn';
import IndeterminateCheckBoxHeader from './headers/IndeterminateCheckBoxHeader';
import SortableHeader from './headers/SortableHeader';
import EmptyStateView from './emptyStateView/EmptyStateView';
import filterableCell from './FilterableCell';

require('./virtualized.scss');
require('./grid.css');

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

    this.state = { nameFilter: '', dateFilter: '' };
   
    this.rowClassName = this.rowClassName.bind(this);
    this.checkboxHeaderRenderer = this.checkboxHeaderRenderer.bind(this);
    this.sortableHeaderRenderer = this.sortableHeaderRenderer.bind(this);
    this.noRowsRenderer = this.noRowsRenderer.bind(this);
    this.nameCellRenderer = this.nameCellRenderer.bind(this);
    this.idCellRenderer = this.idCellRenderer.bind(this);
    this.dateCellRenderer = this.dateCellRenderer.bind(this);
    this.onCellClick = this.onCellClick.bind(this);
    this.onFilter = this.onFilter.bind(this);
  }

  onCellClick(e, cellInfo, deselectAll = true) {
    if (typeof e !== 'undefined' && (e.ctrlKey === true || e.shiftKey === true)) {
      const pressedKey = e.ctrlKey === true ? 'ctrlKey' : 'shiftKey';
      this.props.itemSelected(cellInfo.rowData.id, false, cellInfo.rowIndex, pressedKey);
    } else {
      this.props.itemSelected(cellInfo.rowData.id, deselectAll, cellInfo.rowIndex, '');
    }
  }

  onFilter(e, target) {
    this.setState({ [target]: e.target.value });
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
    if (cellInfo.rowData.__filter) {
      return ('');
    }

    return (
      <CheckBoxColumn
        clickAction={this.onCellClick}
        name={'chk_' + cellInfo.rowData.id}
        checked={!!cellInfo.rowData.__selected}
        cellInfo={cellInfo}
      />
    );
  }

  @filterableCell
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

  @filterableCell
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
    const rowGetter = ({ index }) => this.props.tableData[index];

    return (
      <div className="bbnaTableContainer">
        <AutoSizer>
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
              rowCount={this.props.tableData.length}
              width={width}
            >
              <FlexColumn
                headerRenderer={this.checkboxHeaderRenderer}
                cellRenderer={this.idCellRenderer}
                dataKey="id"
                width={35}
                className="bbna-cell bbna-checkbox"
                headerClassName="bbna-th bbna-checkbox bbna-col-min no-sort"
              />
              <FlexColumn
                headerRenderer={this.sortableHeaderRenderer}
                cellRenderer={cellInfo => this.nameCellRenderer(cellInfo, 'nameFilter', this.onFilter)}
                label="Name"
                dataKey="name"
                width={400}
                className="bbna-cell"
                flexGrow={1}
              />
              <FlexColumn
                headerRenderer={this.sortableHeaderRenderer}
                cellRenderer={cellInfo => this.dateCellRenderer(cellInfo, 'dateFilter', this.onFilter)}
                label="Modified"
                dataKey="lastEditedUtc"
                width={200}
                className="bbna-cell"
                flexGrow={1}
              />
            </FlexTable>
          ) }
        </AutoSizer>
      </div>
    );
  }
}
