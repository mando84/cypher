function SwitchChar({
  message,
  setOriginalChar,
  originalChar,
  setNewChar,
  newChar,
  onClick,
}) {
  return (
    <>
      <h2>Encrypt Message</h2>
      <h3 className="messageEncryption">{message}</h3>
      <h4>Enter a character to switch with a second one.</h4>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          id="replaced"
          name="replaced"
          value={originalChar}
          style={{ width: "55px" }}
          placeholder="Old"
          onChange={(e) => setOriginalChar(e.target.value)}
        />
        <input
          type="text"
          className="form-control"
          id="new"
          name="new"
          value={newChar}
          style={{ width: "55px" }}
          placeholder="New"
          onChange={(e) => setNewChar(e.target.value)}
        />
      </div>
      <button className="btn" onClick={onClick}>
        Switch
      </button>
    </>
  );
}
export default SwitchChar;
