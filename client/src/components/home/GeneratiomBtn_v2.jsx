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
    if (user) {
      navigate("/result");
    } else {
      setShowLogin(true);
    }
  };

  return (
    <div className="pb-20 text-center relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-50 via-blue-50 to-pink-50 opacity-60"></div>

      {/* Floating Elements */}
      <div className="absolute top-10 left-1/4 w-4 h-4 bg-purple-400 rounded-full animate-bounce delay-100 opacity-50"></div>
      <div className="absolute top-20 right-1/4 w-3 h-3 bg-blue-400 rounded-full animate-bounce delay-300 opacity-50"></div>
      <div className="absolute bottom-20 left-1/3 w-2 h-2 bg-pink-400 rounded-full animate-bounce delay-500 opacity-50"></div>

      <div className="relative z-10">
        {/* Enhanced Heading */}
        <div className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl mt-6 font-bold py-8 md:py-16 leading-tight">
          <span className="block mb-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-fade-in-up">
            See the magic of
          </span>
          <span className="inline-flex items-center gap-4 animate-fade-in-up delay-200">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-transparent bg-clip-text">
              AI
            </span>
            <span className="text-3xl animate-spin-slow">✨</span>
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-transparent bg-clip-text">in action</span>
          </span>
          <span className="block mt-4 text-xl md:text-2xl lg:text-3xl font-semibold text-gray-600 animate-fade-in-up delay-400">
            Try it now and create stunning visuals!
          </span>
        </div>

        {/* Stats or Features */}
        <div className="flex justify-center gap-8 mb-10 text-sm md:text-base flex-wrap">
          <div className="flex items-center gap-2 text-gray-700 font-medium">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span>Fast Generation</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700 font-medium">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-100"></div>
            <span>High Quality</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700 font-medium">
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-200"></div>
            <span>AI Powered</span>
          </div>
        </div>

        {/* Enhanced Button Container */}
        <div className="relative inline-block">
          {/* Glow Effect */}
          <div
            className={`absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-75 blur-xl transition-all duration-500 ${
              isHovered ? "scale-110 opacity-100" : "scale-100 opacity-50"
            }`}
          ></div>

          {/* Main Button */}
          <button
            className={`relative inline-flex items-center gap-4 px-10 md:px-14 py-5 rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-bold text-xl md:text-2xl shadow-2xl transition-all duration-300 group ${
              isClicked
                ? "scale-95"
                : isHovered
                ? "scale-110 shadow-3xl"
                : "scale-100"
            }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleClick}
          >
            {/* Button Content */}
            <span className="flex items-center gap-4">
              <span className="relative">
                Generate Images
                <span className="absolute inset-0 bg-white/20 rounded transform scale-0 group-hover:scale-100 transition-transform duration-300"></span>
              </span>

              {/* Animated Icon */}
              <div className="relative">
                <img
                  src={assets.star_group}
                  alt="Stars"
                  className={`h-7 md:h-8 transition-all duration-300 ${
                    isHovered ? "rotate-12 scale-110" : "rotate-0 scale-100"
                  }`}
                />
                {isHovered && (
                  <div className="absolute inset-0 animate-ping">
                    <img
                      src={assets.star_group}
                      alt=""
                      className="h-7 md:h-8 opacity-60"
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
        <p className="mt-8 text-base md:text-lg text-gray-600 max-w-md mx-auto leading-relaxed">
          Transform your ideas into stunning visuals with our advanced AI
          technology.
          <span className="text-purple-600 font-bold">
            {" "}
            No design skills required!
          </span>
        </p>

        {/* Progress Indicators */}
        <div className="flex justify-center gap-2 mt-10">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-100"></div>
          <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse delay-200"></div>
        </div>
      </div>
    </div>
  );
};

export default GeneratiomBtn;
