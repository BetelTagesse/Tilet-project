"use client";

import { useState } from "react";
import AuthForm from "@/components/auth/AuthForm";

export default function HomePage() {
  const [showAuth, setShowAuth] = useState(false);

  return (
    <main>
      {/* Your existing Tilet homepage */}
      <h1 className="card font-bold underline">Hello world!</h1>;
      <button
        onClick={() => setShowAuth(true)}
        className="rounded-lg bg-tibeb-green px-5 py-3 text-white"
      >
        Sign In
      </button>
      {showAuth && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center
                     bg-black/50 p-4 backdrop-blur-sm"
        >
          <div className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
            <AuthForm mode="signin" onClose={() => setShowAuth(false)} />
          </div>
        </div>
      )}
    </main>
  );
}
