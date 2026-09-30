"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

type AuthMode = "signin" | "signup";

interface AuthFormProps {
  mode: AuthMode;
  onClose?: () => void;
  onSignup?: (data: {
    name: string;
    email: string;
    password: string;
  }) => Promise<void>;
}

export default function AuthForm({ mode, onClose, onSignup }: AuthFormProps) {
  const router = useRouter();

  const isSignIn = mode === "signin";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      // ============================
      // SIGN UP
      // ============================

      if (!isSignIn) {
        if (!name.trim()) {
          setError("Please enter your name.");
          return;
        }

        if (password.length < 6) {
          setError("Password must be at least 6 characters.");
          return;
        }

        if (password !== confirmPassword) {
          setError("Passwords do not match.");
          return;
        }

        if (!onSignup) {
          setError("Signup is not configured.");
          return;
        }

        await onSignup({
          name,
          email,
          password,
        });

        // Automatically sign the user in after signup
        const result = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (result?.error) {
          setError("Account created, but we couldn't sign you in.");
          return;
        }

        router.push("/");
        router.refresh();

        return;
      }

      // ============================
      // SIGN IN
      // ============================

      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password.");
        return;
      }

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error(error);

      setError(
        isSignIn
          ? "Something went wrong signing you in."
          : "Something went wrong creating your account.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      {/* Close button - useful when used inside modal */}
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 text-gray-500 transition hover:text-gray-900"
          aria-label="Close"
        >
          ✕
        </button>
      )}

      {/* Header */}
      <div className="mb-8">
        <h2 className="font-display text-4xl font-semibold text-tibeb-green">
          {isSignIn ? "Welcome Back" : "Create Your Account"}
        </h2>

        <p className="mt-2 text-sm text-text-secondary">
          {isSignIn
            ? "Please sign in to your account to continue."
            : "Join Tilet and discover Ethiopian traditional fashion."}
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name - Signup only */}
        {!isSignIn && (
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-text-primary"
            >
              Full Name
            </label>

            <input
              id="name"
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete="name"
              className="w-full rounded-lg border border-border bg-white px-4 py-3
                         outline-none transition
                         focus:border-tibeb-green focus:ring-2
                         focus:ring-tibeb-green/10"
            />
          </div>
        )}

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-text-primary"
          >
            Email Address
          </label>

          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            className="w-full rounded-lg border border-border bg-white px-4 py-3
                       outline-none transition
                       focus:border-tibeb-green focus:ring-2
                       focus:ring-tibeb-green/10"
          />
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-medium text-text-primary"
          >
            Password
          </label>

          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete={isSignIn ? "current-password" : "new-password"}
            className="w-full rounded-lg border border-border bg-white px-4 py-3
                       outline-none transition
                       focus:border-tibeb-green focus:ring-2
                       focus:ring-tibeb-green/10"
          />
        </div>

        {/* Confirm Password - Signup only */}
        {!isSignIn && (
          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-2 block text-sm font-medium text-text-primary"
            >
              Confirm Password
            </label>

            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              autoComplete="new-password"
              className="w-full rounded-lg border border-border bg-white px-4 py-3
                         outline-none transition
                         focus:border-tibeb-green focus:ring-2
                         focus:ring-tibeb-green/10"
            />
          </div>
        )}

        {/* Remember + Forgot Password */}
        {isSignIn && (
          <div className="flex items-center justify-between">
            <label className="flex cursor-pointer items-center gap-2 text-sm text-text-secondary">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="h-4 w-4 accent-tibeb-green"
              />
              Remember me
            </label>

            <a
              href="/forgot-password"
              className="text-sm font-medium text-tibeb-green hover:underline"
            >
              Forgot password?
            </a>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-tibeb-green px-5 py-3.5
                     font-semibold text-white transition
                     hover:bg-tibeb-green-dark
                     disabled:cursor-not-allowed
                     disabled:opacity-60"
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

      {/* Divider */}
      <div className="my-6 flex items-center gap-4">
        <div className="h-px flex-1 bg-border" />
        <span className="text-sm text-text-muted">or</span>
        <div className="h-px flex-1 bg-border" />
      </div>

      {/* Google */}
      <button
        type="button"
        onClick={() => signIn("google", { callbackUrl: "/" })}
        className="flex w-full items-center justify-center gap-3 rounded-lg
                   border border-border bg-white px-5 py-3
                   font-medium text-text-primary transition
                   hover:bg-tibeb-cream"
      >
        <span className="text-lg">G</span>
        Continue with Google
      </button>

      {/* Switch Auth Mode */}
      <p className="mt-7 text-center text-sm text-text-secondary">
        {isSignIn ? (
          <>
            Don&apos;t have an account?{" "}
            <a
              href="/sign-up"
              className="font-semibold text-tibeb-green hover:underline"
            >
              Create one
            </a>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <a
              href="/sign-in"
              className="font-semibold text-tibeb-green hover:underline"
            >
              Sign in
            </a>
          </>
        )}
      </p>
    </div>
  );
}
