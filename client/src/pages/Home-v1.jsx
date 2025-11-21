import React, { useState, useEffect, useRef } from "react";
import HeroSection from "../components/home/HeroSection";
import Steps from "../components/home/Steps";
import Description from "../components/home/Description";
import GeneratiomBtn from "../components/home/GeneratiomBtn";
import { useNavigate } from "react-router-dom";

import ClipdropTools from "../components/home/ClipdropTools";

const Home = () => {
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionsRef = useRef([]);
  const navigate = useNavigate();

  // Optional: if you have user context, you can pass real userId & creditBalance
  const [creditBalance, setCreditBalance] = useState(null);
  const userId = null; // TODO: plug in from your auth/AppContext if available

  // Intersection Observer for section animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections(
              (prev) => new Set([...prev, entry.target.dataset.section])
            );
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "-50px 0px",
      }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  // Scroll progress tracker
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const maxHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrolled / maxHeight) * 100;
      setScrollProgress(Math.min(progress, 100));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const addToRefs = (el, index) => {
    if (el) {
      sectionsRef.current[index] = el;
      el.dataset.section = index.toString();
    }
  };

  return (
    <div className="relative">
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200/50 dark:bg-gray-700/50 z-50">
        <div
          className="h-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 transition-all duration-300 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-12 pt-10 pb-16">
        {/* Hero Section */}
        <section
          ref={(el) => addToRefs(el, 0)}
          className={`transition-all duration-1000 ease-out ${
            visibleSections.has("0")
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <HeroSection />
        </section>

        {/* Section Divider */}
        <div className="relative py-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent"></div>
          </div>
          <div className="relative flex justify-center">
            <div className="bg-white dark:bg-gray-900 px-6 py-2 rounded-full border border-gray-200 dark:border-gray-700 shadow-md">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></span>
                <span>How it works</span>
              </div>
            </div>
          </div>
        </div>

        {/* Steps Section */}
        <section
          ref={(el) => addToRefs(el, 1)}
          className={`transition-all duration-1000 ease-out delay-200 ${
            visibleSections.has("1")
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <Steps />
        </section>

        {/* Section Divider */}
        <div className="relative py-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent"></div>
          </div>
          <div className="relative flex justify-center">
            <div className="bg-white dark:bg-gray-900 px-6 py-2 rounded-full border border-gray-200 dark:border-gray-700 shadow-md">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <span className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></span>
                <span>Learn more</span>
              </div>
            </div>
          </div>
        </div>

        {/* Description Section */}
        <section
          ref={(el) => addToRefs(el, 2)}
          className={`transition-all duration-1000 ease-out delay-400 ${
            visibleSections.has("2")
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <Description />
        </section>

        {/* Section Divider */}
        <div className="relative py-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent"></div>
          </div>
          <div className="relative flex justify-center">
            <div className="bg-white dark:bg-gray-900 px-6 py-2 rounded-full border border-gray-200 dark:border-gray-700 shadow-md">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <span className="w-2 h-2 bg-gradient-to-r from-pink-500 to-yellow-500 rounded-full animate-pulse"></span>
                <span>Imagify Studio · Tools</span>
              </div>
            </div>
          </div>
        </div>

        {/* Clipdrop tools (all 4) */}
        <section
          ref={(el) => addToRefs(el, 3)}
          className={`transition-all duration-1000 ease-out delay-600 ${
            visibleSections.has("3")
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <ClipdropTools
            userId={userId}
            creditBalance={creditBalance}
            onCreditUpdate={setCreditBalance}
          />
        </section>

        {/* Optional: keep original GeneratiomBtn below as a quick-start CTA */}
        <section className="pt-4">
          <GeneratiomBtn />
        </section>

        {/* Final Call-to-Action (unchanged except container padding) */}
        <section className="pt-4 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-pink-900/20 rounded-2xl p-8 border border-gray-200 dark:border-gray-800 shadow-sm">
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                Ready to Transform Your Ideas?
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                Join thousands of creators who are already using AI to bring
                their imagination to life. Start your creative journey today!
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button className="px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-semibold rounded-full hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                  🚀 Start Creating Now
                </button>
                <button
                  onClick={() => navigate("/buy")}
                  className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 font-semibold rounded-full border-2 border-gray-300 dark:border-gray-600 hover:border-purple-400 dark:hover:border-purple-500 transition-all duration-300"
                >
                  📋 View Pricing
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>No Credit Card Required</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Free Trial Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Cancel Anytime</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter section remains commented */}
      </main>
    </div>
  );
};

export default Home;
