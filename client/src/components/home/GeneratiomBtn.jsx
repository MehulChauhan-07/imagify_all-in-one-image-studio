import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

const GeneratiomBtn = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const { user, setShowLogin } = useContext(AppContext);

  const navigate = useNavigate();

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 200);
    // Add your generation logic here
    if (user) {
      navigate("/result");
    } else {
      setShowLogin(true);
    }
  };
  const onClickHandler = () => {
    if (user) {
      navigate("/result");
    } else {
      setShowLogin(true);
    }
  };

  return (
    <div className="pb-16 text-center relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-50 via-blue-50 to-pink-50 dark:from-purple-900/20 dark:via-blue-900/20 dark:to-pink-900/20 opacity-50"></div>

      {/* Floating Elements */}
      <div className="absolute top-10 left-1/4 w-4 h-4 bg-purple-300 rounded-full animate-bounce delay-100 opacity-60"></div>
      <div className="absolute top-20 right-1/4 w-3 h-3 bg-blue-300 rounded-full animate-bounce delay-300 opacity-60"></div>
      <div className="absolute bottom-20 left-1/3 w-2 h-2 bg-pink-300 rounded-full animate-bounce delay-500 opacity-60"></div>

      <div className="relative z-10">
        {/* Enhanced Heading */}
        <div className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl mt-4 font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 py-6 md:py-16 leading-tight">
          <span className="block mb-2 animate-fade-in-up">
            See the magic of
          </span>
          <span className="inline-flex items-center gap-3 animate-fade-in-up delay-200">
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-transparent bg-clip-text">
              AI
            </span>
            <span className="text-2xl animate-spin-slow">✨</span>
            <span>in action</span>
          </span>
          <span className="block mt-2 text-lg md:text-xl lg:text-2xl font-medium text-gray-600 dark:text-gray-300 animate-fade-in-up delay-400">
            Try it now and create stunning visuals!
          </span>
        </div>

        {/* Stats or Features */}
        <div className="flex justify-center gap-8 mb-8 text-sm md:text-base">
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Fast Generation</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-100"></div>
            <span>High Quality</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-200"></div>
            <span>AI Powered</span>
          </div>
        </div>

        {/* Enhanced Button Container */}
        <div className="relative inline-block">
          {/* Glow Effect */}
          <div
            className={`absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 opacity-75 blur-lg transition-all duration-500 ${
              isHovered ? "scale-110 opacity-100" : "scale-100 opacity-50"
            }`}
          ></div>

          {/* Main Button */}
          <button
            className={`relative inline-flex items-center gap-3 px-8 md:px-12 py-4 rounded-full bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 text-white font-semibold text-lg md:text-xl shadow-xl transition-all duration-300 group ${
              isClicked
                ? "scale-95"
                : isHovered
                ? "scale-105 shadow-2xl"
                : "scale-100"
            }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            // onClick={handleClick}
            onClick={onClickHandler}
          >
            {/* Button Content */}
            <span className="flex items-center gap-3">
              <span className="relative">
                Generate Images
                <span className="absolute inset-0 bg-white/20 rounded transform scale-0 group-hover:scale-100 transition-transform duration-300"></span>
              </span>

              {/* Animated Icon */}
              <div className="relative">
                <img
                  src={assets.star_group}
                  alt="Stars"
                  className={`h-6 md:h-7 transition-all duration-300 ${
                    isHovered ? "rotate-12 scale-110" : "rotate-0 scale-100"
                  }`}
                />
                {isHovered && (
                  <div className="absolute inset-0 animate-ping">
                    <img
                      src={assets.star_group}
                      alt=""
                      className="h-6 md:h-7 opacity-60"
                    />
                  </div>
                )}
              </div>
            </span>

            {/* Shimmer Effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 group-hover:animate-shimmer"></div>
          </button>

          {/* Click Ripple Effect */}
          {isClicked && (
            <div className="absolute inset-0 rounded-full border-2 border-white/50 animate-ping"></div>
          )}
        </div>

        {/* Call to Action Text */}
        <p className="mt-6 text-sm md:text-base text-gray-500 dark:text-gray-400 max-w-md mx-auto leading-relaxed">
          Transform your ideas into stunning visuals with our advanced AI
          technology.
          <span className="text-purple-600 dark:text-purple-400 font-medium">
            {" "}
            No design skills required!
          </span>
        </p>

        {/* Progress Indicators */}
        <div className="flex justify-center gap-2 mt-8">
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-100"></div>
          <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse delay-200"></div>
        </div>
      </div>
    </div>
  );
};

export default GeneratiomBtn;
