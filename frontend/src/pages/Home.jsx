import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getMessages, reset } from "../features/messages/messageSlice";
import Spinner from "../components/Spinner";
import Messages from "../components/Messages";

function Home() {
  console.log("in home");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { messages, isLoading, isError, message } = useSelector(
    (state) => state.messages
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (!user) {
      console.log("in !user");
      navigate("/login");
      return;
    }

    dispatch(getMessages());

    return () => {
      dispatch(reset());
    };
  }, [user, message, isError, dispatch, navigate]);

  if (isLoading) {
    return <Spinner />;
  }

  const onClick = () => {
    navigate("/craftMessage");
  };
  if (messages.length > 0) {
    return (
      <>
        <button onClick={onClick} className="btn btn-block">
          Encrypt Message
        </button>
        <Messages messages={messages} />
      </>
    );
  } else {
    return (
      <>
        <button onClick={onClick} className="btn btn-block">
          Encrypt Message
        </button>
        <h1>No Encrypted Messages to Display</h1>;
      </>
    );
  }
}

export default Home;
