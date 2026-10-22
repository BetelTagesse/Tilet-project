import { redirect } from "next/navigation";
import { auth } from "@/auth";
import AuthForm from "@/components/auth/AuthForm";

export default async function SignInPage() {
  if (await auth()) redirect("/");

  return (
    <main className="flex min-h-screen items-center justify-center bg-tibeb-cream p-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <AuthForm mode="signin" />
      </div>
    </main>
  );
}
