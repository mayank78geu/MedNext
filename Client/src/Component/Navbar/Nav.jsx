import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { User, LogOut, Menu, X, ChevronDown, Settings, CreditCard } from "lucide-react";
import Logo from "./Logo";

/* ---------------- Desktop Menu ---------------- */
const DesktopMenu = () => {
  const links = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "For Hospital", path: "/for-hospital" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <div className="hidden md:flex items-center gap-1">
      {links.map((link) => (
        <NavLink
          key={link.name}
          to={link.path}
          className={({ isActive }) =>
            `px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 ${
              isActive
                ? "text-indigo-600 bg-indigo-50"
                : "text-slate-600 hover:text-indigo-600 hover:bg-slate-50"
            }`
          }
        >
          {link.name}
        </NavLink>
      ))}
    </div>
  );
};

/* ---------------- Mobile Menu ---------------- */
const MobileMenu = ({ open, setOpen }) => {
  const links = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "For Hospital", path: "/for-hospital" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={() => setOpen(false)}
        ></div>
      )}

      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white shadow-2xl z-50 transform transition-transform duration-500 cubic-bezier(0.16, 1, 0.3, 1) ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-slate-50">
          <Logo />
          <button 
            onClick={() => setOpen(false)}
            className="p-2 rounded-xl bg-slate-50 text-slate-500 hover:text-slate-900 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex flex-col gap-2 p-6">
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `px-5 py-4 rounded-2xl text-base font-bold transition-all ${
                  isActive
                    ? "text-indigo-600 bg-indigo-50"
                    : "text-slate-600 hover:bg-slate-50"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
};

/* ---------------- Nav ---------------- */
const Nav = () => {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  // ✅ JWT Auth
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const name = localStorage.getItem("name");

  const isLoggedIn = !!token;

  // Handle scroll for sticky effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Logout
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = () => setDropdownOpen(false);
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled 
          ? "py-3 bg-white/80 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-b border-slate-100" 
          : "py-5 bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-10">

        {/* Logo */}
        <Logo />

        {/* Desktop Menu */}
        <DesktopMenu />

        {/* Right Side */}
        <div className="flex gap-4 items-center">

          {isLoggedIn ? (
            <div className="relative">

              {/* User Trigger */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setDropdownOpen(!dropdownOpen);
                }}
                className="flex items-center gap-2 pl-2 pr-4 py-1.5 rounded-full bg-slate-50 border border-slate-100 hover:border-indigo-200 hover:bg-white transition-all group"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-blue-500 text-white flex items-center justify-center text-xs font-black shadow-lg shadow-indigo-200">
                  {name ? name.charAt(0).toUpperCase() : role?.charAt(0)}
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Authenticated</p>
                  <p className="text-xs font-bold text-slate-700 group-hover:text-indigo-600 transition-colors leading-none">
                    {name || "User"}
                  </p>
                </div>
                <ChevronDown size={14} className={`text-slate-400 transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Premium Dropdown */}
              {dropdownOpen && (
                <div
                  className="absolute right-0 mt-3 w-64 bg-white shadow-2xl rounded-[1.5rem] border border-slate-100 overflow-hidden z-50 animate-scaleIn origin-top-right"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="p-5 bg-slate-50/50 border-b border-slate-100">
                    <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-1">Profile Role</p>
                    <p className="text-sm font-black text-slate-800">{role}</p>
                  </div>

                  <div className="p-2">
                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        navigate("/profile");
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition-all"
                    >
                      <User size={18} /> Account Details
                    </button>
                    <button
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition-all"
                    >
                      <Settings size={18} /> Settings
                    </button>
                  </div>

                  <div className="p-2 border-t border-slate-50">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 transition-all"
                    >
                      <LogOut size={18} /> Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <NavLink
              to="/login"
              className="px-6 py-2.5 bg-indigo-600 text-white text-sm font-bold rounded-2xl hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-200 transition-all active:scale-95"
            >
              Sign In
            </NavLink>
          )}

          {/* Mobile Button */}
          <button 
            className="md:hidden p-2 rounded-xl bg-slate-50 text-slate-600" 
            onClick={() => setOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu open={open} setOpen={setOpen} />
    </header>
  );
};

export default Nav;