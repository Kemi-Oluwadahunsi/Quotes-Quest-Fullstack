import Logo from "/logo.png";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaTimesCircle } from "react-icons/fa";

const Navbar = ({ isAuthenticated, onSignOut }) => {
  const [navbar, setNavbar] = useState(false);

  return (
    <div className="grid grid-cols-9 lg:font-medium p-4 lg:px-16 py-3 bg-cyan-900 ">
      <Link to="/" className="lg:h-20">
        <img
          className="lg:w-20 lg:h-20 rounded-full"
          src={Logo}
          alt="qq-logo"
        />
      </Link>

      <section className="small-screen col-span-8 grid grid-cols-8 pl-[16rem] justify-center md:flex md:items-center relative">
        {/* Mobile view toggle button */}
        <div className="place-items-center  sm:mt-2 md:hidden absolute  z-50  right-0 ">
          <button
            className="p-2 rounded-md outline-none border flex  justify-center border-gray-400"
            onClick={() => setNavbar(!navbar)}
          >
            {navbar ? (
              <FaTimesCircle className="text-cyan-500  text-xl sm:text-3xl " />
            ) : (
              <GiHamburgerMenu className="text-cyan-500  text text-xl sm:text-3xl " />
            )}
          </button>
        </div>

        {/* Navigation links */}
        <div
          className={`top-0 md:ml-3 items-center lg:space-x-10 gap-4 md:col-span-6 ${
            navbar
              ? " mt-2 space-y-2 py-14 w-screen absolute top-10 flex flex-col md:flex-row z-50 bg-cyan-600"
              : "hidden md:flex"
          }`}
        >
          <Link
            to="/"
            className="md:mr-4 md:mb-0 mb-2 decoration-cyan-500 decoration-2 hover:underline hover:underline-offset-8 text-cyan-100"
          >
            Home
          </Link>
          <Link
            to="/howitworks"
            className="md:mr-4 md:mb-0 mb-2 decoration-cyan-500 decoration-2 hover:underline hover:underline-offset-8 text-cyan-100"
          >
            How it works
          </Link>
          <Link
            to="/getquotes"
            className="md:mr-4 md:mb-0 mb-2 decoration-cyan-500 decoration-2 hover:underline hover:underline-offset-8 text-cyan-100"
          >
            Get motivational quotes
          </Link>
          <Link
            to="/makedesigns"
            className="decoration-cyan-500 decoration-2 hover:underline hover:underline-offset-8 text-cyan-100"
          >
            Make your design
          </Link>
          {/* Sign in/out button */}
          {isAuthenticated ? (
            <button
              onClick={onSignOut}
              className={`md:ml-auto ${navbar ? "flex flex-col" : "hidden"}`}
            >
              Sign Out
            </button>
          ) : (
            <Link to="/login" className={`md:ml-auto ${navbar ? "" : ""}`}>
              <button className="text-center text-cyan-100 bg-cyan-700  w-25  md:w-30 px-8 py-2 md:py-2 lg:py-2 rounded-full    hover:scale-95">
                Sign In
              </button>
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  onSignOut: PropTypes.func.isRequired,
};

export default Navbar;
