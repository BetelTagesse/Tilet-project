import { RotateCcw, ShieldCheck, Truck } from "lucide-react";

const ITEMS = [
  { icon: Truck, title: "Free Shipping", text: "On orders over ETB 5,000" },
  { icon: ShieldCheck, title: "Secure Payment", text: "SSL encrypted" },
  { icon: RotateCcw, title: "Easy Returns", text: "Within 7 days" },
];

export default function TrustBar() {
  return (
    <section className="mt-10 grid gap-6 sm:grid-cols-3">
      {ITEMS.map(({ icon: Icon, title, text }) => (
        <div key={title} className="flex items-center gap-4">
          <Icon size={28} className="text-tibeb-green" aria-hidden="true" />
          <div>
            <p className="font-semibold">{title}</p>
            <p className="text-sm text-text-secondary">{text}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
