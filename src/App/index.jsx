import React, { Component } from "react";

import "./styles.css";
import ControlBar from "../ControlBar";
import VerificationButton from "../VerificationButton";
import Editor from "../Editor";
import Output from "../Output";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "#u name\n#a 01\n\n#q 01\n\n#check PROP\n\na => b",
      feedback: "Click the \"Ask George\" button to get feedback.",
      feedbackExpanded: false
    };
  }

  render() {
    return (
      <div className={"app" + (this.state.feedbackExpanded ? " app-expand-feedback" : "")}>
        <ControlBar>
          <VerificationButton
            value={this.state.value}
            onVerify={(feedback) => this.setState({ feedback, feedbackExpanded: true })}
          >
            Ask George
          </VerificationButton>
        </ControlBar>
        <Editor
          value={this.state.value}
          onValueChange={(value) => this.setState({ value })}
        />
        <div
          className="app-feedback-collapse-control"
          onClick={() => this.setState({ feedbackExpanded: !this.state.feedbackExpanded })}
        >
          <span className="app-symbol">{this.state.feedbackExpanded ? "▼" : "▲"}</span>
          George Feedback
        </div>
        {this.state.feedbackExpanded ? <Output value={this.state.feedback} /> : null}
      </div>
    );
  }
}

