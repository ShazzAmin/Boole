import React, { Component } from "react";
import PropTypes from "prop-types";

import "./styles.css";
import Directories from "../common/directories";
import { File } from "../common/files";

export default class FileExplorer extends Component {
  static propTypes = {
    openFile: PropTypes.instanceOf(File),
    onFileOpen: PropTypes.func
  };

  static defaultProps = {
    openFile: null,
    onFileOpen: () => {}
  };

  constructor(props) {
    super(props);

    this.state = {
      directories: null
    };
  }

  async componentDidMount() {
    let directories = await Directories.get();
    this.props.onFileOpen(directories[0].files[0]);
    this.setState({ directories });
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

  reset = async (targetFile) => {
    if (!window.confirm("Are you sure you would like to reset this file?\nWARNING: You will lose all your changes for this file!")) return;

    await targetFile.reset();
    this.props.onFileOpen(targetFile);
  };

  render() {
    return (
      <ul className="file-explorer">
        {
          this.state.directories === null
          ? <div
              className="file-explorer-loading"
              role="img"
              title="Loading..."
              aria-label="Loading..."
            />
          : this.state.directories.map((directory, directoryIndex) => {
            return (
              <li key={directory.name}>
                <div
                  className="file-explorer-label"
                  onClick={() => this.toggleDirectoryExpanded(directoryIndex)}
                >
                  <span className="file-explorer-name">{directory.expanded ? "▼" : "▶"} {directory.name}</span>
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
                            <span className="file-explorer-name">{file.name}</span>
                            {
                              file === this.props.openFile
                              ? <span
                                  className="file-explorer-reset-button"
                                  role="img"
                                  title="Reset"
                                  aria-label="Reset"
                                  onClick={() => this.reset(file)}
                                >
                                  🔄
                                </span>
                              : null
                            }
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

