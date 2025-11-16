import React, { useState, useEffect, useRef } from "react";
import { assets, stepsData } from "../../assets/assets";

const Steps = () => {
  const [visibleSteps, setVisibleSteps] = useState([]);
  const [activeStep, setActiveStep] = useState(null);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          // Animate steps in sequence
          stepsData.forEach((_, index) => {
            setTimeout(() => {
              setVisibleSteps((prev) => [...prev, index]);
            }, index * 200);
          });
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleStepClick = (index) => {
    setActiveStep(activeStep === index ? null : index);
  };

  return (
    <div
      ref={sectionRef}
      className="flex flex-col items-center justify-center my-32 px-4 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/30 via-purple-50/20 to-pink-50/30 dark:from-indigo-900/10 dark:via-purple-900/10 dark:to-pink-900/10"></div>
      <div className="absolute top-10 right-1/4 w-20 h-20 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full blur-2xl opacity-30 animate-float"></div>
      <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-gradient-to-r from-pink-200 to-yellow-200 rounded-full blur-xl opacity-40 animate-float-delayed"></div>

      <div className="relative z-10 w-full max-w-5xl">
        {/* Enhanced Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="relative inline-block">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4 leading-tight">
              How It Works
            </h1>
            <div className="absolute -top-3 -right-3 text-2xl animate-bounce delay-300">
              🚀
            </div>
          </div>

          <p className="text-xl text-gray-600 dark:text-gray-300 mb-4 max-w-2xl mx-auto leading-relaxed">
            Transform words into stunning visuals in just
            <span className="font-semibold text-purple-600 dark:text-purple-400">
              {" "}
              three simple steps
            </span>
          </p>

          {/* Progress Indicator */}
          <div className="flex justify-center gap-2 mb-8">
            {stepsData.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-500 ${
                  visibleSteps.includes(index)
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 scale-110"
                    : "bg-gray-300 dark:bg-gray-600"
                }`}
              ></div>
            ))}
          </div>
        </div>

        {/* Enhanced Steps Container */}
        <div className="space-y-6 w-full max-w-4xl mx-auto">
          {stepsData.map((step, index) => (
            <div
              key={index}
              className={`group relative transition-all duration-700 ${
                visibleSteps.includes(index)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Step Number Badge */}
              <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 z-10">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white shadow-lg transition-all duration-300 ${
                    activeStep === index
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 scale-110"
                      : "bg-gradient-to-r from-indigo-500 to-purple-500 group-hover:scale-105"
                  }`}
                >
                  {index + 1}
                </div>
              </div>

              {/* Main Step Card */}
              <div
                className={`relative ml-8 p-6 md:p-8 border-2 rounded-2xl cursor-pointer transition-all duration-500 ${
                  activeStep === index
                    ? "border-purple-300 dark:border-purple-600 bg-gradient-to-r from-purple-50 via-pink-50 to-indigo-50 dark:from-purple-900/30 dark:via-pink-900/30 dark:to-indigo-900/30 shadow-2xl scale-[1.02]"
                    : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl hover:scale-[1.01] hover:border-purple-200 dark:hover:border-purple-700"
                }`}
                onClick={() => handleStepClick(index)}
                role="button"
                tabIndex={0}
                aria-expanded={activeStep === index}
                aria-label={`Step ${index + 1}: ${step.title}`}
              >
                {/* Glow Effect */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 opacity-0 blur-xl transition-opacity duration-500 ${
                    activeStep === index
                      ? "opacity-20"
                      : "group-hover:opacity-10"
                  }`}
                ></div>

                <div className="relative z-10 flex items-start gap-6">
                  {/* Enhanced Icon */}
                  <div
                    className={`relative p-4 rounded-xl transition-all duration-300 ${
                      activeStep === index
                        ? "bg-white/80 dark:bg-gray-800/80 shadow-lg scale-110"
                        : "bg-gray-50 dark:bg-gray-700 group-hover:bg-white dark:group-hover:bg-gray-600 group-hover:scale-105"
                    }`}
                  >
                    <img
                      src={step.icon}
                      alt={`${step.title} Icon`}
                      width="48"
                      height="48"
                      className={`transition-all duration-300 ${
                        activeStep === index
                          ? "scale-110"
                          : "group-hover:scale-105"
                      }`}
                    />

                    {/* Icon Glow */}
                    {activeStep === index && (
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-xl opacity-20 blur-md"></div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <h2
                        className={`text-xl md:text-2xl font-bold transition-colors duration-300 ${
                          activeStep === index
                            ? "bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
                            : "text-gray-800 dark:text-gray-200 group-hover:text-purple-600 dark:group-hover:text-purple-400"
                        }`}
                      >
                        {step.title}
                      </h2>

                      {/* Expand/Collapse Icon */}
                      <div
                        className={`transition-transform duration-300 ${
                          activeStep === index ? "rotate-180" : ""
                        }`}
                      >
                        <svg
                          className="w-6 h-6 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>

                    <p
                      className={`text-gray-600 dark:text-gray-300 leading-relaxed transition-all duration-300 ${
                        activeStep === index
                          ? "text-gray-700 dark:text-gray-200"
                          : ""
                      }`}
                    >
                      {step.description}
                    </p>

                    {/* Extended Content for Active Step */}
                    <div
                      className={`overflow-hidden transition-all duration-500 ${
                        activeStep === index
                          ? "max-h-32 opacity-100 mt-4"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg border border-purple-200 dark:border-purple-800">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
                            💡 Pro Tip:
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {index === 0 &&
                            "Be specific and descriptive in your prompts for better results. Include details about style, colors, and mood."}
                          {index === 1 &&
                            "Choose the right image size and quality settings based on your intended use case."}
                          {index === 2 &&
                            "Use our built-in editor to fine-tune your generated images before downloading."}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Interactive Particles */}
                {activeStep === index && (
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-4 right-4 w-2 h-2 bg-purple-400 rounded-full animate-ping"></div>
                    <div className="absolute bottom-4 left-4 w-1 h-1 bg-pink-400 rounded-full animate-ping delay-300"></div>
                  </div>
                )}
              </div>

              {/* Connection Line */}
              {index < stepsData.length - 1 && (
                <div className="absolute left-2 top-full w-0.5 h-6 bg-gradient-to-b from-purple-300 to-pink-300 dark:from-purple-600 dark:to-pink-600 z-0"></div>
              )}
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div
          className={`text-center mt-16 transition-all duration-1000 delay-1000 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group hover:scale-105">
            <span>Start Creating Now</span>
            <span className="group-hover:translate-x-1 transition-transform duration-300">
              ✨
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Steps;
