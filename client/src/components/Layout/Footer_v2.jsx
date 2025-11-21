import React from "react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-purple-50 via-pink-50 to-blue-50 border-t-2 border-purple-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Main Footer Content */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-6">
          {/* Logo and Brand Section */}
          <div className="flex flex-col items-center lg:items-start">
            <Link
              to="/"
              className="group transition-transform duration-300 hover:scale-105"
            >
              <img
                width={150}
                src={assets.logo}
                alt="Imagify Logo"
                className="transition-opacity duration-300 group-hover:opacity-80"
              />
            </Link>
            <p className="text-sm text-purple-600 font-medium mt-3 text-center lg:text-left">
              AI-Powered Image Generation
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center gap-6 text-sm font-medium">
            <Link
              to="/privacy"
              className="text-gray-700 hover:text-purple-600 transition-colors duration-300 hover:underline"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-gray-700 hover:text-purple-600 transition-colors duration-300 hover:underline"
            >
              Terms of Service
            </Link>
            <Link
              to="/support"
              className="text-gray-700 hover:text-purple-600 transition-colors duration-300 hover:underline"
            >
              Support
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-purple-600 transition-colors duration-300 hover:underline"
            >
              About
            </Link>
          </div>

          {/* Social Media Icons */}
          <div className="flex gap-4">
            <Link
              to={{ pathname: "https://www.facebook.com/" }}
              target="_blank"
              className="group p-3 rounded-full bg-white border-2 border-purple-200 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 hover:bg-purple-50 hover:border-purple-400"
            >
              <img
                width={24}
                height={24}
                src={assets.facebook_icon}
                alt="Facebook"
                className="transition-transform duration-300 group-hover:scale-110"
              />
            </Link>
            <Link
              to={{ pathname: "https://twitter.com/" }}
              target="_blank"
              className="group p-3 rounded-full bg-white border-2 border-purple-200 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 hover:bg-purple-50 hover:border-purple-400"
            >
              <img
                width={24}
                height={24}
                src={assets.twitter_icon}
                alt="Twitter"
                className="transition-transform duration-300 group-hover:scale-110"
              />
            </Link>
            <Link
              to={{ pathname: "https://www.instagram.com/" }}
              target="_blank"
              className="group p-3 rounded-full bg-white border-2 border-purple-200 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500"
            >
              <img
                width={24}
                height={24}
                src={assets.instagram_icon}
                alt="Instagram"
                className="transition-transform duration-300 group-hover:scale-110 group-hover:brightness-0 group-hover:invert"
              />
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t-2 border-purple-200 my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-600 text-center sm:text-left">
            © {currentYear}{" "}
            <span className="font-bold text-purple-700">
              MehulChauhan-07.dev
            </span>
            . All rights reserved.
          </p>

          <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
            <span>Made with</span>
            <span className="text-red-500 animate-pulse text-lg">❤️</span>
            <span>using React & AI</span>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-8 p-6 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl border-2 border-purple-200 shadow-lg">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <h4 className="font-bold text-purple-800 text-lg">
                Stay Updated
              </h4>
              <p className="text-sm text-purple-600 font-medium">
                Get notified about new features and updates
              </p>
            </div>
            <div className="flex gap-3 w-full sm:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 sm:w-64 px-4 py-3 text-sm border-2 border-purple-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-200 focus:border-purple-500 bg-white"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:scale-105 text-white text-sm font-bold rounded-xl transition-all duration-300 hover:shadow-xl shadow-lg shadow-purple-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
