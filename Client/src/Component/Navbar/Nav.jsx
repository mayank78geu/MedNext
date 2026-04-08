import { useState } from "react";
import Button from "../Button/Button";
import { Link, NavLink } from "react-router-dom";

/* ---------------- Logo ---------------- */
const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <img
        src="https://tailwindcss.com/plus-assets/img/logos/mark.svg"
        alt="logo"
        className="h-8"
      />
      <span className="font-bold text-xl text-[#0c1a2e]">MedNext</span>
    </div>
  );
};

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

  return (
    <header className="w-full bg-white border border-sky-200 sticky top-0 z-50 shadow-sm">
      <nav className="flex items-center justify-between px-4 md:px-10 py-3">
        {/* Logo */}
        <Logo />

        {/* Desktop Menu */}
        <DesktopMenu />

        {/* Right Side */}
        <div className="flex gap-3 items-center">
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
