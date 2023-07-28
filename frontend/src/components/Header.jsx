import { FaUserAlt, FaRegistered } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import { reset as resetMessages } from "../features/messages/messageSlice";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    console.log("before logout func");
    //dispatch(resetMessages());
    dispatch(logout());
    console.log("before reset func");
    dispatch(reset());

    console.log("before navigate func");
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/" style={{ fontSize: "30px" }}>
          Messages
        </Link>
      </div>
      <ul>
        {user ? (
          <li>
            <button className="btnLogout" onClick={onLogout}>
              Logout
            </button>
          </li>
        ) : (
          <>
            <li>
              <Link to="/login">
                <FaUserAlt />
                Login
              </Link>
            </li>
            <li>
              <Link to="/register">
                <FaRegistered />
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}
export default Header;
