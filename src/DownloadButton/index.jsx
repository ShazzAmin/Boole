import React, { Component } from "react";
import PropTypes from "prop-types";

import "./styles.css";

export default class DownloadButton extends Component {
  static propTypes = {
    onDownload: PropTypes.func
  };

  static defaultProps = {
    onDownload: () => {}
  };

  render() {
    return (
      <button
        className="download-button"
        onClick={this.props.onDownload}
      >
        Download
      </button>
    );
  }
}

