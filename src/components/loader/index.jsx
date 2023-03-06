import "./style.css";

const Loader = (props) => {
  return <div className="loading">{props.displayText}...</div>;
};

export default Loader;
