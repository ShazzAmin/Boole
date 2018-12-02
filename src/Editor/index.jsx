import React, { Component } from "react";
import PropTypes from "prop-types";
import AceEditor from "react-ace";
import { UndoManager } from "brace";
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

  constructor(props) {
    super(props);

    this.aceEditor = React.createRef();
  }

  clearHistory = () => {
    this.aceEditor.current.editor.getSession().setUndoManager(new UndoManager());
  };

  render() {
    return (
      <div className="editor">
        <AceEditor
          ref={this.aceEditor}
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
          editorProps={{
            $blockScrolling: Infinity
          }}
        />
      </div>
    );
  }
}

