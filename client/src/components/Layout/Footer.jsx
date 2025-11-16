import React from "react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 border-t border-gray-200 dark:border-gray-700 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Main Footer Content */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-4">
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
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center lg:text-left">
              AI-Powered Image Generation
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <Link
              to="/privacy"
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 hover:underline"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 hover:underline"
            >
              Terms of Service
            </Link>
            <Link
              to="/support"
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 hover:underline"
            >
              Support
            </Link>
            <Link
              to="/about"
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 hover:underline"
            >
              About
            </Link>
          </div>

          {/* Social Media Icons */}
          <div className="flex gap-4">
            <Link
              to={{ pathname: "https://www.facebook.com/" }}
              target="_blank"
              className="group p-2 rounded-full bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 hover:bg-blue-50 dark:hover:bg-blue-900/30"
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
              className="group p-2 rounded-full bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 hover:bg-blue-50 dark:hover:bg-blue-900/30"
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
              className="group p-2 rounded-full bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500"
            >
              <img
                width={24}
                height={24}
                src={assets.instagram_icon}
                alt="Instagram"
                className="transition-transform duration-300 group-hover:scale-110"
              />
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 dark:border-gray-700 my-6"></div>

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center sm:text-left">
            © {currentYear}{" "}
            <span className="font-medium text-gray-700 dark:text-gray-300">
              MehulChauhan-07.dev
            </span>
            . All rights reserved.
          </p>

          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <span>Made with</span>
            <span className="text-red-500 animate-pulse">❤️</span>
            <span>using React & AI</span>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Stay Updated
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Get notified about new features and updates
              </p>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 sm:w-64 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              />
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors duration-300 hover:shadow-md">
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
