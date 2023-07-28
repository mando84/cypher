import { deleteMessage } from "../features/messages/messageSlice";
import { useDispatch } from "react-redux";
import { decrypt } from "../decryptMethods/decryptMethods";
import { useEffect, useState } from "react";
import { MessageContext } from "../App";

function MessageItem({ message }) {
  const [decrypted, setDecrypted] = useState(false);

  let decryptedMessage = decrypt(message.message, message.key);

  const dispatch = useDispatch();

  if (decrypted === false) {
    return (
      <div className="message">
        <h3>
          Created on {new Date(message.createdAt).toLocaleString("en-US")}
        </h3>
        <p>{message.message}</p>
        <button
          className="btnItem"
          style={{ backgroundColor: "green" }}
          onClick={() => {
            setDecrypted(!decrypted);
          }}
        >
          Decrypt
        </button>
        <button
          className="btnItem"
          onClick={() => dispatch(deleteMessage(message._id))}
        >
          Delete
        </button>
      </div>
    );
  } else {
    return (
      <div className="message">
        <h3>
          Created on {new Date(message.createdAt).toLocaleString("en-US")}
        </h3>
        <p>{decryptedMessage}</p>
        <button
          className="btnItem2"
          onClick={() => {
            setDecrypted(!decrypted);
          }}
        >
          Encrypt
        </button>
        <button
          className="btnItem"
          onClick={() => dispatch(deleteMessage(message._id))}
        >
          Delete
        </button>
      </div>
    );
  }
}
export default MessageItem;
