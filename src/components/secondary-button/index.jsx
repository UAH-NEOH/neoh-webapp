import "./style.css";

const SecondaryButton = (props) => {
  const { id, Class, btnText, btnLink, disable } = props;
  return (
    <>
      {disable && (
        <button className="button_secondary_disabled" id={id} disabled>
          {btnText}
        </button>
      )}
      {!disable && (
        <button className={Class} id={id} onClick={btnLink}>
          {btnText}
        </button>
      )}
    </>
  );
};

// button_secondary

export default SecondaryButton;
