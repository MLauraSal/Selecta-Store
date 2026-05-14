import { Link } from "react-router-dom";
import { useState, useEffect, useRef, useContext } from "react";
import Search from "../components/header/Search";
import AuthContext from "../contexts/AuthContext.jsx";

export default function Header() {
  const { user } = useContext(AuthContext);

  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const [openCurrency, setOpenCurrency] = useState(false);
  const [openLanguage, setOpenLanguage] = useState(false);

  const mobileMenuRef = useRef(null);
  const currencyRef = useRef(null);
  const languageRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setOpenMobileMenu(false);
      }

      if (
        currencyRef.current &&
        !currencyRef.current.contains(event.target)
      ) {
        setOpenCurrency(false);
      }

      if (
        languageRef.current &&
        !languageRef.current.contains(event.target)
      ) {
        setOpenLanguage(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-primary border-b border-accent/20">
      <div className="header-top py-2 text-[12px] tracking-widest">
        <div className="container flex justify-between items-center mx-auto px-4">
          <div>
            <span className="text-accent">Contact:</span>

            <Link
              to="/contact"
              className="ml-2 text-white hover:text-accent transition-colors"
            >
              +1 (234) 2323-2323
            </Link>
          </div>

          <div className="flex items-center gap-4 relative">
            <button
              onClick={() => setOpenMobileMenu(!openMobileMenu)}
              ref={mobileMenuRef}
              className={`md:hidden relative transition-colors ${
                openMobileMenu
                  ? "text-accent"
                  : "text-white hover:text-accent"
              }`}
            >
              Links ▾
            </button>

            {openMobileMenu && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-primary border border-[#2A2A2A] rounded-xl shadow-lg z-50 md:hidden overflow-hidden">
                <div className="py-2">
                  <p className="px-4 py-2 font-semibold text-accent">
                    Currency
                  </p>

                  <a href="#" className="block px-4 py-2 hover:bg-accent hover:text-primary text-sm text-text">
                    EUR
                  </a>

                  <a href="#" className="block px-4 py-2 hover:bg-accent hover:text-primary text-sm text-text">
                    USD
                  </a>
                </div>

                <div className="py-2 border-t border-[#2A2A2A]">
                  <p className="px-4 py-2 font-semibold text-accent">
                    Language
                  </p>

                  <a href="#" className="block px-4 py-2 hover:bg-accent hover:text-primary text-text">
                    English
                  </a>

                  <a href="#" className="block px-4 py-2 hover:bg-accent hover:text-primary text-text">
                    French
                  </a>

                  <a href="#" className="block px-4 py-2 hover:bg-accent hover:text-primary text-text">
                    Spanish
                  </a>
                </div>
              </div>
            )}

            <div className="hidden md:flex items-center gap-3">
              <div className="relative" ref={currencyRef}>
                <button
                  onClick={() => setOpenCurrency(!openCurrency)}
                  className={`flex items-center gap-1 transition-colors ${
                    openCurrency
                      ? "text-accent"
                      : "text-white hover:text-accent"
                  }`}
                >
                  Currency ▾
                </button>

                {openCurrency && (
                  <div className="absolute right-0 mt-2 w-32 bg-primary text-text border border-[#2A2A2A] rounded-xl shadow-lg z-50 overflow-hidden">
                    <a href="#" className="block px-4 py-2 hover:bg-accent hover:text-primary text-sm">
                      EUR
                    </a>

                    <a href="#" className="block px-4 py-2 hover:bg-accent hover:text-primary text-sm">
                      USD
                    </a>
                  </div>
                )}
              </div>

              <div className="relative right-1" ref={languageRef}>
                <button
                  onClick={() => setOpenLanguage(!openLanguage)}
                  className={`flex items-center gap-1 transition-colors ${
                    openLanguage
                      ? "text-accent"
                      : "text-white hover:text-accent"
                  }`}
                >
                  Language ▾
                </button>

                {openLanguage && (
                  <div className="absolute right-0 mt-2 w-32 bg-primary text-text border border-[#2A2A2A] rounded-xl shadow-lg z-50 overflow-hidden">
                    <a href="#" className="block px-4 py-2 hover:bg-accent hover:text-primary">
                      English
                    </a>

                    <a href="#" className="block px-4 py-2 hover:bg-accent hover:text-primary">
                      French
                    </a>

                    <a href="#" className="block px-4 py-2 hover:bg-accent hover:text-primary">
                      Spanish
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="header-main items-center py-2 sm:py-3 bg-primary">
        <div className="container flex justify-between items-center w-full gap-4 sm:gap-0 mx-auto px-4">
          <div className="w-[55%] sm:w-[30%] flex justify-start sm:justify-center">
            <Link to="/">
              <img
                src="/img/logo.png"
                alt="logo"
                className="w-[180px] sm:w-[200px] h-auto max-h-[80px] object-contain"
              />
            </Link>
          </div>

          <div className="w-[40%] hidden md:flex px-4 ml-12 items-center justify-center">
            <Search />
          </div>

          <div className="w-[45%] sm:w-[30%] items-center justify-end py-3 flex">
            {!user ? (
              <>
                <Link
                  to="/login"
                  className="text-white hover:text-accent whitespace-nowrap border-r border-accent/30 px-2 transition-colors"
                >
                 Login
                </Link>

                <Link
                  to="/register"
                  className="ml-2 text-white hover:text-accent whitespace-nowrap transition-colors"
                >
                  Register
                </Link>
              </>
            ) : (
              <p className="text-white text-sm hidden sm:block">
                Hello,{" "}
                <span className="text-accent font-semibold">
                  {user.name || user.username || "User"}
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}