import React, { Component } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import styles from "./Modal.module.css";

const modalRoot = document.querySelector("#modal-root");

class Modal extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.onEscClick);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.onEscClick);
  }

  onEscClick = event => {
    if (event.code === "Escape") this.props.onClose();
  };

  onModalClick = event => {
    if (event.target === event.currentTarget) this.props.onClose();
  };

  render() {
    return createPortal(
      <div className={styles.Overlay} onClick={this.onModalClick}>
        <button
          type="button"
          className={styles.CloseModalBtn}
          onClick={() => {
            this.props.onClose();
          }}
        >
          X
        </button>
        <div className={styles.Modal}>{this.props.children}</div>
      </div>,
      modalRoot,
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func,
  children: PropTypes.node,
};

export default Modal;
