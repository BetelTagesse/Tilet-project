// import { auth, signOut } from "@/auth";
// import AuthModal from "@/components/auth/AuthModal";

// // Server Component: reads the session on the server, so only AuthModal
// // (the interactive part) sends JavaScript to the browser.
// export default async function HomePage() {
//   const session = await auth();

//   return (
//     <main className="min-h-screen bg-tibeb-cream p-6">
//       <h1 className="text-4xl font-bold text-tibeb-green">Welcome to Tilet</h1>

//       {session?.user ? (
//         <div className="mt-6 flex items-center gap-4">
//           <p className="text-text-secondary">
//             Signed in as {session.user.name ?? session.user.email}
//           </p>
//           <form
//             action={async () => {
//               "use server";
//               await signOut({ redirectTo: "/" });
//             }}
//           >
//             <button
//               type="submit"
//               className="rounded-lg border border-tibeb-green px-5 py-3 text-tibeb-green"
//             >
//               Sign out
//             </button>
//           </form>
//         </div>
//       ) : (
//         <AuthModal />
//       )}
//     </main>
//   );
// }

import Hero from "@/components/home/Hero";
import CategoryCards from "@/components/home/CategoryCards";
import BestSellers from "@/components/home/BestSellers";
import LegacyBanner from "@/components/home/LegacyBanner";
import TrustBar from "@/components/home/TrustBar";

export default function HomePage() {
  return (
    <main className="mx-auto  p-6">
      <div className="bg-red-600">p</div>
      <Hero />
      <CategoryCards />
      <BestSellers />
      <LegacyBanner />
      <TrustBar />
    </main>
  );
}
