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
        color: "#2563eb",
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
    <section className="py-12">
      <div className="mx-auto max-w-4xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
          Buy Credits
        </span>
        <h1 className="mt-6 text-3xl font-semibold text-slate-900 sm:text-4xl">
          Invest once, generate all month
        </h1>
        <p className="mt-3 text-base text-slate-500">
          Pick a pack that matches your creative flow. Upgrade or top-up anytime
          — your unused credits never expire.
        </p>
      </div>

      <div className="mx-auto mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan) => {
          const isPopular = plan.id === highlightedPlan;
          return (
            <article
              key={plan.id}
              className={`relative flex h-full flex-col rounded-3xl border p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg ${
                isPopular
                  ? "border-blue-200 bg-white"
                  : "border-slate-200 bg-white/90"
              }`}
            >
              {isPopular && (
                <span className="absolute right-6 top-6 rounded-full bg-blue-600/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-600">
                  Most popular
                </span>
              )}
              <img
                width={40}
                src={assets.logo_icon}
                alt=""
                className="mb-4 opacity-80"
              />
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">
                {plan.id}
              </p>
              <h2 className="mt-1 text-xl font-semibold text-slate-900">
                {plan.desc}
              </h2>
              <div className="mt-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-semibold text-slate-900">
                    {formatPrice(plan.price)}
                  </span>
                  <span className="text-sm text-slate-500">
                    for {plan.credits} credits
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  ≈ ₹{costPerCredit(plan)} per credit
                </p>
              </div>

              <ul className="mt-6 flex flex-col gap-3 text-sm text-slate-600">
                {PLAN_FEATURES[plan.id].map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 rounded-xl border border-slate-100 bg-slate-50/60 px-3 py-2"
                  >
                    <span className="text-emerald-500">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => paymentHandler(plan.id)}
                className={`mt-8 w-full rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                  isPopular
                    ? "bg-slate-900 text-white hover:bg-blue-600"
                    : "border border-slate-200 text-slate-700 hover:border-blue-300 hover:text-blue-600"
                }`}
              >
                {user ? "Purchase credits" : "Login to purchase"}
              </button>
            </article>
          );
        })}
      </div>

      <div className="mx-auto mt-12 grid gap-4 rounded-3xl border border-slate-200 bg-white/90 p-6 sm:grid-cols-3">
        {perkHighlights.map((perk) => (
          <div key={perk.title} className="rounded-2xl bg-slate-50 p-4 text-left">
            <p className="text-sm font-semibold text-slate-900">{perk.title}</p>
            <p className="mt-1 text-sm text-slate-500">{perk.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BuyCredit;
