import { NavLink, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const isLogin = location.pathname.includes("login");
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">daisyUI</a>
      </div>
      <div className="flex-none">
        <ul className="menu-horizontal px-1">
          <li className="mx-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-orange-400" : "hover:text-orange-400"
              }
            >
              <span>Home</span>
            </NavLink>
          </li>
          {isLogin ? (
            <li className="mx-2">
              <NavLink
                to="/signup"
                className={({ isActive }) =>
                  isActive ? "text-orange-400" : "hover:text-orange-400"
                }
              >
                <span>Sign Up</span>
              </NavLink>
            </li>
          ) : (
            <li className="mx-2">
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? "text-orange-400" : "hover:text-orange-400"
                }
              >
                <span>Login</span>
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
