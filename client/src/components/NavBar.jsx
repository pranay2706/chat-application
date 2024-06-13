import { Container, Nav, Navbar, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Notifications from "./chat/Notification";

const NavBar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  return (
    <Navbar bg="dark" className="mb-4" style={{ height: "3.75rem" }}>
      <Container>
        <h2>
          <Link to="/" className="link-light text-decoration-none">
            ChatApp
          </Link>
        </h2>
        {user && (
          <span className="text-warning">Logged in as {user?.name}</span>
        )}
        <Stack direction="horizontal" gap={3}>
          <Notifications />
          {user && (
            <>
              <Link
                onClick={() => logoutUser()}
                to="/login"
                className="link-light text-decoration-none"
              >
                Logout
              </Link>
            </>
          )}

          {!user && (
            <>
              <Link to="/login" className="link-light text-decoration-none">
                Login
              </Link>
              <Link to="/register" className="link-light text-decoration-none">
                Register
              </Link>
            </>
          )}
        </Stack>
      </Container>
    </Navbar>
  );
};

export default NavBar;
