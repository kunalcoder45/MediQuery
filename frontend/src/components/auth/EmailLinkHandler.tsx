"use client";

import React, { useState, useEffect } from "react";
import {
  sendSignInLinkToEmail,
  signInWithEmailLink,
  isSignInWithEmailLink,
} from "firebase/auth";
import { auth } from "@/lib/firebase"; // ✅ use only this

const Loader = () => (
  <div className="flex justify-center items-center py-4">
    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

const EmailLinkHandler = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [needsEmail, setNeedsEmail] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (isSignInWithEmailLink(auth, window.location.href)) {
      setLoading(true);
      setMessage("Verifying your email link...");

      let userEmail = localStorage.getItem("emailForSignIn");

      if (!userEmail) {
        setNeedsEmail(true);
        setLoading(false);
        return;
      }

      signInWithEmailLink(auth, userEmail, window.location.href)
        .then(() => {
          localStorage.removeItem("emailForSignIn");
          setMessage("✅ Successfully signed in!");
          setIsLoggedIn(true);
        })
        .catch((err) => {
          setError(`Error signing in: ${err.message}`);
        })
        .finally(() => setLoading(false));
    }
  }, []);

  const handleSendLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const actionCodeSettings = {
        url: "https://mediquery.vercel.app/auth/emailLink",
        handleCodeInApp: true,
      };

      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      localStorage.setItem("emailForSignIn", email);
      setMessage("✅ Sign-in link sent! Check your inbox.");
    } catch (err: any) {
      setError(`Failed to send link: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signInWithEmailLink(auth, email, window.location.href);
      localStorage.removeItem("emailForSignIn");
      setMessage("✅ Successfully signed in!");
      setIsLoggedIn(true);
    } catch (err: any) {
      setError(`Error completing sign-in: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        {isLoggedIn ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-green-600 mb-4">You're In!</h2>
            <p>You have successfully logged in using the email link.</p>
          </div>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
              Passwordless Sign-In
            </h1>

            {message && (
              <p className="bg-green-100 text-green-700 px-4 py-2 rounded mb-4">
                {message}
              </p>
            )}
            {error && (
              <p className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4">
                {error}
              </p>
            )}
            {loading && <Loader />}

            {needsEmail ? (
              <form onSubmit={handleCompleteSignIn} className="space-y-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full px-4 py-2 border rounded-md"
                />
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded-md"
                >
                  Complete Sign-In
                </button>
              </form>
            ) : (
              <form onSubmit={handleSendLink} className="space-y-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full px-4 py-2 border rounded-md"
                />
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded-md"
                >
                  Send Login Link
                </button>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default EmailLinkHandler;
