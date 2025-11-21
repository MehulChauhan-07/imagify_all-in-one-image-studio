import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";

/**
 * Tools:
 * - text-to-image    -> currently wired to /api/image/generate-image
 * - uncrop           -> TODO: backend route
 * - remove-object    -> TODO: backend route
 * - remove-background-> TODO: backend route
 */

const TOOLS = [
  {
    id: "text-to-image",
    label: "Text to Image",
    description: "Generate an image from a written prompt.",
  },
  {
    id: "uncrop",
    label: "Uncrop",
    description: "Extend your image beyond its original borders.",
  },
  {
    id: "remove-object",
    label: "Object Removal",
    description: "Remove unwanted objects from your images.",
  },
  {
    id: "remove-background",
    label: "Background Removal",
    description: "Instantly remove backgrounds for clean cutouts.",
  },
];

const ClipdropTools = ({ userId, creditBalance, onCreditUpdate }) => {
  const [activeTool, setActiveTool] = useState("text-to-image");
  const [prompt, setPrompt] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [resultImage, setResultImage] = useState(null);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadedImage(file);
    setResultImage(null);
    setError("");
    setSuccessMessage("");
  };

  const handleGenerate = async () => {
    setError("");
    setSuccessMessage("");
    setLoading(true);

    try {
      if (activeTool === "text-to-image") {
        if (!prompt.trim()) {
          setError("Please enter a prompt.");
          setLoading(false);
          return;
        }

        const response = await fetch("/api/image/generate-image", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ prompt, userId }),
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
          setError(data.message || "Failed to generate image.");
        } else {
          setResultImage(data.resultImage);
          setSuccessMessage("Image generated successfully.");
          if (typeof onCreditUpdate === "function" && typeof data.creditBalance === "number") {
            onCreditUpdate(data.creditBalance);
          }
        }
      } else if (activeTool === "uncrop") {
        // TODO: replace with real backend route when available
        setError("Uncrop tool backend endpoint is not configured yet.");
      } else if (activeTool === "remove-object") {
        // TODO: replace with real backend route when available
        setError("Object removal backend endpoint is not configured yet.");
      } else if (activeTool === "remove-background") {
        // TODO: replace with real backend route when available
        setError("Background removal backend endpoint is not configured yet.");
      }
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const renderToolFields = () => {
    switch (activeTool) {
      case "text-to-image":
        return (
          <>
            <label className="block text-sm font-medium mb-1 text-gray-800 dark:text-gray-100">
              Prompt
            </label>
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe the image you want to create..."
              className="min-h-[120px]"
            />
          </>
        );

      case "uncrop":
      case "remove-object":
      case "remove-background":
        return (
          <>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-800 dark:text-gray-100">
                Source Image
              </label>
              <Input type="file" accept="image/*" onChange={handleImageChange} />
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Upload a clear image (JPG, PNG). Higher resolution gives better results.
              </p>
            </div>
            {uploadedImage && (
              <div className="mt-4">
                <p className="text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">
                  Preview
                </p>
                <img
                  src={URL.createObjectURL(uploadedImage)}
                  alt="Uploaded preview"
                  className="max-h-64 w-full rounded-xl object-contain border border-gray-200 dark:border-gray-700 bg-white/40 dark:bg-gray-900/40"
                />
              </div>
            )}
          </>
        );

      default:
        return null;
    }
  };

  return (
    <Card className="rounded-3xl border border-gray-200/70 dark:border-gray-800/70 bg-white/80 dark:bg-gray-900/80 shadow-sm">
      <CardHeader className="pb-4 sm:pb-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle className="text-xl sm:text-2xl font-semibold tracking-tight">
              Imagify Studio
            </CardTitle>
            <CardDescription className="mt-1 text-sm sm:text-base text-gray-600 dark:text-gray-300">
              Switch between all available Clipdrop tools from a single workspace.
            </CardDescription>
          </div>
          {typeof creditBalance === "number" && (
            <div className="inline-flex items-center gap-2 rounded-full border bg-white/70 dark:bg-gray-900/70 px-4 py-1 text-xs font-medium text-gray-700 dark:text-gray-200">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span>{creditBalance} credits remaining</span>
            </div>
          )}
        </div>

        {/* Tool selector */}
        <div className="mt-4 flex flex-wrap gap-2">
          {TOOLS.map((tool) => (
            <Button
              key={tool.id}
              type="button"
              variant={activeTool === tool.id ? "default" : "outline"}
              className={
                "rounded-full text-xs sm:text-sm px-3 sm:px-4 py-1.5 " +
                (activeTool === tool.id
                  ? "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white border-none"
                  : "border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-gray-900/70")
              }
              onClick={() => {
                setActiveTool(tool.id);
                setResultImage(null);
                setError("");
                setSuccessMessage("");
              }}
            >
              {tool.label}
            </Button>
          ))}
        </div>
      </CardHeader>

      <CardContent className="space-y-6 pt-2">
        {/* Tool description */}
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
          {TOOLS.find((t) => t.id === activeTool)?.description}
        </p>

        {/* Input area depending on tool */}
        <div className="space-y-4">{renderToolFields()}</div>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <Button
            type="button"
            onClick={handleGenerate}
            disabled={loading}
            className="rounded-full px-6 py-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-semibold shadow-md hover:shadow-lg hover:brightness-105 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Processing..." : "Run tool"}
          </Button>
          {activeTool !== "text-to-image" && (
            <p className="text-[11px] sm:text-xs text-gray-500 dark:text-gray-400">
              This tool UI is ready. Connect it to its backend Clipdrop endpoint
              once your server routes are available.
            </p>
          )}
        </div>

        {/* Feedback */}
        {error && (
          <p className="text-xs sm:text-sm text-red-500 mt-2">
            {error}
          </p>
        )}
        {successMessage && (
          <p className="text-xs sm:text-sm text-emerald-500 mt-2">
            {successMessage}
          </p>
        )}

        {/* Result image */}
        {resultImage && (
          <div className="pt-4">
            <p className="text-xs font-medium text-gray-700 dark:text-gray-200 mb-2">
              Result
            </p>
            <img
              src={resultImage}
              alt="Generated result"
              className="w-full max-h-[480px] rounded-2xl border border-gray-200 dark:border-gray-700 object-contain bg-white/40 dark:bg-gray-900/40"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ClipdropTools;