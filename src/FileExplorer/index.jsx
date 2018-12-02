import React, { Component } from "react";
import PropTypes from "prop-types";

import "./styles.css";

export default class FileExplorer extends Component {
  static propTypes = {
    initialDirectories: PropTypes.array,
    onFileOpen: PropTypes.func
  };

  static defaultProps = {
    initialDirectories: [],
    onFileOpen: () => {}
  };

  constructor(props) {
    super(props);

    this.state = {
      directories: [...props.initialDirectories]
    };
  }

  componentDidMount() {
    let fileIndex;
    const directoryIndex = this.state.directories.findIndex((directory) => {
      fileIndex = directory.files.findIndex((file) => {
        return file.open;
      });

      return fileIndex !== -1;
    });

    this.props.onFileOpen(this.state.directories[directoryIndex].files[fileIndex].file);
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

  openFile = async (targetDirectoryIndex, targetFileIndex) => {
    const targetFile = this.state.directories[targetDirectoryIndex].files[targetFileIndex];
    if (targetFile.open) return;

    try {
      await this.props.onFileOpen(targetFile.file)
      const directories = [...this.state.directories].map((directory, directoryIndex) => {
        return {
          ...directory,
          files: directory.files.map((file, fileIndex) => {
            return {
              ...file,
              open: file.file === targetFile.file
            };
          })
        };
      });
      this.setState({ directories });
    } catch {
      alert("Failed to open file!");
    }
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
                        <li key={file.file.name}>
                          <div
                            className={"file-explorer-label" + (file.open ? " file-explorer-selected" : "")}
                            onClick={() => this.openFile(directoryIndex, fileIndex)}
                          >
                            <span>{file.file.name}</span>
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

