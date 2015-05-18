"use strict";

import React from 'react'

class Pagination extends React.Component {
  constructor(props, context) {
    super(props, context);

    this._handleChange = this._handleChange.bind(this);
  }

  render() {
    return (<div className="pagination">
      {this.props.hasPrevious ? <button onClick={this.context.getPreviousPage}>Previous</button> : null }
      {this._getSelect()}
      {this.props.hasNext ? <button onClick={this.context.getNextPage}>Next</button> : null }
    </div>);
  }

  _handleChange(e) {
    this.context.getPage(parseInt(e.target.value));
  }

  _getSelect() {
    //Make this nicer
    var options = [];

    for(var i = 1; i <= this.props.pageProperties.maxPage; i++) {
      options.push(<option value={i} key={i}>{i}</option>)
    }

    return <select onChange={this._handleChange} value={this.props.pageProperties.currentPage}>{options}</select>
  }
}

Pagination.contextTypes = {
  getNextPage: React.PropTypes.func,
  getPreviousPage: React.PropTypes.func,
  getPage: React.PropTypes.func
}

export default Pagination;
