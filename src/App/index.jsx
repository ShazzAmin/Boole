import React, { Component } from "react";

import "./styles.css";
import { DefaultFile, RemoteFile } from "./files";
import ControlBar from "../ControlBar";
import VerificationButton from "../VerificationButton";
import FileExplorer from "../FileExplorer";
import Editor from "../Editor";
import Output from "../Output";

export default class App extends Component {
  static assignments = [6, 6, 4, 5, 4, 5, 1, 3].map((numQuestions, assignmentNumber) => {
    assignmentNumber++;

    return {
      name: `Assignment ${assignmentNumber}`,
      questions: Array.from({ length: numQuestions }, (_, questionNumber) => {
        questionNumber++;

        const paddedAssignmentNumber = assignmentNumber.toString().padStart(2, "0");
        const paddedQuestionNumber = questionNumber.toString().padStart(2, "0");
        const fileName = `a${paddedAssignmentNumber}q${paddedQuestionNumber}.grg`;
        const filePath = `/asn/a${paddedAssignmentNumber}grg/${fileName}`;
        return { fileName, filePath };
      })
    };
  });

  static homeworks = Array.from({ length: 11 }, (_, homeworkNumber) => {
    homeworkNumber++;

    const paddedHomeworkNumber = homeworkNumber.toString().padStart(2, "0");
    const fileName = `h${paddedHomeworkNumber}.grg`;
    const filePath = `/hmwk/se212-h${paddedHomeworkNumber}-ques.grg`;
    return { fileName, filePath };
  });

  constructor(props) {
    super(props);

    this.state = {
      value: "",
      feedback: "Click the \"Ask George\" button to get feedback.",
      feedbackExpanded: false,
      openFile: null
    };

    this.initialDirectories = [
      {
        name: "Miscellaneous",
        expanded: true,
        files: [
          {
            file: new DefaultFile("scratchpad.grg", "#u name\n#a 01\n\n#q 01\n\n#check PROP\n\na => b"),
            open: true
          }
        ]
      }
    ].concat(App.assignments.map((assignment) => {
      return {
        name: assignment.name,
        expanded: false,
        files: assignment.questions.map((question) => {
          return {
            file: new RemoteFile(question.fileName, question.filePath),
            open: false
          };
        })
      };
    })).concat([{
      name: "Homeworks",
      expanded: false,
      files: App.homeworks.map((homework) => {
        return {
          file: new RemoteFile(homework.fileName, homework.filePath),
          open: false
        };
      })
    }]);
  }

  onFileOpen = async (file) => {
    return new Promise(async (resolve) => {
      this.setState({ value: await file.get(), openFile: file }, resolve);
    });
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
            initialDirectories={this.initialDirectories}
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

