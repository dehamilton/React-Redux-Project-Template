import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AutoSizer, Table, Column } from 'react-virtualized';
import classNames from 'classnames';
import 'react-virtualized/styles.css';
import CheckBoxColumn from './columns/CheckboxColumn';

import ClickableColumn from './columns/ClickableColumn';
import ItemDateTimeColumn from './columns/ItemDateTimeColumn';
import IndeterminateCheckBoxHeader from './headers/IndeterminateCheckBoxHeader';
import SortableHeader from './headers/SortableHeader';
import EmptyStateView from './emptyStateView/EmptyStateView';
import filterableCell from './filter/FilterableCell';

// require('./virtualized.scss');
require('./grid.css');

export default class BbnaTable extends Component {
  static propTypes = {
    tableData: PropTypes.any.isRequired,
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

    this.idCellRenderer = this.idCellRenderer.bind(this);
    this.nameCellRenderer = this.nameCellRenderer.bind(this);
    this.dateCellRenderer = this.dateCellRenderer.bind(this);
  }

  onCellClick = (e, cellInfo, deselectAll = true) => {
    if (typeof e !== 'undefined' && (e.ctrlKey === true || e.shiftKey === true)) {
      const pressedKey = e.ctrlKey === true ? 'ctrlKey' : 'shiftKey';
      this.props.itemSelected(cellInfo.rowData.id, false, cellInfo.rowIndex, pressedKey);
    } else {
      this.props.itemSelected(cellInfo.rowData.id, deselectAll, cellInfo.rowIndex, '');
    }
  }

  getRowHeight = ({ index }) => {
    if (index === 0 && this.props.tableData[0].__filter) {
      return 45;
    }
    return 31;
  }

  getTableHeight = (height) => {
    if (this.props.tableData.length === 1 && this.props.tableData[0].__filter) {
      return 300;
    } else if (height > ((this.props.tableData.length * 35) + 45)) {
      return (this.props.tableData.length * 31) + 45;
    }

    return height - 45; // leave a little space at bottom to prevent flickering
  }

  noRowsRenderer = () => {
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

  @filterableCell.bind({ filterProperty: 'id', filterType: 'clear' })
  idCellRenderer(cellInfo) {
    return (
      <CheckBoxColumn
        clickAction={this.onCellClick}
        name={'chk_' + cellInfo.rowData.id}
        checked={!!cellInfo.rowData.__selected}
        cellInfo={cellInfo}
      />
    );
  }

  @filterableCell.bind({ filterProperty: 'name', filterType: 'text' })
  nameCellRenderer(cellInfo) {
    const { openItemForEdit } = this.props;

    return (
      <div onClick={e => this.onCellClick(e, cellInfo)}>
        <ClickableColumn
          rowId={cellInfo.rowData.id}
          text={cellInfo.rowData.name}
          onClick={openItemForEdit}
        />
      </div>
    );
  }

  // @filterableCell.bind({ filterProperty: 'lastEditedUtc', filterType: 'date' })
  dateCellRenderer(cellInfo) {
    return (
      <div className="bbna-col-date" onClick={e => this.onCellClick(e, cellInfo)}>
        <ItemDateTimeColumn
          date={cellInfo.rowData.lastEditedUtc}
          format={'MM/DD/YYYY'}
        />
      </div>
    );
  }

  checkboxHeaderRenderer = () => (
    <IndeterminateCheckBoxHeader
      clickAction={this.props.toggleSelectAllItems}
      tableStats={this.props.tableStats}
    />
  );

  sortableHeaderRenderer = (rowHeader) => {
    const { tableSorting, changeSort } = this.props;

    return (
      <SortableHeader
        columnKey={rowHeader.dataKey}
        label={rowHeader.label}
        sorting={tableSorting}
        onSortChanged={changeSort}
        className="bbna-col-header"
      />
    );
  }

  rowClassName = (rowData) => {
    if (rowData.index === 0 && this.props.tableData[0].__filter) {
      return 'bbna-filterrow';
    }
    const isRowSelected = rowData.index >= 0 && this.props.tableData[rowData.index].__selected;
    return classNames({ 'bbna-selected-row': isRowSelected });
  }

  noRowsDisplay(tableData, onAddClick, helpLink) {
    if (tableData.length === 1 && tableData[0].__filter) {
      return (
        <div style={{ position: 'absolute', top: '130px', left: '40%', zIndex: 2000 }}>
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
    // eslint-disable-next-line
    const [gridHeight, headerHeight, overscanRowsCount] = [300, 30, 50];
    const rowGetter = ({ index }) => this.props.tableData[index];

    return (
      <div className="bbnaTableContainer" style={{ height: '100%' }}>
        {this.noRowsDisplay(this.props.tableData, this.props.onAddClick, this.props.helpLink)}
        <AutoSizer>
          {({ width, height }) => (
            <Table
              className="bbna-table-grid"
              headerClassName="headerColumn"
              rowClassName={this.rowClassName}
              headerHeight={headerHeight}
              height={(this.getTableHeight(height))}
              noRowsRenderer={this.noRowsRenderer}
              overscanRowCount={overscanRowsCount}
              rowHeight={this.getRowHeight}
              rowGetter={rowGetter}
              rowCount={this.props.tableData.length}
              width={width}
            >
              <Column
                headerRenderer={this.checkboxHeaderRenderer}
                cellRenderer={this.idCellRenderer}
                dataKey="id"
                width={31}
                className="bbna-cell bbna-checkbox"
                headerClassName="bbna-checkbox"
              />
              <Column
                headerRenderer={this.sortableHeaderRenderer}
                cellRenderer={this.nameCellRenderer}
                label="Name"
                dataKey="name"
                width={400}
                className="bbna-cell"
                flexGrow={1}
              />
              <Column
                headerRenderer={this.sortableHeaderRenderer}
                cellRenderer={this.dateCellRenderer}
                label="Modified"
                dataKey="lastEditedUtc"
                width={240}
                className="bbna-cell"
              />
            </Table>
          ) }
        </AutoSizer>
      </div>
    );
  }
}
