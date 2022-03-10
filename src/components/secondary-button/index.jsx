import "./style.css";

const SecondaryButton = (props) => {
  const { id, btnText, btnLink, disable } = props;
  return (
    <>
      {disable && (
        <button className="button_secondary_disabled" id={id} disabled>
          {btnText}
        </button>
      )}
      {!disable && (
        <button className="button_secondary" id={id} onClick={btnLink}>
          {btnText}
        </button>
      )}
    </>
  );
};

export default SecondaryButton;
