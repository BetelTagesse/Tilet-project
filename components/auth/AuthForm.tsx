"use client";

import Link from "next/link";
import AuthField from "./AuthField";
import { useAuth } from "./useAuth";
import type { AuthMode } from "./useAuth";

interface AuthFormProps {
  mode: AuthMode;
  onClose?: () => void;
}

// Presentation only. All logic lives in useAuth.ts (single source of truth).
export default function AuthForm({ mode, onClose }: AuthFormProps) {
  const { isSignIn, error, loading, handleSubmit, handleGoogleSignIn } =
    useAuth({
      mode,
      onClose,
    });

  return (
    <div className="relative w-full max-w-md">
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          disabled={loading}
          aria-label="Close authentication form"
          className="absolute -right-2 -top-3 rounded-full p-2
                     text-gray-500 transition hover:text-gray-900
                     disabled:cursor-not-allowed disabled:opacity-50"
        >
          <span aria-hidden="true">✕</span>
        </button>
      )}

      <header className="mb-8">
        <h2 className="text-3xl font-semibold text-tibeb-green sm:text-4xl">
          {isSignIn ? "Welcome Back" : "Create Your Account"}
        </h2>
        <p className="mt-2 text-sm text-text-secondary">
          {isSignIn
            ? "Please sign in to your account to continue."
            : "Join Tilet and discover Ethiopian traditional fashion."}
        </p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-5">
        {!isSignIn && (
          <AuthField
            id="name"
            label="Full Name"
            type="text"
            placeholder="Enter your full name"
            autoComplete="name"
            required
          />
        )}

        <AuthField
          id="email"
          label="Email Address"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          required
        />

        <AuthField
          id="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          autoComplete={isSignIn ? "current-password" : "new-password"}
          required
        />

        {!isSignIn && (
          <AuthField
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            placeholder="Confirm your password"
            autoComplete="new-password"
            required
          />
        )}

        {error && (
          <div
            role="alert"
            className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
          >
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-tibeb-green px-5 py-3.5 font-semibold text-white
                     transition hover:bg-tibeb-green-dark
                     disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading
            ? isSignIn
              ? "Signing in..."
              : "Creating account..."
            : isSignIn
              ? "Sign In →"
              : "Create Account →"}
        </button>
      </form>

      <div className="my-6 flex items-center gap-4">
        <div className="h-px flex-1 bg-border" />
        <span className="text-sm text-text-muted">or</span>
        <div className="h-px flex-1 bg-border" />
      </div>

      <button
        type="button"
        onClick={handleGoogleSignIn}
        disabled={loading}
        className="flex w-full items-center justify-center gap-3 rounded-lg border border-border
                   bg-white px-5 py-3 font-medium text-text-primary transition hover:bg-tibeb-cream
                   disabled:cursor-not-allowed disabled:opacity-60"
      >
        <span aria-hidden="true" className="text-lg font-semibold">
          G
        </span>
        Continue with Google
      </button>

      <p className="mt-7 text-center text-sm text-text-secondary">
        {isSignIn ? "Don't have an account? " : "Already have an account? "}
        <Link
          href={isSignIn ? "/sign-up" : "/sign-in"}
          className="font-semibold text-tibeb-green hover:underline"
        >
          {isSignIn ? "Create one" : "Sign in"}
        </Link>
      </p>
    </div>
  );
}
