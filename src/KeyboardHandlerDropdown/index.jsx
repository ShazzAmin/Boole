import React, { Component } from "react";
import PropTypes from "prop-types";
import LocalStorage from "../common/local-storage";

import "./styles.scss";

const KEYBINDINGS = [
  {
    value: "sublime",
    name: "Default",
  },
  {
    value: "vim",
    name: "Vim",
  },
  {
    value: "emacs",
    name: "Emacs",
  },
];

export const KEYBOARD_HANDLER_DEFAULT = KEYBINDINGS[0].value;

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

  handleChange = (keyboardHandler) => {
    this.props.onKeyboardHandlerChange(keyboardHandler);
    LocalStorage.set("keyboard_handler", keyboardHandler);
  };

  async componentDidMount() {
    let keyboardHandler;
    try {
      keyboardHandler = await LocalStorage.get("keyboard_handler");
      if (KEYBINDINGS.findIndex(({ value }) => value === keyboardHandler) === -1) {
        // if set to invalid value, set to default
        keyboardHandler = KEYBOARD_HANDLER_DEFAULT;
      }
    } catch {
      // if not set, set to default
      keyboardHandler = KEYBOARD_HANDLER_DEFAULT;
    }

    this.dropdown.current.value = keyboardHandler;
    this.handleChange(keyboardHandler);
  };

  render() {
    return (
      <select
        name="keyboard-handler"
        onChange={e => this.handleChange(e.target.value)}
        className="keyboard-handler-dropdown"
        ref={this.dropdown}
      >
        {KEYBINDINGS.map(({ value, name }) => <option key={value} value={value}>{name} Keybindings</option>)}
      </select>
    );
  }
}
