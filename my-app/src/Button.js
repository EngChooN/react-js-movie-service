import PropTypes from "prop-types";
import btn from "./Module.Btn.css";

function Button({ text }) {
  const onClickBtn = () => {
    console.log("Button Clicked!!");
  };

  return (
    <button onClick={onClickBtn} className="btn">
      {text}
    </button>
  );
}
Button.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Button;
