"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export type AuthMode = "signin" | "signup";

interface UseAuthProps {
  mode: AuthMode;
  onClose?: () => void;
}

interface SignupData {
  name: string;
  email: string;
  password: string;
}

async function createAccount(data: SignupData): Promise<void> {
  const response = await fetch("/api/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const body = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(body.error ?? body.message ?? "Unable to create account.");
  }
}

export function useAuth({ mode, onClose }: UseAuthProps) {
  const router = useRouter();

  const isSignIn = mode === "signin";

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (loading) return;

    setError("");

    const formData = new FormData(e.currentTarget);

    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "")
      .trim()
      .toLowerCase();
    const password = String(formData.get("password") ?? "");
    const confirmPassword = String(formData.get("confirmPassword") ?? "");

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    if (!isSignIn) {
      if (!name) {
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
    }

    setLoading(true);

    try {
      // Create the account first when signing up.
      if (!isSignIn) {
        await createAccount({ name, email, password });
      }

      // Authenticate with NextAuth.
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (!result || result.error || !result.ok) {
        setError(
          isSignIn
            ? "Invalid email or password."
            : "Account created, but automatic sign-in failed. Please sign in.",
        );
        return;
      }

      // Close the modal only after authentication succeeds.
      onClose?.();

      router.replace("/");
      router.refresh();
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleSignIn() {
    if (loading) return;

    setError("");
    setLoading(true);

    try {
      await signIn("google", {
        callbackUrl: "/",
      });
    } catch {
      setError("Unable to sign in with Google. Please try again.");
      setLoading(false);
    }
  }

  return {
    isSignIn,
    error,
    loading,
    handleSubmit,
    handleGoogleSignIn,
  };
}
