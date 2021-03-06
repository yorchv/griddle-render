import React from 'react';
import { getStyleProperties } from './utils/styleHelper';

class TableHeadingCell extends React.Component {
  constructor(props, context) {
    super(props, context);

    this._handleClick = this._handleClick.bind(this);
    this._handleHover = this._handleHover.bind(this);
  }

  getSortIcon() {
    const { sorted, sortAscending, icons } = this.props;

    if (sorted) {
      return sortAscending ? icons.sortAscending : icons.sortDescending;
    }
  }

  render() {
    const style = this.props.styles.getStyle({
      useStyles: this.props.settings.useGriddleStyles,
      styles: this.props.styles.inlineStyles,
      styleName: 'columnTitle',
      mergeStyles: this.props.alignment || this.props.headerAlignment ?
        {textAlign: this.props.headerAlignment || this.props.alignment} :
        null
    });

    const { className } = getStyleProperties(this.props, 'tableHeadingCell');
    const { sorted } = this.props;

    return (
      <th
        key={this.props.column}
        style={style}
        onMouseOver={this._handleHover}
        onClick={this._handleClick}
        className={className}
      >
        {this.props.title} { this.getSortIcon() }
      </th>);
  }

  _handleHover() {
    this.props.headingHover(this.props.column);
  }

  _handleClick() {
    this.props.headingClick(this.props.column);
  }
}

TableHeadingCell.propTypes = {
  headingHover: React.PropTypes.func,
  headingClick: React.PropTypes.func,
  column: React.PropTypes.string,
  headerAlignment: React.PropTypes.oneOf(['left', 'right', 'center']),
  alignment: React.PropTypes.oneOf(['left', 'right', 'center']),
  sortAscending: React.PropTypes.bool,
  sorted: React.PropTypes.bool
};

export default TableHeadingCell;
