import React, { Component } from "react";
import AceEditor from "react-ace";
import "brace/theme/pastel_on_dark";

import "./ace-mode-george";

export default class Editor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "#u name\n#a 01\n\n#q 01\n\n#check PROP\n\na => b"
    };
  }

  render() {
    return (
      <AceEditor
        width="100%"
        height="100%"
        mode="george"
        theme="pastel_on_dark"
        value={this.state.value}
        onChange={(value) => this.setState({ value })}
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
    );
  }
}

