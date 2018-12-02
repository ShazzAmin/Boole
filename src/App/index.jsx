import React, { Component } from "react";

import "./styles.css";
import initialDirectories from "../common/directories";
import ControlBar from "../ControlBar";
import VerificationButton from "../VerificationButton";
import FileExplorer from "../FileExplorer";
import Editor from "../Editor";
import Output from "../Output";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
      feedback: "Click the \"Ask George\" button to get feedback.",
      feedbackExpanded: false,
      openFile: null
    };
  }

  onFileOpen = async (file) => {
    try {
      this.setState({ value: await file.get(), openFile: file });
    } catch {
      alert("Failed to open file!");
    }
  };

  onValueChange = (value) => {
    this.setState({ value });
    this.state.openFile.set(value);
  };

  render() {
    return (
      <div className={"app" + (this.state.feedbackExpanded ? " app-expand-feedback" : "")}>
        <div className="app-control-bar">
          <ControlBar>
            <VerificationButton
              value={this.state.value}
              onVerify={(feedback) => this.setState({ feedback, feedbackExpanded: true })}
            >
              Ask George
            </VerificationButton>
          </ControlBar>
        </div>

        <div className="app-file-explorer">
          <FileExplorer
            initialDirectories={initialDirectories}
            openFile={this.state.openFile}
            onFileOpen={this.onFileOpen}
          />
        </div>

        <div className="app-editor">
          <Editor
            value={this.state.value}
            onValueChange={this.onValueChange}
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

