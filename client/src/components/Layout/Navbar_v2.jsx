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

  const onClickHandler = () => {
    if (user) {
      navigate("/result");
    } else {
      setShowLogin(true);
    }
  };

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

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Generate", path: "/result" },
    { label: "Plans", path: "/buy" },
  ];

  return (
    <header className="sticky top-4 z-20 mb-6">
      <div className="flex items-center justify-between rounded-[28px] border-2 border-purple-200 bg-white/95 px-5 py-3.5 shadow-xl shadow-purple-100 backdrop-blur-2xl">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2">
            <img
              src={assets.logo}
              alt="Imagify logo"
              className="w-28 sm:w-32 lg:w-36"
            />
          </Link>
          <span className="hidden sm:inline-flex rounded-full border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-purple-600">
            AI Studio
          </span>
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <button
                onClick={onClickHandler}
                className="hidden sm:flex rounded-full border-2 border-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-purple-300 transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                Generate
              </button>
              <button
                onClick={() => handleNav("/buy")}
                className="hidden sm:flex items-center gap-2 rounded-full border-2 border-purple-200 bg-purple-50 px-4 py-2 text-xs font-bold text-purple-700 transition-all duration-200 hover:border-purple-400 hover:bg-purple-100"
              >
                <img src={assets.credit_star} alt="credits" className="w-4" />
                {creditLabel}
              </button>
              <div className="relative group">
                <button className="flex items-center gap-3 rounded-full border-2 border-purple-200 bg-white px-3 py-1.5 text-left shadow-sm transition-all duration-200 hover:border-purple-400 hover:shadow-md">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-purple-600 font-bold">
                      Logged in
                    </p>
                    <p className="text-sm font-bold text-gray-800">
                      {user.name || "Creator"}
                    </p>
                  </div>
                  <img
                    src={assets.profile_icon}
                    alt="user avatar"
                    className="h-10 w-10 drop-shadow"
                  />
                </button>
                <div className="invisible absolute right-0 mt-3 w-40 rounded-2xl border-2 border-purple-200 bg-white p-2 text-sm opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:opacity-100">
                  <button
                    onClick={logout}
                    className="w-full rounded-xl px-3 py-2 text-left font-bold text-rose-500 transition-all duration-200 hover:bg-rose-50"
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
                className="hidden sm:inline-flex items-center gap-1 rounded-full border-2 border-purple-200 bg-purple-50 px-5 py-2 text-sm font-bold text-purple-700 transition-all duration-200 hover:border-purple-400 hover:bg-purple-100"
              >
                Pricing
              </button>
              <button
                onClick={onClickHandler}
                className="hidden sm:inline-flex rounded-full border-2 border-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-purple-300 transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                Generate
              </button>
              <button
                onClick={() => setShowLogin(true)}
                className="rounded-full border-2 border-purple-300 bg-white px-6 py-2 text-sm font-bold text-purple-700 transition-all duration-200 hover:border-purple-400 hover:bg-purple-50"
              >
                Login
              </button>
            </>
          )}

          <button
            className="inline-flex items-center justify-center rounded-full border-2 border-purple-200 bg-purple-50 p-2 text-purple-700 md:hidden"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="mt-2 rounded-2xl border-2 border-purple-200 bg-white/95 p-4 text-sm shadow-lg shadow-purple-100 backdrop-blur-lg md:hidden">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => handleNav(link.path)}
                className={`text-left font-bold transition-all duration-200 ${
                  isActive(link.path) ? "text-purple-600" : "text-gray-700 hover:text-purple-600"
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
                className="rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 px-4 py-2 text-white font-bold"
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
                className="rounded-full border-2 border-rose-200 px-4 py-2 text-rose-500 font-bold hover:bg-rose-50"
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
