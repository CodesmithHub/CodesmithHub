import React, { Component } from 'react';

class Button extends Component {

  render() {
    return (
      <div
        className="btn btn-lg button-active" 
        onClick={() => {this.props.action(this.props.text)}} >
        {this.props.text}
      </div>
    );
  }
}

export default Button;
