import { Link, useLocation } from "react-router-dom";
import LoginIcon from "../Icons/LoginIcon";
import { useAuth } from "../state/AuthContext";
import { CircleDot } from "tabler-icons-react";

export default function Header() {
  const location = useLocation();
  const isFeedPage = location.pathname === "/";
  const isSignInPage = location.pathname === "/signin";
  const isSignUpPage = location.pathname === "/signup";
  const { isAuthenticated, signOut } = useAuth();

  function navOption() {
    if (isSignInPage || isSignUpPage) {
      return <Link to="/">Back to Home</Link>;
    } else if (!isAuthenticated && isFeedPage) {
      return (
        <Link to="/signin" className="flex items-center gap-2">
          Login <LoginIcon />
        </Link>
      );
    } else {
      return <button onClick={signOut}>Logout</button>;
    }
  }

  return (
    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-gray-100 flex items-center justify-between">
      <div className="ml-4 px-4 py-3 flex items-center gap-2">
        <span className="h-5 w-5 rounded-full ml-2 text-gray-500">
          <CircleDot />
        </span>
        <span>foo-rum</span>
      </div>
      <nav className="flex items-center text-sm gap-2 mr-4">{navOption()}</nav>
    </header>
  );
}
