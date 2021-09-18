/* global gtag */

import React, { Component } from "react";

import "./styles.css";
import { download } from "../common/download";
import ControlBar from "../ControlBar";
import VerificationButton from "../VerificationButton";
import DownloadButton from "../DownloadButton";
import FileExplorer from "../FileExplorer";
import Editor from "../Editor";
import Output from "../Output";
import KeyboardHandlerDropdown, { KEYBOARD_HANDLER_DEFAULT } from "../KeyboardHandlerDropdown";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.editor = React.createRef();

    this.state = {
      value: "",
      feedback: "Click the \"Ask George\" button to get feedback.",
      feedbackExpanded: false,
      openFile: null,
      keyboardHandler: KEYBOARD_HANDLER_DEFAULT,
    };
  }

  onFileOpen = async (file) => {
    try {
      this.setState({ value: await file.get(), openFile: file });
    } catch {
      alert("Failed to open file!");
    }

    this.editor.current.reset();
  };

  onDownload = () => {
    gtag("event", "download", {
      "event_label": this.state.openFile.name,
    });

    download(this.state.openFile.name, this.state.value);
  };

  onValueChange = (value) => {
    this.setState({ value });
    if (this.state.openFile !== null) this.state.openFile.set(value);
  };

  onKeyboardHandlerChange = (keyboardHandler) => {
    this.setState({ keyboardHandler });
  }

  render() {
    return (
      <div className={"app" + (this.state.feedbackExpanded ? " app-expand-feedback" : "")}>
        <div className="app-title">
          Boole
        </div>

        <div className="app-control-bar">
          <ControlBar>
            <VerificationButton
              value={this.state.value}
              onVerify={(feedback) => this.setState({ feedback, feedbackExpanded: true })}
            >
              Ask George
            </VerificationButton>

            <DownloadButton
              onDownload={this.onDownload}
            />

            <KeyboardHandlerDropdown 
              onKeyboardHandlerChange={this.onKeyboardHandlerChange}
            />
          </ControlBar>
        </div>

        <div className="app-file-explorer">
          <FileExplorer
            openFile={this.state.openFile}
            onFileOpen={this.onFileOpen}
          />
        </div>

        <div className="app-editor">
          <Editor
            ref={this.editor}
            value={this.state.value}
            onValueChange={this.onValueChange}
            keyboardHandler={this.state.keyboardHandler}
          />
        </div>

        <div
          className="app-feedback-control"
          onClick={() => this.setState({ feedbackExpanded: !this.state.feedbackExpanded })}
        >
          <span className="app-symbol">{this.state.feedbackExpanded ? "▼" : "▲"}</span>
          George Feedback
        </div>

        <div className="app-feedback"><Output value={this.state.feedback} /></div>
      </div>
    );
  }
}

