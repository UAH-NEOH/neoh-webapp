import "./style.css";

const Button = (props) => {
  const { id, btnText, btnLink } = props;
  return (
    <button className="button_primary" id={id} onClick={btnLink}>
      {btnText}
    </button>
  );
};

export default Button;
