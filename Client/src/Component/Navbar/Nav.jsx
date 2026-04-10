import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import Logo from "./Logo";

/* ---------------- Desktop Menu ---------------- */
const DesktopMenu = () => {
  const linkStyle = ({ isActive }) =>
    isActive
      ? "text-sky-500 font-semibold"
      : "text-[#64748B] hover:text-sky-500";

  return (
    <div className="hidden md:flex gap-6">
      <NavLink to="/" className={linkStyle}>
        <Button text="Home" />
      </NavLink>

      <NavLink to="/services" className={linkStyle}>
        <Button text="Services" />
      </NavLink>

      <NavLink to="/for-hospital" className={linkStyle}>
        <Button text="For Hospital" />
      </NavLink>

      <NavLink to="/about" className={linkStyle}>
        <Button text="About" />
      </NavLink>

      <NavLink to="/contact" className={linkStyle}>
        <Button text="Contact" />
      </NavLink>
    </div>
  );
};

/* ---------------- Mobile Menu ---------------- */
const MobileMenu = ({ open, setOpen }) => {
  const linkStyle = ({ isActive }) =>
    isActive ? "text-sky-500 font-semibold" : "text-[#64748B]";

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setOpen(false)}
        ></div>
      )}

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={() => setOpen(false)}>✖</button>
        </div>

        <div className="flex flex-col gap-5 px-6">
          <NavLink to="/" className={linkStyle}>
            <Button text="Home" />
          </NavLink>

          <NavLink to="/services" className={linkStyle}>
            <Button text="Services" />
          </NavLink>

          <NavLink to="/for-hospital" className={linkStyle}>
            <Button text="For Hospital" />
          </NavLink>

          <NavLink to="/about" className={linkStyle}>
            <Button text="About" />
          </NavLink>

          <NavLink to="/contact" className={linkStyle}>
            <Button text="Contact" />
          </NavLink>
        </div>
      </div>
    </>
  );
};

/* ---------------- Nav ---------------- */
const Nav = () => {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // ✅ JWT Auth
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const name = localStorage.getItem("name");

  const isLoggedIn = !!token;

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    navigate("/login");
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = () => setDropdownOpen(false);
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <header className="w-full bg-white/60 backdrop-blur-md border-b border-sky-200/50 sticky top-0 z-50 shadow-[0_1px_3px_rgba(0,0,0,0.05)] transition-all duration-300">
      <nav className="flex items-center justify-between px-4 md:px-10 py-3">

        {/* Logo */}
        <Logo />

        {/* Desktop Menu */}
        <DesktopMenu />

        {/* Right Side */}
        <div className="flex gap-3 items-center">

          {isLoggedIn ? (
            <div className="relative">

              {/* Avatar */}
              <div
                onClick={(e) => {
                  e.stopPropagation(); // prevent instant close
                  setDropdownOpen(!dropdownOpen);
                }}
                className="w-10 h-10 rounded-full bg-sky-500 text-white flex items-center justify-center cursor-pointer font-bold"
              >
                {name ? name.charAt(0).toUpperCase() : role?.charAt(0)}
              </div>

              {/* Dropdown */}
              {dropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-44 bg-white shadow-lg rounded-md border z-50"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="px-4 py-2 text-sm text-gray-500 border-b">
                    {name || "User"} ({role})
                  </div>

                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      navigate("/profile");
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Profile
                  </button>

                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      handleLogout();
                    }}
                    className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive
                  ? "bg-sky-500 text-white px-3 py-1 rounded-md"
                  : "text-sky-500 border border-sky-500 px-3 py-1 rounded-md"
              }
            >
              Login
            </NavLink>
          )}

          {/* Mobile Button */}
          <button className="md:hidden text-2xl" onClick={() => setOpen(true)}>
            ☰
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu open={open} setOpen={setOpen} />
    </header>
  );
};

export default Nav;