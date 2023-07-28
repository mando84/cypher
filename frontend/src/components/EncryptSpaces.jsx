function EncryptSpaces({ onClick }) {
  return (
    <>
      <h4>This button encrypts or decrypts any spaces</h4>
      <div style={{ paddingBottom: "35px" }}>
        <button className="btn" onClick={onClick}>
          Encyrpt Spaces
        </button>
      </div>
    </>
  );
}
export default EncryptSpaces;
