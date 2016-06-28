import React, { Component, PropTypes } from 'react';

export default class MainContainer extends Component {
  static propTypes = {
    initModule: PropTypes.func.isRequired,
    testTypecheck: PropTypes.func.isRequired,
  }
  
  constructor(props) {
    super(props);
    this.props.initModule();
    this.props.testTypecheck(true, 'string');
  }
  
  render() {
    return (
      <div>
        template running
      </div>
    );
  }
}
