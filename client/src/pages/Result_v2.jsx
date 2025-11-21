import React, { useContext, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const promptIdeas = [
  "Futuristic cityscape at dusk with flying cars",
  "Surreal forest made of glowing glass trees",
  "Portrait of an astronaut in watercolor style",
];

const Result = () => {
  const [image, setImage] = useState(assets.sample_img_1);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);

  const { generateImage, credit, user, setShowLogin } = useContext(AppContext);

  const helperText = useMemo(() => {
    if (!user) return "Login to generate AI images.";
    if (credit === false) return "Loading your credits...";
    if (credit === 0) return "You are out of credits. Purchase more to continue.";
    return `You have ${credit} credit${credit > 1 ? "s" : ""} remaining.`;
  }, [credit, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!prompt.trim()) {
      toast.error("Please describe what you want to generate.");
      return;
    }

    if (!user) {
      setShowLogin(true);
      return;
    }

    setLoading(true);
    const nextImage = await generateImage(prompt);
    if (nextImage) {
      setImage(nextImage);
      setHasGenerated(true);
    }
    setLoading(false);
  };

  const handleReset = () => {
    setPrompt("");
    setHasGenerated(false);
    setImage(assets.sample_img_1);
  };

  return (
    <section className="min-h-[85vh] flex items-center py-8">
      <div className="grid w-full gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <form
          onSubmit={handleSubmit}
          className="bg-white/90 backdrop-blur-lg border-2 border-purple-200 rounded-3xl p-8 sm:p-10 shadow-xl"
        >
          <header className="mb-8 space-y-2">
            <p className="text-sm font-bold text-purple-600 uppercase tracking-wide flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-600 rounded-full animate-pulse"></span>
              Imagine anything
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Describe the image you want to see
            </h1>
            <p className="text-base text-gray-600 font-medium">{helperText}</p>
          </header>

          <label className="block text-sm font-bold text-gray-700 mb-3">
            Prompt
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g. A neon-lit cyberpunk alley with rain-soaked streets"
            className="w-full min-h-[160px] rounded-2xl border-2 border-purple-200 px-5 py-4 text-base text-gray-800 outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 resize-none transition-all duration-200"
            disabled={loading}
          />

          <div className="mt-6">
            <p className="text-xs uppercase text-purple-600 font-bold tracking-wide mb-4">
              ✨ Try one of these
            </p>
            <div className="flex flex-wrap gap-3">
              {promptIdeas.map((idea) => (
                <button
                  key={idea}
                  type="button"
                  onClick={() => setPrompt(idea)}
                  className="rounded-full border-2 border-purple-200 bg-purple-50 px-4 py-2 text-sm text-purple-700 font-medium hover:border-purple-400 hover:bg-purple-100 transition-all duration-200"
                >
                  {idea}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 px-10 py-4 text-base font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-lg shadow-purple-300 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
            >
              {loading ? "Generating..." : hasGenerated ? "Generate Again" : "Generate Image"}
            </button>
            {hasGenerated && (
              <button
                type="button"
                onClick={handleReset}
                className="rounded-full border-2 border-purple-300 bg-white px-8 py-4 text-base font-bold text-purple-700 hover:bg-purple-50 hover:border-purple-400 transition-all duration-200"
              >
                Start Over
              </button>
            )}
          </div>
        </form>

        <div className="relative rounded-3xl border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50 p-8 shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <p className="text-base font-bold text-purple-700 flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-600 rounded-full animate-pulse"></span>
              Preview {hasGenerated && "• Ready"}
            </p>
            {hasGenerated && (
              <a
                href={image}
                download
                className="text-sm font-bold uppercase tracking-wide bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full hover:scale-105 transition-transform duration-200 shadow-md"
              >
                Download
              </a>
            )}
          </div>

          <div className="aspect-square overflow-hidden rounded-2xl border-2 border-purple-300 bg-white flex items-center justify-center shadow-inner">
            <img
              src={image}
              alt="Generated result"
              className={`w-full transition duration-300 ${
                loading ? "opacity-70 blur-sm" : "opacity-100"
              }`}
            />
          </div>

          <div className="mt-8">
            <p className="text-xs uppercase tracking-[0.2em] text-purple-600 font-bold mb-3">
              Status
            </p>
            <div className="h-3 w-full overflow-hidden rounded-full bg-purple-100 border border-purple-200">
              <span
                className={`block h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-500 ${
                  loading ? "w-full animate-pulse" : hasGenerated ? "w-full" : "w-0"
                }`}
              />
            </div>
            <p className="mt-3 text-sm text-gray-700 font-medium">
              {loading
                ? "Crafting your image..."
                : hasGenerated
                ? "Image ready! Download or generate another."
                : "Your result will appear here."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Result;
