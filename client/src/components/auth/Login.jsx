import React, { useContext, useEffect } from "react";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const Login = () => {
  const [state, setState] = React.useState("Login");
  const { setShowLogin, backendURL, setToken, setUser } =
    useContext(AppContext);

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);

  const isLogin = state === "Login";

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (isLogin) {
        const { data } = await axios.post(
          `${backendURL}/api/user/login`,
          { email, password },
          { headers: { "Content-Type": "application/json" } }
        );

        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          setUser(data.user);
          setShowLogin(false);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(
          `${backendURL}/api/user/register`,
          { name, email, password },
          { headers: { "Content-Type": "application/json" } }
        );

        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          setUser(data.user);
          setShowLogin(false);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.log(error);
      const errorMessage =
        error.response?.data?.message || error.message || "An error occurred";
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-slate-950/70 px-4 py-10 backdrop-blur">
      <div className="relative w-full max-w-lg overflow-hidden rounded-[32px] border border-white/10 bg-white/95 p-1 text-slate-700 shadow-2xl shadow-slate-900/20">
        <div className="pointer-events-none absolute -left-10 -top-10 h-32 w-32 rounded-full bg-sky-400/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-8 right-0 h-32 w-32 rounded-full bg-fuchsia-300/30 blur-3xl" />

        <form
          onSubmit={onSubmitHandler}
          className="relative space-y-6 rounded-[28px] bg-white/90 p-8 backdrop-blur"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                Welcome to Imagify
              </p>
              <h1 className="mt-2 text-3xl font-semibold text-slate-900">
                {isLogin ? "Sign in" : "Create account"}
              </h1>
              <p className="text-sm text-slate-500">
                {isLogin
                  ? "Access your AI studio"
                  : "Join in seconds to start creating"}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowLogin(false)}
              className="rounded-full border border-slate-200 p-2 text-slate-400 transition hover:border-slate-300 hover:text-slate-600"
              aria-label="Close login modal"
            >
              <img src={assets.cross_icon} alt="close" className="h-5 w-5" />
            </button>
          </div>

          <div className="flex gap-2 rounded-full bg-slate-100 p-1 text-sm font-medium text-slate-500">
            <button
              type="button"
              onClick={() => setState("Login")}
              className={`flex-1 rounded-full px-4 py-2 transition ${
                isLogin
                  ? "bg-white text-slate-900 shadow"
                  : "hover:text-slate-900"
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setState("Signup")}
              className={`flex-1 rounded-full px-4 py-2 transition ${
                !isLogin
                  ? "bg-white text-slate-900 shadow"
                  : "hover:text-slate-900"
              }`}
            >
              Sign up
            </button>
          </div>

          {!isLogin && (
            <label className="block text-sm font-medium text-slate-600">
              Full Name
              <div className="mt-2 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3">
                <img
                  src={assets.profile_icon}
                  alt="user_icon"
                  className="h-5 w-5 opacity-70"
                />
                <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  type="text"
                  className="w-full bg-transparent text-sm text-slate-700 outline-none"
                  placeholder="e.g. full name"
                  required
                />
              </div>
            </label>
          )}

          <label className="block text-sm font-medium text-slate-600">
            Email
            <div className="mt-2 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3">
              <img
                src={assets.email_icon}
                alt="email_icon"
                className="h-5 w-5 opacity-70"
              />
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                className="w-full bg-transparent text-sm text-slate-700 outline-none"
                placeholder="you@example.com"
                required
              />
            </div>
          </label>

          <label className="block text-sm font-medium text-slate-600">
            Password
            <div className="mt-2 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3">
              <img
                src={assets.lock_icon}
                alt="lock_icon"
                className="h-5 w-5 opacity-70"
              />
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                className="w-full bg-transparent text-sm text-slate-700 outline-none"
                placeholder="Minimum 8 characters"
                required
              />
            </div>
          </label>

          <div className="flex items-center justify-between text-xs font-medium text-slate-500">
            <label className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                className="rounded border-slate-300 text-slate-900 focus:ring-slate-900"
              />
              Remember me
            </label>
            <button
              type="button"
              className="text-slate-900 underline-offset-4 hover:underline"
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-2xl bg-slate-900 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {submitting
              ? "Please wait..."
              : isLogin
              ? "Login"
              : "Create account"}
          </button>

          <p className="text-center text-sm text-slate-500">
            {isLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
            <button
              type="button"
              className="font-semibold text-slate-900 underline-offset-4 hover:underline"
              onClick={() => setState(isLogin ? "Signup" : "Login")}
            >
              {isLogin ? "Sign up" : "Login"}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
