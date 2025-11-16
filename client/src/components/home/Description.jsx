import React, { useState, useEffect } from "react";
import { assets } from "../../assets/assets";

function Description() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredFeature, setHoveredFeature] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      icon: "🎨",
      title: "Creative Freedom",
      desc: "Unlimited artistic possibilities",
    },
    { icon: "⚡", title: "Lightning Fast", desc: "Generate images in seconds" },
    { icon: "🎯", title: "Precise Control", desc: "Fine-tune every detail" },
    {
      icon: "🌟",
      title: "Premium Quality",
      desc: "Professional-grade results",
    },
  ];

  const useCases = [
    "Product Visuals",
    "Character Designs",
    "Concept Art",
    "Marketing Materials",
    "Social Media Content",
    "Digital Illustrations",
  ];

  return (
    <div className="flex flex-col items-center justify-center my-24 p-6 md:px-28 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/50 dark:from-blue-900/10 dark:via-purple-900/10 dark:to-pink-900/10"></div>
      <div className="absolute top-0 left-1/4 w-32 h-32 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full blur-3xl opacity-20 animate-float"></div>
      <div className="absolute bottom-0 right-1/4 w-24 h-24 bg-gradient-to-r from-pink-200 to-yellow-200 rounded-full blur-2xl opacity-30 animate-float-delayed"></div>

      <div className="relative z-10 w-full max-w-7xl">
        {/* Enhanced Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="relative inline-block">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent mb-4 leading-tight">
              Create AI Images
            </h1>
            <div className="absolute -top-2 -right-2 text-2xl animate-bounce">
              ✨
            </div>
          </div>

          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Transform words into stunning visuals effortlessly with our
            <span className="font-semibold text-purple-600 dark:text-purple-400">
              {" "}
              cutting-edge AI technology
            </span>
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group ${
                  hoveredFeature === index
                    ? "scale-105 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/50 dark:to-blue-900/50"
                    : ""
                }`}
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <span className="text-lg group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </span>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {feature.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Section */}
        <div className="flex flex-col xl:gap-16 md:flex-row items-center gap-12">
          {/* Enhanced Image Section */}
          <div
            className={`relative group transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <img
                src={assets.sample_img_1}
                alt="AI Generated Sample"
                className="w-80 xl:w-96 rounded-2xl transform transition-all duration-500 group-hover:scale-105"
              />

              {/* Image Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>

              {/* Floating Badge */}
              <div className="absolute top-4 left-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-800 dark:text-gray-200 shadow-lg">
                <span className="text-green-500 mr-1">●</span>
                AI Generated
              </div>

              {/* Quality Indicators */}
              <div className="absolute bottom-4 right-4 flex gap-2">
                <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium">
                  4K
                </div>
                <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium">
                  HD
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full animate-pulse opacity-70"></div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full animate-pulse delay-300 opacity-70"></div>
          </div>

          {/* Enhanced Content Section */}
          <div
            className={`flex-1 transition-all duration-1000 delay-500 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}
          >
            <div className="relative">
              <h2 className="text-3xl lg:text-4xl font-bold max-w-lg mb-6 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent leading-tight">
                Introducing the AI-Powered Text to Image Generator
              </h2>

              {/* Enhanced Description */}
              <div className="space-y-4 mb-8">
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  Bring your ideas to life with our{" "}
                  <span className="font-semibold text-purple-600 dark:text-purple-400">
                    free AI image generator
                  </span>
                  . Whether you need stunning visuals or unique imagery, our
                  tool transforms your text into
                  <span className="font-semibold text-blue-600 dark:text-blue-400">
                    {" "}
                    eye-catching images
                  </span>{" "}
                  with just a few clicks.
                </p>

                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  Simply type in a text prompt, and our{" "}
                  <span className="font-semibold text-pink-600 dark:text-pink-400">
                    cutting-edge AI
                  </span>{" "}
                  will generate high-quality images in seconds. From product
                  visuals to character designs and portraits, even concepts that
                  don't yet exist can be visualized effortlessly.
                </p>
              </div>

              {/* Use Cases Grid */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                  Perfect for:
                </h3>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                  {useCases.map((useCase, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 p-3 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-lg hover:from-purple-50 hover:to-blue-50 dark:hover:from-purple-900/50 dark:hover:to-blue-900/50 transition-all duration-300 cursor-pointer group"
                    >
                      <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full group-hover:scale-125 transition-transform duration-300"></div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {useCase}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats Section */}
              <div className="grid grid-cols-3 gap-6 p-6 bg-gradient-to-r from-purple-50 via-blue-50 to-pink-50 dark:from-purple-900/20 dark:via-blue-900/20 dark:to-pink-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    50M+
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Images Generated
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    99.9%
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Uptime
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-pink-600 dark:text-pink-400">
                    5★
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    User Rating
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div
          className={`text-center mt-16 transition-all duration-1000 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full font-medium hover:shadow-lg transition-all duration-300 cursor-pointer group">
            <span>Ready to create?</span>
            <span className="group-hover:translate-x-1 transition-transform duration-300">
              →
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Description;
