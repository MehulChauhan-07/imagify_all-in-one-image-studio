import React, { useState, useEffect, useRef } from "react";
// import HeroSection from "../components/home/HeroSection";
// import Steps from "../components/home/Steps";
// import Description from "../components/home/Description";
// import GeneratiomBtn from "../components/home/GeneratiomBtn";
import HeroSection from "../components/home/HeroSection_v2";
import Steps from "../components/home/Steps_v2";
import Description from "../components/home/Description_v2";
import GeneratiomBtn from "../components/home/GeneratiomBtn_v2";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../components/ui/card";
import { Input } from "../components/ui/input";

const Home = () => {
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionsRef = useRef([]);
  const navigate = useNavigate();

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

  // Feature cards data
  const features = [
    {
      icon: "🎨",
      title: "Unlimited Creativity",
      description: "Generate unlimited images with our AI-powered platform",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: "⚡",
      title: "Lightning Fast",
      description: "Get your images in seconds, not minutes",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: "🎯",
      title: "High Precision",
      description: "Advanced AI models for accurate results",
      gradient: "from-orange-500 to-red-500",
    },
    {
      icon: "🔒",
      title: "Secure & Private",
      description: "Your data is encrypted and never shared",
      gradient: "from-green-500 to-emerald-500",
    },
  ];

  // Testimonials data
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Digital Artist",
      content: "This tool has revolutionized my creative workflow. Absolutely amazing!",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Marketing Director",
      content: "We've created hundreds of stunning visuals for our campaigns. Game changer!",
      rating: 5,
    },
    {
      name: "Emma Williams",
      role: "Content Creator",
      content: "The quality and speed are unmatched. Highly recommend to everyone!",
      rating: 5,
    },
  ];

  return (
    <div className="relative">
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200/50 dark:bg-gray-700/50 z-50">
        <div
          className="h-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 transition-all duration-300 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

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

      {/* Premium Features Grid Section */}
      <section
        ref={(el) => addToRefs(el, 1)}
        className={`py-20 px-4 transition-all duration-1000 ease-out delay-100 ${
          visibleSections.has("1")
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              Why Choose Imagify?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Powerful features designed to bring your creative vision to life
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 hover:border-purple-300 dark:hover:border-purple-600 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900"
              >
                <CardHeader>
                  <div className={`text-5xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className={`h-1 w-full bg-gradient-to-r ${feature.gradient} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Section Divider */}
      <div className="relative py-12">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-300 dark:via-purple-600 to-transparent"></div>
        </div>
        <div className="relative flex justify-center">
          <div className="bg-white dark:bg-gray-900 px-8 py-3 rounded-full border-2 border-purple-200 dark:border-purple-700 shadow-lg backdrop-blur-sm">
            <div className="flex items-center gap-3 text-sm font-medium text-gray-700 dark:text-gray-300">
              <span className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></span>
              <span>How it works</span>
            </div>
          </div>
        </div>
      </div>

      {/* Steps Section */}
      <section
        ref={(el) => addToRefs(el, 2)}
        className={`transition-all duration-1000 ease-out delay-200 ${
          visibleSections.has("2")
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        }`}
      >
        <Steps />
      </section>

      {/* Enhanced Section Divider */}
      <div className="relative py-12">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-pink-300 dark:via-pink-600 to-transparent"></div>
        </div>
        <div className="relative flex justify-center">
          <div className="bg-white dark:bg-gray-900 px-8 py-3 rounded-full border-2 border-pink-200 dark:border-pink-700 shadow-lg backdrop-blur-sm">
            <div className="flex items-center gap-3 text-sm font-medium text-gray-700 dark:text-gray-300">
              <span className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></span>
              <span>Learn more</span>
            </div>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <section
        ref={(el) => addToRefs(el, 3)}
        className={`transition-all duration-1000 ease-out delay-400 ${
          visibleSections.has("3")
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        }`}
      >
        <Description />
      </section>

      {/* Testimonials Section with Cards */}
      <section
        ref={(el) => addToRefs(el, 4)}
        className={`py-20 px-4 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/50 dark:from-blue-900/10 dark:via-purple-900/10 dark:to-pink-900/10 transition-all duration-1000 ease-out delay-500 ${
          visibleSections.has("4")
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent mb-4">
              Loved by Creators Worldwide
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              See what our community has to say about their experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700"
              >
                <CardHeader>
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-lg">⭐</span>
                    ))}
                  </div>
                  <CardDescription className="text-base text-gray-700 dark:text-gray-300 italic leading-relaxed">
                    "{testimonial.content}"
                  </CardDescription>
                </CardHeader>
                <CardFooter className="flex flex-col items-start">
                  <p className="font-semibold text-gray-900 dark:text-gray-100">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-purple-600 dark:text-purple-400">
                    {testimonial.role}
                  </p>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Section Divider */}
      <div className="relative py-12">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-orange-300 dark:via-orange-600 to-transparent"></div>
        </div>
        <div className="relative flex justify-center">
          <div className="bg-white dark:bg-gray-900 px-8 py-3 rounded-full border-2 border-orange-200 dark:border-orange-700 shadow-lg backdrop-blur-sm">
            <div className="flex items-center gap-3 text-sm font-medium text-gray-700 dark:text-gray-300">
              <span className="w-3 h-3 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full animate-pulse"></span>
              <span>Get started</span>
            </div>
          </div>
        </div>
      </div>

      {/* Generation Button Section */}
      <section
        ref={(el) => addToRefs(el, 5)}
        className={`transition-all duration-1000 ease-out delay-600 ${
          visibleSections.has("5")
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        }`}
      >
        <GeneratiomBtn />
      </section>

      {/* Premium CTA Section with Card */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <Card className="border-0 shadow-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white overflow-hidden relative">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>
            
            <CardHeader className="relative z-10 text-center pb-4">
              <CardTitle className="text-4xl md:text-5xl font-bold mb-4 text-white">
                Ready to Transform Your Ideas?
              </CardTitle>
              <CardDescription className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
                Join thousands of creators who are already using AI to bring their
                imagination to life. Start your creative journey today!
              </CardDescription>
            </CardHeader>

            <CardContent className="relative z-10 flex flex-col items-center gap-6 pt-4">
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full">
                <Button
                  size="lg"
                  className="px-10 py-6 bg-white text-purple-600 hover:bg-gray-100 font-bold text-lg rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  🚀 Start Creating Now
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate("/buy")}
                  className="px-10 py-6 bg-transparent border-2 border-white text-white hover:bg-white hover:text-purple-600 font-bold text-lg rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  📋 View Pricing
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap justify-center gap-8 text-sm text-white/90 font-medium pt-4">
                <div className="flex items-center gap-2">
                  <span className="text-green-300 text-lg">✓</span>
                  <span>No Credit Card Required</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-300 text-lg">✓</span>
                  <span>Free Trial Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-300 text-lg">✓</span>
                  <span>Cancel Anytime</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Newsletter Section with Card */}
      <section className="py-16 px-4 mb-12">
        <div className="max-w-3xl mx-auto">
          <Card className="border-2 border-purple-200 dark:border-purple-700 shadow-xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                Stay Updated with AI Innovations
              </CardTitle>
              <CardDescription className="text-base text-gray-600 dark:text-gray-300">
                Get weekly tips, tutorials, and exclusive updates about AI image generation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 h-12 text-base border-2 border-purple-200 dark:border-purple-700 focus:border-purple-500 dark:focus:border-purple-400"
                />
                <Button
                  size="lg"
                  className="h-12 px-8 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Subscribe
                </Button>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
                🔒 No spam, unsubscribe at any time. We respect your privacy.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Home;
