"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { signIn, useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [showAuth, setShowAuth] = useState(false);

  // Form state
  const [isSignUp, setIsSignUp] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const { data: session } = useSession();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Reset modal state when toggling mode
  const toggleMode = () => {
    setIsSignUp((v) => !v);
    setAuthError("");
    setSuccessMsg("");
  };

  // Handle credentials submit (sign-up OR login)
  const handleCredentials = async () => {
    setAuthError("");
    setSuccessMsg("");
    setAuthLoading(true);

    try {
      if (isSignUp) {
        // ── REGISTER ──────────────────────────────────────────────────────
        if (!name.trim()) {
          setAuthError("Please enter your name.");
          return;
        }
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: name.trim(), email, password }),
        });
        const data = await res.json();

        if (!res.ok) {
          setAuthError(data.error || "Registration failed.");
          return;
        }

        // Auto-login after successful registration
        const loginRes = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (loginRes?.error) {
          setAuthError("Registered! But auto-login failed. Please log in.");
          setIsSignUp(false);
        } else {
          setSuccessMsg("Account created! You are now logged in. ✅");
          setTimeout(() => setShowAuth(false), 1200);
        }
      } else {
        // ── LOGIN ─────────────────────────────────────────────────────────
        const loginRes = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (loginRes?.error) {
          setAuthError(loginRes.error || "Login failed. Check your credentials.");
        } else {
          setSuccessMsg("Logged in! ✅");
          setTimeout(() => setShowAuth(false), 1000);
        }
      }
    } finally {
      setAuthLoading(false);
    }
  };

  return (
    <>
      {/* NAVBAR */}
      <nav
        className="navbar"
        style={{
          background: scrolled
            ? "rgba(2,6,23,0.92)"
            : "rgba(2,6,23,0.60)",
          boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.40)" : "none",
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 10,
                background: "linear-gradient(135deg, #7c3aed, #3b82f6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 16,
                boxShadow: "0 4px 16px rgba(139,92,246,0.45)",
              }}
            >
              🛡️
            </div>

            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: "1.05rem",
                color: "#fff",
              }}
            >
              Bias
              <span
                style={{
                  background: "linear-gradient(135deg, #7c3aed, #3b82f6)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Guard
              </span>{" "}
              AI
            </span>
          </div>
        </Link>

        {/* Nav links */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button className="btn-ghost" onClick={() => scrollToSection("features")}>
            Features
          </button>

          <button className="btn-ghost" onClick={() => scrollToSection("how-it-works")}>
            How it Works
          </button>

          <div
            style={{
              width: 1,
              height: 20,
              background: "rgba(255,255,255,0.12)",
              margin: "0 4px",
            }}
          />

          {/* If logged in show user name + logout; else Get Started */}
          {session ? (
            <>
              <span
                style={{
                  fontSize: "0.85rem",
                  color: "rgba(255,255,255,0.7)",
                  maxWidth: 140,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                👤 {session.user?.name}
              </span>
              <button
                className="btn-ghost"
                onClick={() => signOut()}
                style={{ padding: "8px 16px", fontSize: "0.875rem" }}
              >
                Logout
              </button>
            </>
          ) : (
            <button
              id="get-started-btn"
              className="btn-primary"
              onClick={() => {
                setShowAuth(true);
                setAuthError("");
                setSuccessMsg("");
              }}
              style={{ padding: "8px 20px", fontSize: "0.875rem" }}
            >
              Get Started
            </button>
          )}
        </div>
      </nav>

      {/* ── AUTH MODAL ────────────────────────────────────────────────────── */}
      {showAuth && (
        <div
          onClick={() => setShowAuth(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.65)",
            backdropFilter: "blur(10px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 999,
          }}
        >
          <div
            className="glass"
            onClick={(e) => e.stopPropagation()}
            style={{
              width: 400,
              padding: "32px 28px",
              borderRadius: 20,
              position: "relative",
              border: "1px solid rgba(255,255,255,0.10)",
              background: "rgba(10,12,30,0.95)",
            }}
          >
            {/* Close */}
            <button
              id="auth-modal-close"
              onClick={() => setShowAuth(false)}
              style={{
                position: "absolute",
                top: 14,
                right: 16,
                background: "transparent",
                border: "none",
                color: "#aaa",
                cursor: "pointer",
                fontSize: 18,
              }}
            >
              ✕
            </button>

            {/* Title */}
            <h2 style={{ fontSize: "1.4rem", fontWeight: 700, marginBottom: 4 }}>
              {isSignUp ? "Create Account" : "Welcome Back"}
            </h2>
            <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.4)", marginBottom: 20 }}>
              {isSignUp
                ? "Sign up to start analyzing patents with AI."
                : "Log in to access your BiasGuard AI account."}
            </p>

            {/* Name (sign-up only) */}
            {isSignUp && (
              <input
                id="auth-name"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-glass"
                style={{ marginBottom: 10, padding: 12 }}
              />
            )}

            {/* Email */}
            <input
              id="auth-email"
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-glass"
              style={{ marginBottom: 10, padding: 12 }}
            />

            {/* Password */}
            <input
              id="auth-password"
              type="password"
              placeholder={isSignUp ? "Password (min 6 chars)" : "Password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCredentials()}
              className="input-glass"
              style={{ marginBottom: 14, padding: 12 }}
            />

            {/* Error / Success */}
            {authError && (
              <div
                style={{
                  marginBottom: 12,
                  padding: "10px 14px",
                  borderRadius: 10,
                  background: "rgba(239,68,68,0.10)",
                  border: "1px solid rgba(239,68,68,0.30)",
                  fontSize: "0.82rem",
                  color: "#f87171",
                }}
              >
                ⚠️ {authError}
              </div>
            )}
            {successMsg && (
              <div
                style={{
                  marginBottom: 12,
                  padding: "10px 14px",
                  borderRadius: 10,
                  background: "rgba(74,222,128,0.10)",
                  border: "1px solid rgba(74,222,128,0.30)",
                  fontSize: "0.82rem",
                  color: "#4ade80",
                }}
              >
                {successMsg}
              </div>
            )}

            {/* Continue button */}
            <button
              id="auth-submit-btn"
              className="btn-primary"
              onClick={handleCredentials}
              disabled={authLoading}
              style={{ width: "100%", marginBottom: 14, opacity: authLoading ? 0.7 : 1 }}
            >
              {authLoading ? "Please wait…" : isSignUp ? "Create Account" : "Log In"}
            </button>

            {/* Toggle sign-up / login */}
            <p style={{ textAlign: "center", fontSize: "0.8rem", color: "rgba(255,255,255,0.4)", marginBottom: 16 }}>
              {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
              <span
                onClick={toggleMode}
                style={{ color: "#a78bfa", cursor: "pointer", textDecoration: "underline" }}
              >
                {isSignUp ? "Log in" : "Sign up"}
              </span>
            </p>

            {/* Divider */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 14,
                fontSize: "0.75rem",
                color: "rgba(255,255,255,0.25)",
              }}
            >
              <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.08)" }} />
              OR CONTINUE WITH
              <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.08)" }} />
            </div>

            {/* OAuth buttons */}
            <button
              id="google-signin-btn"
              className="btn-ghost"
              style={{ width: "100%", marginBottom: 8 }}
              onClick={() => signIn("google")}
            >
              🔵 Continue with Google
            </button>

            <button
              id="github-signin-btn"
              className="btn-ghost"
              style={{ width: "100%" }}
              onClick={() => signIn("github")}
            >
              ⚫ Continue with GitHub
            </button>
          </div>
        </div>
      )}
    </>
  );
}