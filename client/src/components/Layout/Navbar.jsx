import React, { useContext, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const { user, setShowLogin, logout, credit } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Generate", path: "/result" },
    { label: "Plans", path: "/buy" },
  ];

  const creditLabel = useMemo(() => {
    if (typeof credit === "number") {
      return `${credit} credit${credit === 1 ? "" : "s"}`;
    }
    return "Credits";
  }, [credit]);

  const handleNav = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-4 z-20 mb-6">
      <div className="flex items-center justify-between rounded-[28px] border border-white/60 bg-white/90 px-4 py-3 shadow-xl shadow-slate-900/5 backdrop-blur-2xl ring-1 ring-slate-100/80">
        <div className="flex items-center gap-3"> 
          <Link to="/" className="flex items-center gap-2">
            <img
              src={assets.logo}
              alt="Imagify logo"
              className="w-28 sm:w-32 lg:w-36"
            />
          </Link>
          <span className="hidden sm:inline-flex rounded-full border border-slate-200/80 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            AI Studio
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-500">
          {navLinks.map((link) => (
            <button
              key={link.path}
              onClick={() => handleNav(link.path)}
              className={`rounded-full px-4 py-2 transition ${
                isActive(link.path)
                  ? "bg-slate-900 text-white shadow-sm"
                  : "hover:text-slate-900"
              }`}
              aria-current={isActive(link.path) ? "page" : undefined}
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <button
                onClick={() => handleNav("/result")}
                className="hidden sm:flex rounded-full border border-transparent bg-gradient-to-r from-blue-500 to-purple-500 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:shadow-xl"
              >
                Generate
              </button>
              <button
                onClick={() => handleNav("/buy")}
                className="hidden sm:flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-600 transition hover:border-blue-200 hover:text-blue-600"
              >
                <img
                  src={assets.credit_star}
                  alt="credits"
                  className="w-4"
                />
                {creditLabel}
              </button>
              <div className="relative group">
                <button className="flex items-center gap-3 rounded-full border border-slate-200 bg-white/90 px-3 py-1.5 text-left shadow-sm transition hover:border-blue-200">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-slate-400">
                      Logged in
                    </p>
                    <p className="text-sm font-semibold text-slate-700">
                      {user.name || "Creator"}
                    </p>
                  </div>
                  <img
                    src={assets.profile_icon}
                    alt="user avatar"
                    className="h-10 w-10 drop-shadow"
                  />
                </button>
                <div className="invisible absolute right-0 mt-3 w-40 rounded-2xl border border-slate-200 bg-white p-2 text-sm text-slate-600 opacity-0 shadow-xl transition group-hover:visible group-hover:opacity-100">
                  <button
                    onClick={logout}
                    className="w-full rounded-xl px-3 py-2 text-left font-medium text-rose-500 transition hover:bg-rose-50"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <button
                onClick={() => handleNav("/buy")}
                className="hidden sm:inline-flex items-center gap-1 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-blue-200 hover:text-blue-600"
              >
                Pricing
              </button>
              <button
                onClick={() => handleNav("/result")}
                className="hidden sm:inline-flex rounded-full border border-transparent bg-gradient-to-r from-blue-500 to-purple-500 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:shadow-xl"
              >
                Generate
              </button>
              <button
                onClick={() => setShowLogin(true)}
                className="rounded-full border border-slate-200 px-6 py-2 text-sm font-semibold text-slate-800 transition hover:border-blue-200 hover:text-blue-600"
              >
                Login
              </button>
            </>
          )}

          <button
            className="inline-flex items-center justify-center rounded-full border border-slate-200 p-2 text-slate-600 md:hidden"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="mt-2 rounded-2xl border border-slate-200 bg-white/95 p-4 text-sm text-slate-600 shadow-lg shadow-slate-900/5 backdrop-blur-lg md:hidden">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => handleNav(link.path)}
                className={`text-left font-medium transition ${
                  isActive(link.path)
                    ? "text-blue-600"
                    : "hover:text-blue-600"
                }`}
              >
                {link.label}
              </button>
            ))}
            {!user && (
              <button
                onClick={() => {
                  setShowLogin(true);
                  setIsMenuOpen(false);
                }}
                className="rounded-full bg-slate-900 px-4 py-2 text-white"
              >
                Login
              </button>
            )}
            {user && (
              <button
                onClick={() => {
                  logout();
                  setIsMenuOpen(false);
                }}
                className="rounded-full border border-slate-200 px-4 py-2 text-rose-500"
              >
                Logout
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
