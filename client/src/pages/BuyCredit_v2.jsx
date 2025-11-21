import React from "react";
import { assets, plans } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { AppContext } from "../context/AppContext";

const highlightedPlan = "Advanced";
const PLAN_FEATURES = {
  Basic: ["100 AI generations", "Standard resolution", "Email support"],
  Advanced: [
    "500 AI generations",
    "HD + commercial usage",
    "Priority chat support",
  ],
  Business: ["5000 AI generations", "Team workspace", "Dedicated manager"],
};

const perkHighlights = [
  { title: "Instant delivery", desc: "Credits available seconds after payment" },
  { title: "Razorpay secured", desc: "Trusted payment gateway with OTP" },
  { title: "GST invoice", desc: "Automatically generated for every purchase" },
];

const BuyCredit = () => {
  const { user, backendURL, loadCreditsData, token, setShowLogin } =
    React.useContext(AppContext);

  const navigate = useNavigate();
  const [isRazorpayReady, setIsRazorpayReady] = React.useState(false);

  React.useEffect(() => {
    const scriptUrl = "https://checkout.razorpay.com/v1/checkout.js";
    let script = document.querySelector(`script[src="${scriptUrl}"]`);

    const handleLoad = () => setIsRazorpayReady(true);
    const handleError = () =>
      toast.error("Failed to load Razorpay SDK. Please refresh.");

    if (script) {
      if (window.Razorpay) {
        setIsRazorpayReady(true);
      } else {
        script.addEventListener("load", handleLoad);
        script.addEventListener("error", handleError);
      }

      return () => {
        script.removeEventListener("load", handleLoad);
        script.removeEventListener("error", handleError);
      };
    }

    script = document.createElement("script");
    script.src = scriptUrl;
    script.async = true;
    script.onload = handleLoad;
    script.onerror = handleError;
    document.body.appendChild(script);

    return () => {
      script.onload = null;
      script.onerror = null;
    };
  }, []);

  const initPay = async (order) => {
    if (!window.Razorpay) {
      toast.error("Payment gateway is still loading. Please try again.");
      return;
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency || "INR",
      name: "Imagify credits purchase",
      description: "Purchase Credits to generate images",
      order_id: order.id,
      receipt: order.receipt,
      handler: async function (response) {
        try {
          const verifyRes = await axios.post(
            `${backendURL}/api/user/verify-razor`,
            response,
            {
              headers: { token },
            }
          );

          if (verifyRes.data.success) {
            toast.success("Payment successful! Credits added to your account.");
            await loadCreditsData();
            navigate("/result");
          } else {
            toast.error(
              verifyRes.data.message ||
                "Payment verification failed. Try again."
            );
          }
        } catch (error) {
          const message =
            error.response?.data?.message ||
            error.message ||
            "Payment verification failed.";
          toast.error(message);
        }
      },
      modal: {
        ondismiss: () => toast.info("Payment cancelled."),
      },
      theme: {
        color: "#9333ea",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const paymentHandler = async (planId) => {
    if (!user) {
      setShowLogin(true);
      return;
    }

    if (!token) {
      toast.error("Please login to purchase credits.");
      return;
    }

    if (!isRazorpayReady) {
      toast.error("Payment gateway is initializing. Please try in a moment.");
      return;
    }

    try {
      const { data } = await axios.post(
        `${backendURL}/api/user/pay-razor`,
        { planId },
        {
          headers: { token },
        }
      );
      if (data.success && data.order) {
        initPay(data.order);
      } else {
        toast.error(
          data.message || "Unable to start payment. Please try again."
        );
      }
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Payment initiation failed.";
      toast.error(message);
    }
  };
  const formatPrice = (value) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);

  const costPerCredit = (plan) =>
    (plan.price / plan.credits).toFixed(plan.price / plan.credits < 1 ? 2 : 1);

  return (
    <section className="py-16">
      <div className="mx-auto max-w-5xl text-center px-4">
        <span className="inline-flex items-center gap-2 rounded-full border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50 px-6 py-2.5 text-xs font-bold uppercase tracking-[0.3em] text-purple-600 shadow-sm">
          💳 Buy Credits
        </span>
        <h1 className="mt-8 text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent sm:text-5xl leading-tight">
          Invest once, generate all month
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Pick a pack that matches your creative flow. Upgrade or top-up anytime
          — your unused credits never expire.
        </p>
      </div>

      <div className="mx-auto mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl px-4">
        {plans.map((plan) => {
          const isPopular = plan.id === highlightedPlan;
          return (
            <article
              key={plan.id}
              className={`relative flex h-full flex-col rounded-3xl border-2 p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                isPopular
                  ? "border-purple-300 bg-gradient-to-br from-white to-purple-50 shadow-purple-200"
                  : "border-gray-200 bg-white hover:border-purple-200"
              }`}
            >
              {isPopular && (
                <span className="absolute right-6 top-6 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-white shadow-lg">
                  ⭐ Most popular
                </span>
              )}
              <img
                width={48}
                src={assets.logo_icon}
                alt=""
                className="mb-5 opacity-90"
              />
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-purple-600">
                {plan.id}
              </p>
              <h2 className="mt-2 text-2xl font-bold text-gray-900">
                {plan.desc}
              </h2>
              <div className="mt-8">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {formatPrice(plan.price)}
                  </span>
                  <span className="text-base text-gray-600">
                    for {plan.credits} credits
                  </span>
                </div>
                <p className="text-sm text-purple-600 font-medium mt-1">
                  ≈ ₹{costPerCredit(plan)} per credit
                </p>
              </div>

              <ul className="mt-8 flex flex-col gap-3 text-sm text-gray-700 flex-1">
                {PLAN_FEATURES[plan.id].map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-3 rounded-xl border border-purple-100 bg-purple-50/50 px-4 py-3"
                  >
                    <span className="text-emerald-500 text-lg font-bold">✓</span>
                    <span className="font-medium">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => paymentHandler(plan.id)}
                className={`mt-8 w-full rounded-2xl px-6 py-4 text-base font-bold transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                  isPopular
                    ? "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white shadow-lg shadow-purple-300"
                    : "border-2 border-purple-200 text-purple-700 hover:bg-gradient-to-r hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 hover:text-white hover:border-transparent"
                }`}
              >
                {user ? "Purchase credits" : "Login to purchase"}
              </button>
            </article>
          );
        })}
      </div>

      <div className="mx-auto mt-16 max-w-5xl px-4">
        <div className="grid gap-6 rounded-3xl border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50 p-8 sm:grid-cols-3 shadow-lg">
          {perkHighlights.map((perk) => (
            <div key={perk.title} className="rounded-2xl bg-white/80 backdrop-blur-sm p-6 text-left border border-purple-100 shadow-sm">
              <p className="text-base font-bold text-purple-700 flex items-center gap-2">
                <span className="text-2xl">✨</span>
                {perk.title}
              </p>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">{perk.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BuyCredit;
