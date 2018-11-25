import React, { Component } from "react";
import PropTypes from "prop-types";
import AceEditor from "react-ace";
import "brace/theme/pastel_on_dark";
import "brace/ext/searchbox";

import "./styles.css";
import "./ace-mode-george";

export default class Editor extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    onValueChange: PropTypes.func
  };

  static defaultProps = {
    onValueChange: () => {}
  };

  render() {
    return (
      <div className="editor">
        <AceEditor
          width="100%"
          height="100%"
          mode="george"
          theme="pastel_on_dark"
          value={this.props.value}
          onChange={this.props.onValueChange}
          setOptions={{
            fontSize: 15,
            highlightActiveLine: false,
            fixedWidthGutter: true,
            useSoftTabs: true,
            tabSize: 4,
            selectionStyle: "line",
            behavioursEnabled: true,
            showLineNumbers: true,
            scrollPastEnd: true,
            displayIndentGuides: true
          }}
        />
      </div>
    );
  }
}

