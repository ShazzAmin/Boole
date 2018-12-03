import React, { Component } from "react";

import "./styles.css";

export default class ControlBar extends Component {
  render() {
    return (
      <div className="control-bar">
        <h1 className="control-bar-title">Boole</h1>
        <div className="control-bar-divider" />
        {this.props.children}
      </div>
    );
  }
}

