import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import { Smartphone, Laptop, Monitor, Battery, HardDrive, Cpu, Headphones, Cable, Search, ShoppingBag, Star } from "lucide-react";
import { useBooking } from "@/components/site/booking";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — Genuine Parts & Accessories | Tech Phono" },
      { name: "description", content: "Browse genuine mobile, laptop and PC parts — batteries, displays, SSDs, RAM and accessories. Installed at your doorstep by certified engineers." },
      { property: "og:title", content: "Shop — Genuine Parts & Accessories | Tech Phono" },
      { property: "og:description", content: "Genuine OEM-grade parts with doorstep installation and 6-month warranty." },
    ],
  }),
  component: ShopPage,
});

type Category = "All" | "Mobile" | "Laptop" | "PC" | "Accessories";

type Product = {
  id: string;
  name: string;
  category: Exclude<Category, "All">;
  icon: typeof Smartphone;
  price: number;
  oldPrice?: number;
  rating: number;
  tag?: string;
  desc: string;
};

const PRODUCTS: Product[] = [
  { id: "p1", name: "iPhone 13 OLED Display", category: "Mobile", icon: Smartphone, price: 6499, oldPrice: 7999, rating: 4.9, tag: "Genuine", desc: "OEM-grade Super Retina OLED with True Tone. Installed at your doorstep." },
  { id: "p2", name: "Samsung S22 Battery Pack", category: "Mobile", icon: Battery, price: 1799, rating: 4.8, desc: "Original capacity Li-ion replacement battery with adhesive kit." },
  { id: "p3", name: "OnePlus Type-C Charging Port", category: "Mobile", icon: Cable, price: 899, rating: 4.7, desc: "USB Type-C flex assembly with mic. Includes free diagnosis." },
  { id: "p4", name: "MacBook Pro Retina Screen", category: "Laptop", icon: Laptop, price: 18999, oldPrice: 22999, rating: 4.9, tag: "OEM", desc: "Genuine 13\" Retina display assembly. 6-month warranty." },
  { id: "p5", name: "Samsung 1TB NVMe SSD", category: "Laptop", icon: HardDrive, price: 7499, rating: 4.9, tag: "Hot", desc: "Gen4 NVMe — 7000MB/s read. Free OS migration on install." },
  { id: "p6", name: "Crucial 16GB DDR4 RAM", category: "Laptop", icon: Cpu, price: 3299, rating: 4.8, desc: "3200MHz SODIMM module for laptops. Lifetime warranty." },
  { id: "p7", name: "RTX 4060 GPU 8GB", category: "PC", icon: Monitor, price: 32999, oldPrice: 35999, rating: 4.8, tag: "Gaming", desc: "MSI Ventus 2X. Installed, cabled and benchmarked at your desk." },
  { id: "p8", name: "Corsair 650W Gold PSU", category: "PC", icon: Cpu, price: 5999, rating: 4.7, desc: "80+ Gold modular PSU. Cable management included on install." },
  { id: "p9", name: "Noise-Cancel Headset", category: "Accessories", icon: Headphones, price: 2499, rating: 4.6, desc: "Wireless ANC headphones with 30hr battery and dual-device pairing." },
  { id: "p10", name: "65W GaN Charger", category: "Accessories", icon: Cable, price: 1499, rating: 4.8, tag: "New", desc: "Compact GaN-II charger — fast charges phones and laptops." },
  { id: "p11", name: "Laptop Cooling Pad", category: "Accessories", icon: Laptop, price: 1199, rating: 4.5, desc: "Aluminum mesh, dual silent fans, RGB. Tilt-adjustable." },
  { id: "p12", name: "Mobile Tempered Glass", category: "Mobile", icon: Smartphone, price: 299, rating: 4.7, desc: "9H scratch-resistant. Free installation with any service." },
];

const CATEGORIES: Category[] = ["All", "Mobile", "Laptop", "PC", "Accessories"];

function ShopPage() {
  const [cat, setCat] = useState<Category>("All");
  const [q, setQ] = useState("");

  const list = useMemo(() => {
    return PRODUCTS.filter((p) => (cat === "All" || p.category === cat) && p.name.toLowerCase().includes(q.toLowerCase()));
  }, [cat, q]);

  return (
    <>
      {/* Header */}
      <section className="relative pt-28 sm:pt-32 md:pt-40 pb-10 sm:pb-14 grid-lines">
        <div className="absolute top-24 left-1/2 -translate-x-1/2 h-[300px] w-[80vw] max-w-[700px] rounded-full bg-brand/20 blur-[120px] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-brand">
            <span className="h-px w-8 bg-brand" /> Tech Phono Shop
          </div>
          <h1 className="mt-4 font-display font-bold text-4xl sm:text-5xl md:text-7xl tracking-tight text-balance max-w-3xl">
            Genuine parts. <span className="text-brand">Installed at your door.</span>
          </h1>
          <p className="mt-4 sm:mt-5 max-w-2xl text-base sm:text-lg text-muted-foreground">
            Every product ships with free doorstep installation, 6-month warranty and a no-fix-no-fee promise.
          </p>
        </div>
      </section>

      {/* Filter bar */}
      <section className="sticky top-16 z-30 bg-background/80 backdrop-blur-xl border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search displays, batteries, SSDs…"
              className="w-full rounded-full border border-border bg-surface pl-10 pr-3 py-2.5 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto -mx-1 px-1 sm:overflow-visible">
            {CATEGORIES.map((c) => {
              const active = cat === c;
              return (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs sm:text-sm font-medium border transition ${
                    active ? "bg-brand text-brand-foreground border-brand shadow-[var(--shadow-glow)]" : "border-border bg-surface text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {c}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {list.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">No products match your search.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
              {list.map((p, i) => (
                <ProductCard key={p.id} p={p} i={i} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function ProductCard({ p, i }: { p: Product; i: number }) {
  const { open } = useBooking();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: (i % 8) * 0.05 }}
      className="group relative rounded-2xl border border-border bg-surface overflow-hidden hover:border-brand/50 transition-all flex flex-col"
    >
      {p.tag && (
        <span className="absolute top-3 right-3 z-10 rounded-full bg-brand px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-brand-foreground">
          {p.tag}
        </span>
      )}
      <div className="relative aspect-[4/3] bg-gradient-to-br from-surface-elevated to-background flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-brand/0 group-hover:bg-brand/10 transition-colors" />
        <div className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-brand/20 blur-2xl opacity-0 group-hover:opacity-100 transition" />
        <p.icon className="relative h-16 w-16 text-foreground/80 group-hover:scale-110 group-hover:text-brand transition-all duration-500" />
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
          {p.category}
          <span className="ml-auto inline-flex items-center gap-0.5 text-foreground/70">
            <Star className="h-3 w-3 fill-brand text-brand" /> {p.rating}
          </span>
        </div>
        <h3 className="mt-2 font-display text-lg font-semibold leading-tight">{p.name}</h3>
        <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2 flex-1">{p.desc}</p>
        <div className="mt-4 flex items-end gap-2">
          <div className="font-display text-2xl font-bold tracking-tight">₹{p.price.toLocaleString("en-IN")}</div>
          {p.oldPrice && <div className="text-sm text-muted-foreground line-through pb-0.5">₹{p.oldPrice.toLocaleString("en-IN")}</div>}
        </div>
        <button
          onClick={open}
          className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-full bg-brand px-4 py-2.5 text-sm font-medium text-brand-foreground hover:shadow-[var(--shadow-glow)] transition"
        >
          <ShoppingBag className="h-4 w-4" /> Order & install
        </button>
      </div>
    </motion.div>
  );
}
