function ScrambleNumsAndSymbols({ onClick }) {
  return (
    <>
      <h4>Press the button to mix numbers and punctuation marks.</h4>
      <button className="btn" onClick={onClick}>
        Mix Nums/Symbols
      </button>
    </>
  );
}
export default ScrambleNumsAndSymbols;
