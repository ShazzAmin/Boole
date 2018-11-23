import React, { Component } from "react";

import "./styles.css";
import Editor from "../Editor";

export default class App extends Component {
  render() {
    return (
      <div className="full-page-container">
        <Editor/>
      </div>
    );
  }
}

