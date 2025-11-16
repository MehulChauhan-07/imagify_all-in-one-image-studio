import React, { useState, useEffect, useContext } from "react";
import { assets } from "../../assets/assets.js";
import { AppContext } from "../../context/AppContext.jsx";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredImage, setHoveredImage] = useState(null);

  const { user, setShowLogin } = useContext(AppContext);
  const navigate = useNavigate();

  const onClickHandler = () => {
    if (user) {
      navigate("/result");
    } else {
      setShowLogin(true);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative flex flex-col justify-center items-center text-center py-20 overflow-hidden">
      {/* Simplified Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-purple-50/10 to-pink-50/20 dark:from-blue-900/10 dark:via-purple-900/5 dark:to-pink-900/10"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Optimized Badge */}
        <div
          className={`transition-all duration-700 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
          }`}
        >
          <div className="relative group">
            <div className="text-gray-700 dark:text-gray-300 inline-flex text-center gap-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-6 py-2 rounded-full border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <p className="font-semibold text-sm">
                🏆 Best Text to Image Generator
              </p>
              <img
                src={assets.star_icon}
                alt="Star"
                className="w-4 h-4 group-hover:scale-110 transition-transform duration-200"
              />
            </div>
          </div>
        </div>

        {/* Simplified Main Heading */}
        <div
          className={`transition-all duration-700 delay-200 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl max-w-[90%] sm:max-w-4xl mx-auto mt-12 text-center font-bold leading-tight">
            <span className="text-gray-900 dark:text-gray-100">
              Turn Text to{" "}
            </span>
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              image
            </span>
            <span className="text-gray-900 dark:text-gray-100">
              , in seconds
            </span>
          </h1>
        </div>

        {/* Simplified Description */}
        <div
          className={`transition-all duration-700 delay-300 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-center max-w-2xl mx-auto mt-8 text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
            🎨 <span className="font-semibold">Unleash your creativity</span>{" "}
            with AI. Transform your imagination into{" "}
            <span className="text-purple-600 dark:text-purple-400 font-semibold">
              stunning visual art
            </span>{" "}
            in seconds.
          </p>
        </div>

        {/* Optimized CTA Button */}
        <div
          className={`transition-all duration-700 delay-400 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="mt-12">
            <button
              onClick={onClickHandler}
              className="group relative sm:text-lg text-white bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 px-12 py-4 flex items-center gap-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 mx-auto"
            >
              <span>Generate Images</span>
              <img
                className="h-5 w-5 group-hover:rotate-12 transition-transform duration-200"
                src={assets.star_icon}
                alt="Generate"
              />
            </button>
          </div>
        </div>

        {/* Optimized Sample Gallery */}
        <div
          className={`transition-all duration-700 delay-500 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="mt-20">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-8">
              ✨ See what others have created
            </h3>

            <div className="flex flex-wrap justify-center gap-4 mb-6">
              {Array(6)
                .fill(" ")
                .map((item, index) => (
                  <div
                    key={index}
                    className="relative group cursor-pointer"
                    onMouseEnter={() => setHoveredImage(index)}
                    onMouseLeave={() => setHoveredImage(null)}
                  >
                    <div className="relative overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                      <img
                        className={`w-20 sm:w-28 md:w-32 h-20 sm:h-28 md:h-32 object-cover transition-transform duration-300 ${
                          hoveredImage === index ? "scale-110" : "scale-100"
                        }`}
                        src={
                          index % 2 === 0
                            ? assets.sample_img_2
                            : assets.sample_img_1
                        }
                        alt={`AI Sample ${index + 1}`}
                      />

                      {/* Simple Overlay */}
                      {hoveredImage === index && (
                        <div className="absolute inset-0 bg-black/20 flex items-end p-2">
                          <span className="text-white text-xs font-medium bg-black/50 px-2 py-1 rounded">
                            AI Generated
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
            </div>

            <div className="flex items-center justify-center gap-2 mt-6">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-sm">
                    ⭐
                  </span>
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-400 font-medium text-sm">
                Join{" "}
                <span className="text-purple-600 dark:text-purple-400 font-bold">
                  50,000+
                </span>{" "}
                creators
              </p>
            </div>
          </div>
        </div>

        {/* Simplified Feature Cards */}
        <div
          className={`transition-all duration-700 delay-600 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-300">
              <div className="text-2xl mb-2">⚡</div>
              <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">
                Lightning Fast
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Generate in seconds
              </p>
            </div>

            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-300">
              <div className="text-2xl mb-2">🎯</div>
              <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">
                High Quality
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Professional results
              </p>
            </div>

            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-300">
              <div className="text-2xl mb-2">🔥</div>
              <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">
                Easy to Use
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                No skills required
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
