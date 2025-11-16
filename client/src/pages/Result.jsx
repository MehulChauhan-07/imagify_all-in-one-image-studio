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
    <section className="min-h-[85vh] flex items-center">
      <div className="grid w-full gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <form
          onSubmit={handleSubmit}
          className="bg-white/80 backdrop-blur border rounded-2xl p-6 sm:p-8 shadow-sm"
        >
          <header className="mb-6 space-y-1">
            <p className="text-sm font-medium text-blue-500 uppercase tracking-wide">
              Imagine anything
            </p>
            <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900">
              Describe the image you want to see
            </h1>
            <p className="text-sm text-slate-500">{helperText}</p>
          </header>

          <label className="block text-sm font-medium text-slate-600">
            Prompt
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g. A neon-lit cyberpunk alley with rain-soaked streets"
            className="mt-2 w-full min-h-[140px] rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-800 outline-none focus:border-blue-500 resize-none"
            disabled={loading}
          />

          <div className="mt-4">
            <p className="text-xs uppercase text-slate-400 tracking-wide mb-3">
              Try one of these
            </p>
            <div className="flex flex-wrap gap-3">
              {promptIdeas.map((idea) => (
                <button
                  key={idea}
                  type="button"
                  onClick={() => setPrompt(idea)}
                  className="rounded-full border border-slate-200 px-4 py-1.5 text-xs text-slate-600 hover:border-blue-300 hover:text-blue-600 transition"
                >
                  {idea}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-8 py-3 text-sm font-semibold text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Generating..." : hasGenerated ? "Generate Again" : "Generate Image"}
            </button>
            {hasGenerated && (
              <button
                type="button"
                onClick={handleReset}
                className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-600 hover:border-blue-300 hover:text-blue-600 transition"
              >
                Start Over
              </button>
            )}
          </div>
        </form>

        <div className="relative rounded-2xl border bg-slate-900/90 p-6 text-white shadow-inner">
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm font-medium text-slate-300">
              Preview {hasGenerated && "• Ready"}
            </p>
            {hasGenerated && (
              <a
                href={image}
                download
                className="text-xs font-semibold uppercase tracking-wide bg-white text-slate-900 px-3 py-1 rounded-full"
              >
                Download
              </a>
            )}
          </div>

          <div className="aspect-square overflow-hidden rounded-xl border border-slate-700 bg-slate-800 flex items-center justify-center">
            <img
              src={image}
              alt="Generated result"
              className={`w-full transition duration-300 ${
                loading ? "opacity-70 blur-[1px]" : "opacity-100"
              }`}
            />
          </div>

          <div className="mt-6">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Status
            </p>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-800">
              <span
                className={`block h-full bg-gradient-to-r from-blue-500 via-sky-400 to-emerald-300 transition-all duration-500 ${
                  loading ? "w-full animate-pulse" : hasGenerated ? "w-full" : "w-0"
                }`}
              />
            </div>
            <p className="mt-2 text-sm text-slate-400">
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
