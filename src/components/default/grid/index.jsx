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
import filterableCell from './filter/FilterableCell';

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
    deleteItems: PropTypes.func.isRequired,
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
    this.onCellClick = this.onCellClick.bind(this);
  }

  onCellClick(e, cellInfo, deselectAll = true) {
    if (typeof e !== 'undefined' && (e.ctrlKey === true || e.shiftKey === true)) {
      const pressedKey = e.ctrlKey === true ? 'ctrlKey' : 'shiftKey';
      this.props.itemSelected(cellInfo.rowData.id, false, cellInfo.rowIndex, pressedKey);
    } else {
      this.props.itemSelected(cellInfo.rowData.id, deselectAll, cellInfo.rowIndex, '');
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

  @filterableCell.bind({ filterProperty: 'name' })
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

  @filterableCell.bind({ filterProperty: 'lastEditedUtc', filterType: 'date' })
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

  noRowsDisplay(tableData, onAddClick, helpLink) {
    if (tableData.length === 1 && tableData[0].__filter) {
      return (
        <div style={{ position: 'absolute', top: '120px', left: '40%', zIndex: 2000 }}>
          <EmptyStateView
            onAddClick={onAddClick}
            helpLink={helpLink}
          />
        </div>
      );
    }
    return '';
  }

  render() {
    const [gridHeight, headerHeight, overscanRowsCount, rowHeight] = [300, 30, 50, 35];
    const rowGetter = ({ index }) => this.props.tableData[index];

    return (
      <div className="bbnaTableContainer">
        <button onClick={this.props.deleteItems}>Delete Test</button>
        {this.noRowsDisplay(this.props.tableData, this.props.onAddClick, this.props.helpLink)}
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
                cellRenderer={this.nameCellRenderer}
                label="Name"
                dataKey="name"
                width={400}
                className="bbna-cell"
                flexGrow={1}
              />
              <FlexColumn
                headerRenderer={this.sortableHeaderRenderer}
                cellRenderer={this.dateCellRenderer}
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
