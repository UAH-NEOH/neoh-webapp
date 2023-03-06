import "./style.css";

const Card = (props) => {
  return (
    <div className="card_container">
      <div className="card_content">
        <div className="card_heading">{props.heading}</div>
        <div className="card_body">{props.body}</div>
        <div>{props.children}</div>
      </div>
    </div>
  );
};

export default Card;
