import MessageItem from "./MessageItem";

function Messages({ messages }) {
  return (
    <>
      {messages.map((message) => (
        <MessageItem key={message._id} message={message} />
      ))}
    </>
  );
}
export default Messages;
