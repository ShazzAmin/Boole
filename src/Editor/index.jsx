import React, { Component } from "react";
import AceEditor from "react-ace";
import "brace/theme/pastel_on_dark";

import "./ace-mode-george";

export default class Editor extends Component {
  render() {
    return (
      <AceEditor
        width="100%"
        height="100%"
        mode="george"
        theme="pastel_on_dark"
        setOptions={{
          fontSize: 15,
          highlightActiveLine: false,
          fixedWidthGutter: true,
          useSoftTabs: true,
          tabSize: 4,
          selectionStyle: "line",
          behavioursEnabled: true,
          showLineNumbers: true,
          displayIndentGuides: true
        }}
      />
    );
  }
}

