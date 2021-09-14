import React, { Component } from "react";
import PropTypes from "prop-types";
import AceEditor from "react-ace";
import { UndoManager } from "brace";
import "brace/theme/idle_fingers";
import "brace/ext/searchbox";
import "ace-builds/src-noconflict/keybinding-vim";

import "./styles.css";
import "./ace-mode-george";
import "./ace-auto-complete-george";
export default class Editor extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    onValueChange: PropTypes.func,
    keyboardHandler: PropTypes.string.isRequired
  };

  static defaultProps = {
    onValueChange: () => {}
  };

  constructor(props) {
    super(props);

    this.aceEditor = React.createRef();
  }

  reset = () => {
    const editor = this.aceEditor.current.editor;

    editor.clearSelection();
    editor.scrollToLine(0);
    editor.getSession().setUndoManager(new UndoManager());
  };

  render() {
    return (
      <div className="editor">
        <AceEditor
          ref={this.aceEditor}
          width="100%"
          height="100%"
          mode="george"
          theme="idle_fingers"
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
            displayIndentGuides: true,
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true
          }}
          editorProps={{
            $blockScrolling: Infinity
          }}
          keyboardHandler={this.props.keyboardHandler}
        />
      </div>
    );
  }
}

