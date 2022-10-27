import PropTypes from "prop-types";
import btn from "./Module.Btn.css";

function Button({ text, clickFunction }) {
  return (
    <button onClick={clickFunction} className={btn.button}>
      {text}
    </button>
  );
}
Button.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Button;
