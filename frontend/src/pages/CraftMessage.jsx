import { useDispatch } from "react-redux";
import { useState } from "react";
import { createMessage } from "../features/messages/messageSlice";
import SwitchChar from "../components/SwitchChar";
import RotateChars from "../components/RotateChars";
import ScrambleNumsAndSymbols from "../components/ScrambleNumsAndSymbols";
import EncryptSpaces from "../components/EncryptSpaces";

function Message() {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [originalChar, setOriginalChar] = useState("");
  const [newChar, setNewChar] = useState("");
  const [messageDone, setMessageDone] = useState(false);
  const [rotateNum, setRotateNum] = useState(0);
  const [replacedSpaces, setReplacedSpaces] = useState(false);
  const [spaceIdxs, setSpaceIdxs] = useState([]);
  const [key, setKey] = useState([]);

  const onClick = () => {
    if (message !== "") {
      setMessageDone(true);
    }
  };

  const onClick2 = () => {
    let idxsChanged = [];
    let messageNewArr = message.split("").map((char, idx) => {
      if (char === originalChar) {
        idxsChanged.push(idx);
        return newChar;
      }
      return char;
    });
    setMessage(messageNewArr.join(""));
    setKey([...key, ["switch", originalChar, idxsChanged]]);
    setOriginalChar("");
    setNewChar("");
  };

  const onClick3 = () => {
    setRotateNum(Number(rotateNum));

    let newMessageArr = message.split("").map((char) => {
      let leftover;
      if (char.codePointAt() >= 65 && char.codePointAt() <= 90) {
        if (Number(char.codePointAt()) + Number(rotateNum) > 90) {
          leftover = Number(char.codePointAt()) + Number(rotateNum) - 90;
          return String.fromCharCode(leftover + 64);
        } else {
          return String.fromCharCode(
            Number(char.codePointAt()) + Number(rotateNum)
          );
        }
      } else if (char.codePointAt() >= 97 && char.codePointAt() <= 122) {
        if (Number(char.codePointAt()) + Number(rotateNum) > 122) {
          leftover = Number(char.codePointAt()) + Number(rotateNum) - 122;
          return String.fromCharCode(leftover + 96);
        } else {
          return String.fromCharCode(
            Number(char.codePointAt()) + Number(rotateNum)
          );
        }
      } else {
        return char;
      }
    });
    setKey([...key, ["rotate", rotateNum]]);
    setMessage(newMessageArr.join(""));
    setRotateNum(0);
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  };

  const onClick4 = () => {
    let original = [];
    let shuffled = [];
    for (let i = 33; i < 65; i++) {
      original.push(String.fromCharCode(i));
      shuffled.push(String.fromCharCode(i));
    }

    for (let i = 91; i < 97; i++) {
      original.push(String.fromCharCode(i));
      shuffled.push(String.fromCharCode(i));
    }

    for (let i = 123; i < 127; i++) {
      original.push(String.fromCharCode(i));
      shuffled.push(String.fromCharCode(i));
    }

    shuffleArray(shuffled);
    let newIdx;
    let messageIdxs = [];
    let messageChars = [];
    let newMessageArr = message.split("").map((char, idx) => {
      if (
        (char.codePointAt() >= 33 && char.codePointAt() <= 64) ||
        (char.codePointAt() >= 91 && char.codePointAt() <= 96) ||
        (char.codePointAt() >= 123 && char.codePointAt() <= 126)
      ) {
        newIdx = original.indexOf(char);
        messageIdxs.push(idx);
        messageChars.push(original[newIdx]);
        return shuffled[newIdx];
      } else {
        return char;
      }
    });

    setKey([...key, ["replaceNumSym", messageChars, messageIdxs]]);
    setMessage(newMessageArr.join(""));
  };

  const getRandom = () => {
    return Math.floor(Math.random() * 93) + 34;
  };

  const onClick5 = () => {
    let idxs = [];
    let newChs = [];
    if (replacedSpaces === false) {
      let messageArr = message.split("").map((char, idx) => {
        if (char === " ") {
          idxs.push(idx);
          newChs.push(String.fromCharCode(getRandom()));
          return newChs[newChs.length - 1];
        } else {
          return char;
        }
      });

      setReplacedSpaces(true);

      if (spaceIdxs.length === 0) {
        setSpaceIdxs(idxs);
      }
      setMessage(messageArr.join(""));
    } else {
      let newMessage = message.split("").map((char, idx) => {
        if (spaceIdxs.includes(idx)) return " ";
        return char;
      });
      setReplacedSpaces(false);
      setMessage(newMessage.join(""));
    }

    setKey([...key, ["spaces", idxs, newChs]]);
  };

  const dispatchMessages = () => {
    const messageObj = {
      encryptedMessage: message,
      messageKey: key,
    };
    dispatch(createMessage(messageObj));
    setMessageDone(false);
  };

  if (messageDone === false) {
    return (
      <>
        <h2>Type Message to Encrypt</h2>
        <textarea
          onChange={(e) => setMessage(e.target.value)}
          rows={8}
          cols={80}
        />
        <button className="btn" onClick={onClick}>
          ENCRYPT
        </button>
      </>
    );
  } else {
    return (
      <>
        <SwitchChar
          message={message}
          setOriginalChar={setOriginalChar}
          originalChar={originalChar}
          setNewChar={setNewChar}
          newChar={newChar}
          onClick={onClick2}
        />

        <RotateChars
          rotateNum={rotateNum}
          setRotateNum={setRotateNum}
          onClick={onClick3}
        />

        <ScrambleNumsAndSymbols onClick={onClick4} />

        <EncryptSpaces onClick={onClick5} />

        <div style={{ paddingBottom: "35px" }}>
          <button className="btn btn-block" onClick={dispatchMessages}>
            Submit the Encrypted Message and Key
          </button>
        </div>
      </>
    );
  }
}
export default Message;
