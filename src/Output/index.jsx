import React, { Component } from "react";
import PropTypes from "prop-types";

import "./styles.css";

export default class Output extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired
  };

  render() {
    return (
      <textarea
        className="output"
        readOnly={true}
        value={this.props.value}
      />
    );
  }
}

