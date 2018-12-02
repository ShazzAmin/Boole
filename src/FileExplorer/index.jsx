import React, { Component } from "react";
import PropTypes from "prop-types";

import "./styles.css";
import { File } from "../common/files";

export default class FileExplorer extends Component {
  static propTypes = {
    initialDirectories: PropTypes.array,
    openFile: PropTypes.instanceOf(File),
    onFileOpen: PropTypes.func
  };

  static defaultProps = {
    initialDirectories: [],
    openFile: null,
    onFileOpen: () => {}
  };

  constructor(props) {
    super(props);

    this.state = {
      directories: [...props.initialDirectories]
    };
  }

  toggleDirectoryExpanded = (directoryIndex) => {
    const directory = this.state.directories[directoryIndex];
    this.setState({
      directories: Object.assign([...this.state.directories], {
        [directoryIndex]: {
          ...directory,
          expanded: !directory.expanded
        }
      })
    });
  };

  openFile = (targetFile) => {
    if (targetFile === this.props.openFile) return;

    this.props.onFileOpen(targetFile);
  };

  render() {
    return (
      <ul className="file-explorer">
        {
          this.state.directories.map((directory, directoryIndex) => {
            return (
              <li key={directory.name}>
                <div
                  className="file-explorer-label"
                  onClick={() => this.toggleDirectoryExpanded(directoryIndex)}
                >
                  <span>{directory.expanded ? "▼" : "▶"} {directory.name}</span>
                </div>
                <ul className={directory.expanded ? "file-explorer-directory-expanded" : ""}>
                  {
                    directory.files.map((file, fileIndex) => {
                      return (
                        <li key={file.name}>
                          <div
                            className={"file-explorer-label" + (file === this.props.openFile ? " file-explorer-selected" : "")}
                            onClick={() => this.openFile(file)}
                          >
                            <span>{file.name}</span>
                          </div>
                        </li>
                      );
                    })
                  }
                </ul>
              </li>
            );
          })
        }
      </ul>
    );
  }
}

