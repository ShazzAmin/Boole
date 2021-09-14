import React, { Component } from "react";
import PropTypes from "prop-types";
import LocalStorage from "../common/local-storage";

import "./styles.scss"

export default class KeyboardHandlerDropdown extends Component {
  static propTypes = {
    onKeyboardHandlerChange: PropTypes.func,
  };

  static defaultProps = {
    onKeyboardHandlerChange: () => {},
  };

  constructor(props) {
    super(props);

    this.dropdown = React.createRef();
  }

  componentDidMount = () => {
    LocalStorage.get("keyboard_handler")
      .then((keyboardHandler) => {
        if (keyboardHandler) {
          this.props.onKeyboardHandlerChange(keyboardHandler);
          this.dropdown.current.value = keyboardHandler;
        }
      })
      .catch(() => {});
  };

  handleChange = (e) => {
    this.props.onKeyboardHandlerChange(e.target.value);
    LocalStorage.set("keyboard_handler", e.target.value);
  };

  render() {
    return (
      <div className="keyboard-handler-dropdown">
        <label htmlFor="keyboard-handler">Key bindings:</label>
        <select
          name="keyboard-handler"
          onChange={this.handleChange}
          className="keyboard-handler-dropdown__select"
          ref={this.dropdown}
        >
          <option value="windows">Default</option>
          <option value="vim">Vim</option>
          <option value="emacs">Emacs</option>
        </select>
      </div>
    );
  }
}
