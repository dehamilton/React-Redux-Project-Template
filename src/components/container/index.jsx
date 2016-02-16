import React, { Component, PropTypes } from 'react';

export default class MainContainer extends Component {

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
 
  static propTypes = {
    initModule: PropTypes.func.isRequired,
  }
}
