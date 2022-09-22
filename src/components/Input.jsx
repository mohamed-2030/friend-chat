import attach from "../img/attach.png";
import img from "../img/img.png";
const Input = () => {
  return (
    <div className="input">
      <input type="text" placeholder="Type something ..." />
      <div className="inputSend">
        <input type="file" id="img" style={{ display: "none" }} />
        <label htmlFor="img">
          <img src={attach} />
        </label>
        <label htmlFor="img">
          <img src={img} />
        </label>
        <button>Send</button>
      </div>
    </div>
  );
};

export default Input;
