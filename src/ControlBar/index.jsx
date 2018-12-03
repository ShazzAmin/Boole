import React, { Component } from "react";

import "./styles.css";

export default class ControlBar extends Component {
  render() {
    return (
      <div className="control-bar">
        {this.props.children}
      </div>
    );
  }
}

