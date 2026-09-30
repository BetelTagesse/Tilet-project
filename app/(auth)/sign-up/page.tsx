"use client";

import AuthForm from "@/components/auth/AuthForm";

export default function SignUpPage() {
  const handleSignup = async (data: {
    name: string;
    email: string;
    password: string;
  }) => {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Unable to create account");
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-tibeb-cream p-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <AuthForm mode="signup" onSignup={handleSignup} />
      </div>
    </main>
  );
}
