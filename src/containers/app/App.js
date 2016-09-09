/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-filename-extension */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
// import Main from '../../components/Main';

class Main extends Component {

  static propTypes = {
    children: PropTypes.any.isRequired,
  }

  render() {
    return (
      <div>
          {/* this will render the child routes */}
          {React.cloneElement(this.props.children, this.props)}
      </div>
    );
  }
}

function mapStateToProps(/* state */) {
  return {};
}

export default connect(mapStateToProps)(Main);
