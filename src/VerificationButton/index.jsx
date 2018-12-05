import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";

import "./styles.css";

export default class VerificationButton extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    onVerify: PropTypes.func
  };

  static defaultProps = {
    onVerify: () => {}
  };

  constructor(props) {
    super(props);

    this.state = {
      verifying: false,
      verifiedValue: null,
      valid: false,
      magicUsed: false
    };
  }

  onClick = () => {
    if (this.state.verifying) return;

    this.setState({ verifying: true });
    const valueToValidate = this.props.value;

    axios.post(
      "http://verify.boole.shazz.me",
      valueToValidate,
      {
        headers: { "Content-type": "text/plain" }
      }
    )
    .then((response) => {
      const feedback = response.data;

      const valid =
        feedback.indexOf("\n- Failed\n") === -1
        && feedback.indexOf("BAD STRUCTURE:") === -1;

      const magicUsed =
        feedback.indexOf("\n-- Warning: magic rule has been used.\n") !== -1
        || feedback.indexOf("\n-- Warning: branch is open") !== -1;

      this.setState({ verifiedValue: valueToValidate, valid, magicUsed });
      this.props.onVerify(feedback);
    })
    .catch(() => {
      this.props.onVerify("Failed to verify (verification was not performed)!");
    })
    .finally(() => {
      this.setState({ verifying: false });
    });
  };
i
  render() {
    let verificationStatus = null;
    if (this.state.verifying) {
      verificationStatus = (
        <div
          className="verification-button-verifying"
          role="img"
          title="Verifying..."
          aria-label="Verifying..."
        />
      );
    } else if (this.state.verifiedValue === this.props.value) {
      if (this.state.valid) {
        if (this.state.magicUsed) {
          verificationStatus = (
            <span
              className="verification-button-symbol verification-button-magic-used"
              role="img"
              title="Valid (but magic was used)"
              aria-label="Valid (but magic was used)"
            >
              🎩
            </span>
          );
        } else {
          verificationStatus = (
            <span
              className="verification-button-symbol verification-button-valid"
              role="img"
              title="Valid"
              aria-label="Valid"
            >
              ✔
            </span>
          );
        }
      } else {
        verificationStatus = (
          <span
            className="verification-button-symbol verification-button-invalid"
            role="img"
            title="Invalid"
            aria-label="invalid"
          >
            ✖
          </span>
        );
      }
    }

    if (verificationStatus !== null) {
      verificationStatus = (
        <div
          className="verification-button-verification-status"
        >
          {verificationStatus}
        </div>
      );
    }

    return (
      <button
        className="verification-button"
        disabled={verificationStatus !== null}
        onClick={this.onClick}
      >
        <div
          className={verificationStatus !== null ? "verification-button-display-verification-status" : null}
        >
          <div className="verification-button-label">{this.props.children}</div>
          {verificationStatus}
        </div>
      </button>
    );
  }
}

