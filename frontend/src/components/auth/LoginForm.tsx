"use client";

import React, { useState, useEffect, FC } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/contexts/AuthContext";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { sendSignInLinkToEmail, signInWithEmailLink, isSignInWithEmailLink } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Link from "next/link";

const LoginForm: FC = () => {
  const { signInWithEmail, signInWithGoogle, loading } = useAuthContext();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordless, setShowPasswordless] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [needsEmail, setNeedsEmail] = useState(false);

  const router = useRouter();
  const currentLoading = loading || isLoading;

  // 🔹 Detect email link on mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (isSignInWithEmailLink(auth, window.location.href)) {
      setIsLoading(true);
      setMessage("Verifying your email link...");

      const storedEmail = localStorage.getItem("emailForSignIn");
      if (!storedEmail) {
        setNeedsEmail(true);
        setIsLoading(false);
        return;
      }

      signInWithEmailLink(auth, storedEmail, window.location.href)
        .then(() => {
          localStorage.removeItem("emailForSignIn");
          setMessage("✅ Successfully signed in!");
          router.push("/");
        })
        .catch((err) => setError(`Error signing in: ${err.message}`))
        .finally(() => setIsLoading(false));
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
    setMessage("");
  };

  const handleEmailPasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) return setError("Please fill in all fields");

    try {
      setIsLoading(true);
      await signInWithEmail(formData.email, formData.password);
      setMessage("Login successful!");
      router.push("/");
    } catch (err: any) {
      setError(err.message || "Failed to sign in");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      await signInWithGoogle();
      setMessage("Google login successful!");
      router.push("/");
    } catch (err: any) {
      setError(err.message || "Google sign in failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordlessLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email) return setError("Please enter your email address");

    try {
      setIsLoading(true);
      const actionCodeSettings = {
        url: window.location.origin + "/auth/login",
        handleCodeInApp: true,
      };

      await sendSignInLinkToEmail(auth, formData.email, actionCodeSettings);
      localStorage.setItem("emailForSignIn", formData.email);
      setMessage("✅ Email link sent! Check your inbox and click the link.");
    } catch (err: any) {
      setError(err.message || "Failed to send email link");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCompleteSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email) return setError("Please enter your email to complete sign-in");

    try {
      setIsLoading(true);
      await signInWithEmailLink(auth, formData.email, window.location.href);
      localStorage.removeItem("emailForSignIn");
      setMessage("✅ Successfully signed in!");
      router.push("/");
    } catch (err: any) {
      setError(err.message || "Error completing sign-in");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-[91vh] w-full">
      {/* Left card */}
      <div className="w-full hidden md:flex h-[90vh] items-center justify-center">
        <div className="w-[70vh] h-[80vh] rounded-3xl p-6 bg-gradient-to-br from-purple-400 via-purple-500 to-orange-300 shadow-lg flex flex-col justify-center items-start relative overflow-hidden">
          <div className="absolute w-64 h-64 bg-purple-300 rounded-full top-[-40px] right-[-40px] opacity-30"></div>
          <div className="absolute w-64 h-64 bg-orange-300 rounded-full bottom-[-40px] left-[-40px] opacity-30"></div>

          <div className="mb-4">
            <span className="text-white font-bold text-2xl">MediQuery</span>
          </div>

          <h1 className="text-4xl font-bold text-white leading-snug">
            Welcome Back! <br /> Sign in to your account
          </h1>
          <p className="mt-2 text-white/80 text-sm">
            Access your AI-powered health assistant and personalized insights instantly.
          </p>
        </div>
      </div>

      {/* Right form */}
      <div className="w-full flex flex-col items-center justify-center p-8 bg-white">
        <form className="md:w-96 w-80 flex flex-col items-center justify-center">
          <h2 className="text-4xl text-gray-900 font-medium mb-2">Sign in</h2>
          <p className="text-sm text-gray-500/90 mb-6">Welcome back! Please sign in to continue</p>

          {message && (
            <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg text-sm w-full">
              {message}
            </div>
          )}
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm w-full">
              {error}
            </div>
          )}

          {/* Google login */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={currentLoading}
            className="w-full mt-4 bg-gray-500/10 hover:bg-gray-500/20 flex items-center justify-center h-12 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {currentLoading ? (
              <Loader2 className="w-5 h-5 animate-spin mr-2" />
            ) : (
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
            )}
            {currentLoading ? "Logging in..." : "Continue with Google"}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 w-full my-6">
            <div className="w-full h-px bg-gray-300/90"></div>
            <p className="text-nowrap text-sm text-gray-500/90">or sign in with email</p>
            <div className="w-full h-px bg-gray-300/90"></div>
          </div>

          {/* Toggle */}
          <div className="flex w-full bg-gray-100 rounded-full p-1 mb-6">
            <button
              type="button"
              onClick={() => setShowPasswordless(false)}
              className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-all ${!showPasswordless ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"}`}
            >
              Email & Password
            </button>
            <button
              type="button"
              onClick={() => setShowPasswordless(true)}
              className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-all ${showPasswordless ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"}`}
            >
              Passwordless
            </button>
          </div>

          {/* Email input */}
          <div className="flex items-center w-full border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-3 mb-4 focus-within:border-blue-500 transition-colors">
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleInputChange}
              className="bg-transparent text-gray-700 placeholder-gray-500/80 outline-none text-sm w-full h-full pr-6"
              required
            />
          </div>

          {!showPasswordless ? (
            <>
              {/* Password input */}
              <div className="flex items-center w-full border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-3 mb-2 focus-within:border-blue-500 transition-colors">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="bg-transparent text-gray-700 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="pr-6 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <div className="w-full flex justify-end mb-4">
                <Link
                  href="/auth/forgetpass"
                  className="text-sm text-blue-600 hover:underline"
                >
                  Forgot Password
                </Link>
              </div>
              <button
                type="submit"
                onClick={handleEmailPasswordLogin}
                disabled={currentLoading}
                className="w-full h-12 rounded-full text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {currentLoading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : "Sign In"}
              </button>
            </>
          ) : needsEmail ? (
            <button
              type="submit"
              onClick={handleCompleteSignIn}
              disabled={currentLoading}
              className="w-full h-12 rounded-full text-white bg-blue-600 hover:bg-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {currentLoading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : "Complete Sign-In"}
            </button>
          ) : (
            <button
              type="submit"
              onClick={handlePasswordlessLogin}
              disabled={currentLoading}
              className="w-full h-12 rounded-full text-white bg-blue-600 hover:bg-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {currentLoading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : "Send Login Link to Email"}
            </button>
          )}
          <p className="text-gray-500/90 text-sm mt-6 text-center">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => router.push("/auth/register")}
              className="text-blue-600 hover:text-blue-700 hover:underline transition-colors font-medium"
            >
              Sign up
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
