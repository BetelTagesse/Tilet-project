"use client";

import { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";

type AuthMode = "signin" | "signup";

// Downloaded only the first time a modal opens, not with the homepage
const AuthForm = dynamic(() => import("./AuthForm"));

export default function AuthModal() {
  const [mode, setMode] = useState<AuthMode | null>(null);
  const close = useCallback(() => setMode(null), []);

  // Escape closes the modal; page scroll is locked while it is open
  useEffect(() => {
    if (!mode) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [mode, close]);

  return (
    <>
      <div className="mt-6 flex gap-4">
        <button
          type="button"
          onClick={() => setMode("signin")}
          className="rounded-lg bg-tibeb-green px-5 py-3 text-white"
        >
          Sign In
        </button>
        <button
          type="button"
          onClick={() => setMode("signup")}
          className="rounded-lg border border-tibeb-green px-5 py-3 text-tibeb-green"
        >
          Sign Up
        </button>
      </div>

      {mode && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={mode === "signin" ? "Sign in" : "Create account"}
          className="fixed inset-0 z-50 flex items-center justify-center
                     overflow-y-auto bg-black/50 p-4 backdrop-blur-sm"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <div className="relative my-auto w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl sm:p-8">
            <AuthForm mode={mode} onClose={close} />
          </div>
        </div>
      )}
    </>
  );
}
