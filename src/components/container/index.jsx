import React, { Component, PropTypes } from 'react';

export default class MainContainer extends Component {
  static propTypes = {
    initModule: PropTypes.func.isRequired,
  }
  
  constructor(props) {
    super(props);
    this.props.initModule();
  }
  
  render() {
    return (
      <div>
        template running
      </div>
    );
  }
}
