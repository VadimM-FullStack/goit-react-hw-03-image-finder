import PropTypes from "prop-types";
import styles from "./Button.module.css";

const Button = ({ onClick, children }) => (
  <button className={styles.Button} type="button" onClick={onClick}>
    {children}
  </button>
);

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
};
export default Button;
