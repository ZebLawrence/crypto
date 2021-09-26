import React, { Component } from 'react';

class RouteError extends Component {

  constructor(props){
    super(props);

    this.state = {
      defaultMessage: 'This is the message from class RouteError construction'
    };
  }

  render() {
    console.log('This is the RouteError render method');
    console.log(this.props);

    return (
        <div>
            The ErrorPage page
            <p>{this.state.defaultMessage}</p>
        </div>
    );
  }
}

export default RouteError;
