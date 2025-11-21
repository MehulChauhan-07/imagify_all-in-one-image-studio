import { createContext, useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [user, setUser] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));

  const [credit, setCredit] = useState(false);
  const navigate = useNavigate();

  // Use VITE_BACKEND_URL with fallback
  // Pull from Vite env (VITE_BACKEND_URL) with a sensible fallback.
  // Use the same variable name (`backendURL`) that the rest of the app expects.
  // const backendURL =
  //   import.meta.env.VITE_BACKEND_URL || "http://localhost:3000" ;

  const backendURL =
    import.meta.env.VITE_BACKEND_URL ||
    `${window.location.protocol}//${window.location.hostname}:3000`;
  console.log("Using backendURL:", backendURL);

  const loadCreditsData = useCallback(async () => {
    // Only proceed if token exists and is not empty
    if (!token || token.trim() === "") {
      return;
    }

    try {
      const { data } = await axios.get(`${backendURL}/api/user/credits`, {
        headers: { token },
      });

      if (data.success) {
        setCredit(data.credits);
        setUser(data.user);
      }
    } catch (error) {
      console.log(error);
      // If 401 Unauthorized, clear token and user
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("token");
        setToken("");
        setUser(null);
        setCredit(false);
        // Don't show error toast for 401, just silently clear auth
      } else {
        toast.error(error.message);
      }
    }
  }, [token, backendURL]);

  const generateImage = useCallback(
    async (prompt) => {
      const trimmedPrompt = prompt?.trim();

      if (!trimmedPrompt) {
        toast.error("Please describe what you want to generate.");
        return null;
      }

      if (!token || token.trim() === "") {
        toast.error("Please login to generate images.");
        setShowLogin(true);
        return null;
      }

      try {
        const { data } = await axios.post(
          `${backendURL}/api/image/generate-image`,
          { prompt: trimmedPrompt },
          {
            headers: { token },
          }
        );

        if (data.success && data.resultImage) {
          await loadCreditsData();
          return data.resultImage;
        }

        if (data.creditBalance === 0) {
          toast.info("You are out of credits. Purchase more to continue.");
          await loadCreditsData();
          navigate("/buy");
          return null;
        }

        toast.error(data.message || "Unable to generate image. Try again.");
        return null;
      } catch (error) {
        const message =
          error.response?.data?.message ||
          error.message ||
          "Unable to generate image.";
        toast.error(message);

        await loadCreditsData();

        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          setToken("");
          setUser(null);
          setCredit(false);
          setShowLogin(true);
        }

        if (message.toLowerCase().includes("credit")) {
          navigate("/buy");
        }

        return null;
      }
    },
    [
      backendURL,
      token,
      loadCreditsData,
      navigate,
      setShowLogin,
      setToken,
      setUser,
      setCredit,
    ]
  );

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
    setCredit(false);
  };

  useEffect(() => {
    // Only check auth if token exists and is not empty
    if (token && token.trim() !== "") {
      loadCreditsData();
    } else {
      // If no token, ensure user and credit are cleared
      setUser(null);
      setCredit(false);
    }
  }, [token, loadCreditsData]);

  const value = {
    user,
    setUser,
    showLogin,
    setShowLogin,
    backendURL,
    token,
    setToken,
    credit,
    setCredit,
    loadCreditsData,
    logout,
    generateImage,
  };
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
