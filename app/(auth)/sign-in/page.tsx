import AuthForm from "@/components/auth/AuthForm";

export default function SignInPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-tibeb-cream p-6">
      <div className="rounded-2xl bg-white p-8 shadow-xl">
        <AuthForm mode="signin" />
      </div>
    </main>
  );
}
