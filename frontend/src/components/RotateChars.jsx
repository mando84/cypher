function RotateChars({ rotateNum, setRotateNum, onClick }) {
  return (
    <>
      <h4>
        Enter the number of times to rotate each letter within the alphabet
      </h4>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          id="rotate"
          name="rotate"
          value={rotateNum}
          maxLength="2"
          style={{ width: 50 }}
          onChange={(e) => {
            setRotateNum(e.target.value);
          }}
        />
      </div>
      <button className="btn" onClick={onClick}>
        Rotate
      </button>
    </>
  );
}
export default RotateChars;
