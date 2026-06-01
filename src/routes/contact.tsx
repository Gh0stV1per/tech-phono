import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState } from "react";
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, CheckCircle2, Sparkles } from "lucide-react";
import { useBooking } from "@/components/site/booking";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Tech Phono — Door-to-Door Device Repair" },
      { name: "description", content: "Get in touch with Tech Phono for doorstep mobile, laptop and PC repair. Call, WhatsApp or send us a message — we reply within 5 minutes." },
      { property: "og:title", content: "Contact Tech Phono" },
      { property: "og:description", content: "Reach our certified repair team — call, WhatsApp, or send a message." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { open } = useBooking();
  const [sent, setSent] = useState(false);

  const channels = [
    { icon: Phone, label: "Call us", value: "+91 85273 61011", href: "tel:+918527361011", note: "Mon–Sun, 9am–10pm" },
    { icon: MessageCircle, label: "WhatsApp", value: "Chat instantly", href: "https://wa.me/918527361011", note: "Replies in under 5 minutes" },
    { icon: Mail, label: "Email", value: "hello@techphono.in", href: "mailto:hello@techphono.in", note: "For partnerships & bulk orders" },
    { icon: MapPin, label: "Service area", value: "Across the city", href: "#", note: "Doorstep visits within 60 minutes" },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative pt-28 sm:pt-32 md:pt-40 pb-10 sm:pb-14 grid-lines">
        <div className="absolute top-24 left-1/2 -translate-x-1/2 h-[320px] w-[80vw] max-w-[700px] rounded-full bg-brand/20 blur-[120px] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-brand">
            <span className="h-px w-8 bg-brand" /> Get in touch
          </div>
          <h1 className="mt-4 font-display font-bold text-4xl sm:text-5xl md:text-7xl tracking-tight text-balance max-w-3xl">
            Let's get your device <span className="text-brand">working again.</span>
          </h1>
          <p className="mt-4 sm:mt-5 max-w-2xl text-base sm:text-lg text-muted-foreground">
            Pick the channel that suits you — phone, WhatsApp or the form below. A real engineer responds, not a bot.
          </p>
        </div>
      </section>

      {/* Channels */}
      <section className="pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {channels.map((c, i) => (
            <motion.a
              key={c.label}
              href={c.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="group rounded-2xl border border-border bg-surface p-5 sm:p-6 hover:border-brand/50 hover:bg-surface-elevated transition-all"
            >
              <div className="h-11 w-11 rounded-xl bg-brand/15 text-brand flex items-center justify-center">
                <c.icon className="h-5 w-5" />
              </div>
              <div className="mt-4 text-xs font-mono uppercase tracking-wider text-muted-foreground">{c.label}</div>
              <div className="mt-1 font-display text-lg font-semibold group-hover:text-brand transition-colors break-words">{c.value}</div>
              <div className="mt-1.5 text-xs text-muted-foreground flex items-center gap-1.5">
                <Clock className="h-3 w-3" /> {c.note}
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* Form + Side */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-5 gap-8 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="lg:col-span-3 rounded-2xl border border-border bg-surface p-6 sm:p-8 md:p-10 relative overflow-hidden"
          >
            <div className="absolute -top-32 -right-20 h-72 w-72 rounded-full bg-brand/20 blur-[100px] pointer-events-none" />
            <div className="relative">
              <h2 className="font-display text-2xl sm:text-3xl font-bold">Send us a message</h2>
              <p className="mt-2 text-sm text-muted-foreground">We'll reply within 5 minutes during business hours.</p>

              {sent ? (
                <div className="mt-8 rounded-xl border border-brand/40 bg-brand/10 p-6 flex items-start gap-4">
                  <CheckCircle2 className="h-6 w-6 text-brand shrink-0" />
                  <div>
                    <div className="font-display text-lg font-semibold">Message received.</div>
                    <p className="mt-1 text-sm text-muted-foreground">Our team will reach out within 5 minutes.</p>
                    <button onClick={() => setSent(false)} className="mt-4 text-sm text-brand hover:underline">Send another</button>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={(e) => { e.preventDefault(); setSent(true); }}
                  className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                  <FieldInput label="Full name" placeholder="Aman Sharma" />
                  <FieldInput label="Phone" type="tel" placeholder="+91 99999 99999" />
                  <div className="sm:col-span-2">
                    <FieldInput label="Email" type="email" placeholder="you@example.com" />
                  </div>
                  <div className="sm:col-span-2">
                    <FieldInput label="Subject" placeholder="Cracked iPhone display" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Message</label>
                    <textarea
                      required rows={5}
                      placeholder="Tell us about your device and what's wrong…"
                      className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition resize-none"
                    />
                  </div>
                  <div className="sm:col-span-2 flex flex-wrap gap-3">
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-medium text-brand-foreground hover:shadow-[var(--shadow-glow)] transition"
                    >
                      <Send className="h-4 w-4" /> Send message
                    </button>
                    <button
                      type="button"
                      onClick={open}
                      className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-medium hover:bg-surface-elevated transition"
                    >
                      <Sparkles className="h-4 w-4" /> Book a technician
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="lg:col-span-2 space-y-5"
          >
            <div className="rounded-2xl border border-brand/40 bg-gradient-to-br from-brand/20 via-surface to-background p-6 sm:p-8">
              <div className="text-xs font-mono uppercase tracking-wider text-brand">Urgent repair?</div>
              <h3 className="mt-2 font-display text-2xl font-bold">Skip the form. Call us.</h3>
              <p className="mt-2 text-sm text-muted-foreground">A technician can be at your door in 60 minutes.</p>
              <a
                href="tel:+918527361011"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-brand-foreground hover:shadow-[var(--shadow-glow)] transition"
              >
                <Phone className="h-4 w-4" /> +91 85273 61011
              </a>
            </div>

            <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
              <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Working hours</div>
              <ul className="mt-3 space-y-2 text-sm">
                <li className="flex justify-between"><span>Monday – Saturday</span><span className="font-mono text-foreground/80">9:00 – 22:00</span></li>
                <li className="flex justify-between"><span>Sunday</span><span className="font-mono text-foreground/80">10:00 – 20:00</span></li>
                <li className="flex justify-between text-brand"><span>Emergency</span><span className="font-mono">24 / 7</span></li>
              </ul>
            </div>

            <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
              <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Head office</div>
              <p className="mt-3 text-sm leading-relaxed">
                Tech Phono HQ<br />
                Sector 63, Noida
              </p>
            </div>
          </motion.aside>
        </div>
      </section>
    </>
  );
}

function FieldInput({ label, type = "text", placeholder }: { label: string; type?: string; placeholder: string }) {
  return (
    <div>
      <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">{label}</label>
      <input
        required type={type} placeholder={placeholder}
        className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition"
      />
    </div>
  );
}
