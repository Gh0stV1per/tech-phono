import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  Smartphone, Laptop, Monitor, ShieldCheck, Clock, Wrench, MapPin, Phone,
  ArrowUpRight, CheckCircle2, Battery, Cpu, HardDrive, Sparkles,
} from "lucide-react";
import heroImg from "@/assets/hero-repair.jpg";
import { useBooking } from "@/components/site/booking";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tech Phono — Door-to-Door Mobile, Laptop & PC Repair" },
      { name: "description", content: "Certified technicians at your doorstep. Mobile, laptop & PC repair in under 60 minutes with 6-month warranty." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <Marquee />
      <Services />
      <Process />
      <WhyUs />
      {/* <Pricing /> */}
      <CTA />
    </>
  );
}

/* ---------------- HERO ---------------- */
function Hero() {
  const { open } = useBooking();
  return (
    <section className="relative pt-28 pb-20 sm:pt-32 sm:pb-24 md:pt-44 md:pb-32 grid-lines">
      <div className="absolute top-32 left-1/2 -translate-x-1/2 h-[400px] w-[90vw] max-w-[800px] rounded-full bg-brand/20 blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-brand/40 bg-brand/10 px-3 py-1 text-[10px] sm:text-xs font-mono uppercase tracking-wider text-brand"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-brand animate-pulse" />
            Now serving across the city
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.05 }}
            className="mt-5 sm:mt-6 font-display font-bold text-balance text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem] leading-[1] lg:leading-[0.95] tracking-tight"
          >
            Repair at your <br className="hidden sm:block" />
            <span className="text-brand">doorstep.</span> Not in <br className="hidden sm:block" />
            a workshop queue.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-5 sm:mt-6 max-w-xl text-base sm:text-lg text-muted-foreground"
          >
            Tech Phono brings certified engineers to your home or office. Mobile, laptop and PC
            repairs — diagnosed, fixed and warrantied in front of your eyes.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-8 sm:mt-10 flex flex-wrap gap-3 sm:gap-4"
          >
            <button
              onClick={open}
              className="group inline-flex items-center gap-2 rounded-full bg-brand px-5 sm:px-6 py-3 sm:py-3.5 text-sm sm:text-base font-medium text-brand-foreground hover:shadow-[var(--shadow-glow)] transition-all"
            >
              <Sparkles className="h-4 w-4" /> Book a technician
              <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
            <a
              href="#services"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-5 sm:px-6 py-3 sm:py-3.5 text-sm sm:text-base font-medium hover:bg-surface-elevated transition-colors"
            >
              Explore services
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-10 sm:mt-12 grid grid-cols-3 gap-4 sm:gap-6 max-w-md"
          >
            {[
              { k: "12K+", v: "Devices fixed" },
              { k: "60min", v: "Avg. response" },
              { k: "4.9★", v: "Customer rating" },
            ].map((s) => (
              <div key={s.v}>
                <div className="font-display text-xl sm:text-2xl md:text-3xl font-bold">{s.k}</div>
                <div className="text-[11px] sm:text-xs text-muted-foreground mt-1">{s.v}</div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.2 }}
          className="lg:col-span-5 relative w-full"
        >
          <div className="relative aspect-[4/5] max-h-[560px] mx-auto rounded-2xl overflow-hidden border border-border shadow-[var(--shadow-elevated)]">
            <img
              src={heroImg}
              alt="Technician repairing a smartphone on a workbench with red ambient light"
              width={1600} height={1200}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
              className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5 rounded-xl border border-border bg-surface-elevated/90 backdrop-blur p-3 sm:p-4 flex items-center gap-3"
            >
              <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-brand/15 flex items-center justify-center text-brand shrink-0">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">Genuine parts. 6-month warranty.</div>
                <div className="text-[11px] sm:text-xs text-muted-foreground font-mono truncate">Insured service · OEM-grade</div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- MARQUEE ---------------- */
function Marquee() {
  const items = ["iPhone", "Samsung", "OnePlus", "MacBook", "Dell XPS", "HP", "Lenovo", "Asus", "Custom PC", "Xiaomi", "Realme", "Acer"];
  return (
    <section className="border-y border-border bg-surface/50 py-5 sm:py-6 overflow-hidden">
      <div className="flex gap-8 sm:gap-12 whitespace-nowrap animate-[scroll_30s_linear_infinite] font-display text-xl sm:text-2xl md:text-3xl text-muted-foreground">
        {[...items, ...items].map((i, idx) => (
          <span key={idx} className="flex items-center gap-8 sm:gap-12">
            {i}
            <span className="text-brand">●</span>
          </span>
        ))}
      </div>
      <style>{`@keyframes scroll{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
    </section>
  );
}

/* ---------------- SERVICES ---------------- */
function Services() {
  const services = [
    { icon: Smartphone, title: "Mobile Repair", desc: "Screen replacement, battery, charging port, water damage, motherboard fixes for every major brand.", items: ["Display & Touch", "Battery swap", "Speaker & Mic", "Motherboard"] },
    { icon: Laptop, title: "Laptop Repair", desc: "Keyboard, hinge, screen, SSD upgrades and full thermal servicing — done at your desk.", items: ["Screen / Hinge", "SSD & RAM upgrade", "Thermal paste", "OS recovery"] },
    { icon: Monitor, title: "PC & Custom Builds", desc: "Desktop troubleshooting, GPU installs, custom builds and gaming rig optimization.", items: ["GPU / PSU swap", "Custom builds", "Cable management", "BIOS & drivers"] },
  ];
  return (
    <section id="services" className="relative py-20 sm:py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionLabel>01 — Services</SectionLabel>
        <div className="mt-4 flex items-end justify-between flex-wrap gap-6">
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-6xl tracking-tight max-w-2xl text-balance">
            Every device. Every problem. <span className="text-brand">One call.</span>
          </h2>
          <p className="max-w-sm text-sm sm:text-base text-muted-foreground">
            From cracked screens to dead motherboards — our engineers carry a full workshop in a backpack.
          </p>
        </div>

        <div className="mt-12 sm:mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative rounded-2xl border border-border bg-surface p-6 sm:p-8 hover:border-brand/50 hover:bg-surface-elevated transition-all duration-500"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand/0 via-brand/0 to-brand/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="h-12 w-12 rounded-xl bg-brand/15 text-brand flex items-center justify-center">
                  <s.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 sm:mt-6 font-display text-xl sm:text-2xl font-semibold">{s.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{s.desc}</p>
                <ul className="mt-5 sm:mt-6 space-y-2.5 text-sm">
                  {s.items.map((it) => (
                    <li key={it} className="flex items-center gap-2.5 text-foreground/90">
                      <CheckCircle2 className="h-4 w-4 text-brand shrink-0" />
                      {it}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 sm:mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-brand group-hover:gap-3 transition-all">
                  Book this service <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- PROCESS ---------------- */
function Process() {
  const steps = [
    { n: "01", icon: Phone, title: "Book", desc: "Call or chat with us. Describe the issue — we'll give an estimate up front." },
    { n: "02", icon: MapPin, title: "We arrive", desc: "Certified technician reaches your door within 60 minutes in service zones." },
    { n: "03", icon: Wrench, title: "Live repair", desc: "We open, diagnose and fix in front of you. Genuine parts, real-time updates." },
    { n: "04", icon: ShieldCheck, title: "Warranty", desc: "6-month warranty on every repair. No-fix, no-fee guarantee." },
  ];
  return (
    <section id="process" className="relative py-20 sm:py-28 md:py-36 border-t border-border bg-surface/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionLabel>02 — How it works</SectionLabel>
        <h2 className="mt-4 font-display font-bold text-3xl sm:text-4xl md:text-6xl tracking-tight max-w-3xl text-balance">
          A repair shop that <span className="text-brand">comes to you.</span>
        </h2>

        <div className="mt-12 sm:mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden border border-border">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="bg-background p-6 sm:p-8 hover:bg-surface transition-colors group"
            >
              <div className="flex items-start justify-between">
                <span className="font-mono text-xs text-brand">{s.n}</span>
                <s.icon className="h-5 w-5 text-muted-foreground group-hover:text-brand transition-colors" />
              </div>
              <h3 className="mt-8 sm:mt-10 font-display text-xl sm:text-2xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- WHY US ---------------- */
function WhyUs() {
  const features = [
    { icon: Clock, title: "60-minute response", desc: "Average arrival time across all serviceable zones." },
    { icon: ShieldCheck, title: "6-month warranty", desc: "Every part and labor backed by a written warranty." },
    { icon: Battery, title: "Genuine parts only", desc: "OEM-grade displays, batteries and components." },
    { icon: Cpu, title: "Certified engineers", desc: "Background-verified, trained on 40+ device families." },
    { icon: HardDrive, title: "Data privacy", desc: "Signed NDA on every visit. Your data never leaves the device." },
    { icon: Wrench, title: "Transparent pricing", desc: "Quote first. No surprises. Pay only after the fix." },
  ];
  return (
    <section className="py-20 sm:py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionLabel>03 — Why Tech Phono</SectionLabel>
        <h2 className="mt-4 font-display font-bold text-3xl sm:text-4xl md:text-6xl tracking-tight max-w-3xl text-balance">
          Built for people who <span className="text-brand">don't have time</span> to drop off their device.
        </h2>

        <div className="mt-12 sm:mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
              className="rounded-xl border border-border p-5 sm:p-6 bg-surface/50 hover:border-brand/40 transition-colors"
            >
              <f.icon className="h-6 w-6 text-brand" />
              <h3 className="mt-4 sm:mt-5 font-display text-lg font-semibold">{f.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- PRICING ---------------- */
// function Pricing() {
//   const { open } = useBooking();
//   const plans = [
//     { name: "Standard", price: "₹299", tag: "Visit fee waived on repair", features: ["Doorstep diagnosis", "Free quote", "Same-day fix", "3-month warranty"] },
//     { name: "Priority", price: "₹599", tag: "Most chosen", featured: true, features: ["Under 60-min arrival", "OEM-grade parts", "6-month warranty", "Free follow-up visit"] },
//     { name: "Business", price: "Custom", tag: "For teams & offices", features: ["Bulk device contracts", "Dedicated engineer", "Monthly health check", "12-month warranty"] },
//   ];
//   return (
//     <section id="pricing" className="py-20 sm:py-28 md:py-36 border-t border-border bg-surface/30">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6">
//         <SectionLabel>04 — Simple Pricing</SectionLabel>
//         <h2 className="mt-4 font-display font-bold text-3xl sm:text-4xl md:text-6xl tracking-tight max-w-3xl text-balance">
//           Pay only for the <span className="text-brand">fix.</span>
//         </h2>

//         <div className="mt-12 sm:mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
//           {plans.map((p) => (
//             <div
//               key={p.name}
//               className={`relative rounded-2xl border p-6 sm:p-8 transition-all ${
//                 p.featured ? "border-brand bg-gradient-to-b from-brand/15 to-transparent shadow-[var(--shadow-glow)]" : "border-border bg-surface"
//               }`}
//             >
//               {p.featured && (
//                 <span className="absolute -top-3 left-6 sm:left-8 rounded-full bg-brand px-3 py-1 text-[10px] sm:text-xs font-mono uppercase tracking-wider text-brand-foreground">
//                   {p.tag}
//                 </span>
//               )}
//               <div className="font-display text-xl font-semibold">{p.name}</div>
//               <div className="mt-5 sm:mt-6 font-display text-4xl sm:text-5xl font-bold tracking-tight">{p.price}</div>
//               {!p.featured && <div className="mt-2 text-xs text-muted-foreground">{p.tag}</div>}
//               <ul className="mt-6 sm:mt-8 space-y-3 text-sm">
//                 {p.features.map((f) => (
//                   <li key={f} className="flex items-center gap-2.5">
//                     <CheckCircle2 className="h-4 w-4 text-brand shrink-0" />
//                     {f}
//                   </li>
//                 ))}
//               </ul>
//               <button
//                 onClick={open}
//                 className={`mt-8 sm:mt-10 w-full inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition ${
//                   p.featured ? "bg-brand text-brand-foreground hover:shadow-[var(--shadow-glow)]" : "border border-border hover:bg-surface-elevated"
//                 }`}
//               >
//                 Choose {p.name}
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

/* ---------------- CTA ---------------- */
function CTA() {
  const { open } = useBooking();
  return (
    <section id="contact" className="py-20 sm:py-28 md:py-36">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl border border-brand/40 bg-gradient-to-br from-brand/20 via-surface to-background p-7 sm:p-10 md:p-16">
          <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-brand/40 blur-[120px]" />
          <div className="relative">
            <SectionLabel>05 — Book now</SectionLabel>
            <h2 className="mt-4 font-display font-bold text-3xl sm:text-4xl md:text-6xl tracking-tight text-balance">
              Your device deserves better than a shop counter.
            </h2>
            <p className="mt-4 sm:mt-5 max-w-xl text-sm sm:text-base text-muted-foreground">
              Call us, WhatsApp us, or fill the form — a technician will be at your door before your tea gets cold.
            </p>
            <div className="mt-8 sm:mt-10 flex flex-wrap gap-3 sm:gap-4">
              <button
                onClick={open}
                className="group relative inline-flex items-center gap-2 rounded-full bg-brand px-5 sm:px-6 py-3 sm:py-3.5 text-sm sm:text-base font-medium text-brand-foreground hover:shadow-[var(--shadow-glow)] transition overflow-hidden"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:translate-x-full transition-transform duration-700" />
                <Sparkles className="h-4 w-4" /> Book Service
              </button>
              <a
                href="tel:+918527361011"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 sm:px-6 py-3 sm:py-3.5 text-sm sm:text-base font-medium hover:bg-surface transition"
              >
                <Phone className="h-4 w-4" /> +91 85273 61011
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 sm:px-6 py-3 sm:py-3.5 text-sm sm:text-base font-medium hover:bg-surface transition"
              >
                Contact page <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-brand">
      <span className="h-px w-8 bg-brand" />
      {children}
    </div>
  );
}
