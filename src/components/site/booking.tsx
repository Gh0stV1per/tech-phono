import { motion, AnimatePresence } from "motion/react";
import { useState, createContext, useContext, useMemo, type ReactNode, FormEvent } from "react";
import { Smartphone, Laptop, Monitor, X, User, Phone, Mail, MessageSquare, ArrowUpRight, CheckCircle2, ChevronDown } from "lucide-react";

const BookingCtx = createContext<{ open: () => void }>({ open: () => {} });
export const useBooking = () => useContext(BookingCtx);

type DeviceType = "Mobile" | "Laptop" | "PC";

const CATALOG: Record<DeviceType, { brands: string[]; models: Record<string, string[]> }> = {
  Mobile: {
    brands: ["Apple", "Samsung", "OnePlus", "Xiaomi", "Realme", "Vivo", "Oppo", "Other"],
    models: {
      Apple: ["iPhone 15 Pro Max", "iPhone 15 Pro", "iPhone 15", "iPhone 14", "iPhone 13", "iPhone 12", "iPhone 11", "iPhone SE", "Older / Other"],
      Samsung: ["Galaxy S24 Ultra", "Galaxy S24", "Galaxy S23", "Galaxy S22", "Galaxy Note 20", "Galaxy A54", "Galaxy M-series", "Older / Other"],
      OnePlus: ["OnePlus 12", "OnePlus 11", "OnePlus 10 Pro", "OnePlus Nord 3", "OnePlus Nord CE", "Older / Other"],
      Xiaomi: ["Mi 14", "Mi 13", "Redmi Note 13 Pro", "Redmi Note 12", "Poco F5", "Older / Other"],
      Realme: ["Realme GT 5", "Realme 11 Pro", "Realme Narzo", "Older / Other"],
      Vivo: ["Vivo X100", "Vivo V29", "Vivo Y-series", "Older / Other"],
      Oppo: ["Oppo Find X7", "Oppo Reno 11", "Oppo A-series", "Older / Other"],
      Other: ["Tell us in the issue box"],
    },
  },
  Laptop: {
    brands: ["Apple", "Dell", "HP", "Lenovo", "Asus", "Acer", "MSI", "Other"],
    models: {
      Apple: ["MacBook Pro M3", "MacBook Pro M2", "MacBook Pro M1", "MacBook Air M3", "MacBook Air M2", "MacBook Air M1", "Older Intel MacBook"],
      Dell: ["XPS 15", "XPS 13", "Inspiron", "Latitude", "Alienware", "Other"],
      HP: ["Spectre x360", "Envy", "Pavilion", "Omen", "EliteBook", "Other"],
      Lenovo: ["ThinkPad X1", "ThinkPad T-series", "IdeaPad", "Legion", "Yoga", "Other"],
      Asus: ["ROG Strix", "Zenbook", "Vivobook", "TUF Gaming", "Other"],
      Acer: ["Predator", "Swift", "Aspire", "Nitro", "Other"],
      MSI: ["Stealth", "Raider", "Katana", "Modern", "Other"],
      Other: ["Tell us in the issue box"],
    },
  },
  PC: {
    brands: ["Custom Build", "Dell", "HP", "Lenovo", "Apple iMac", "Asus", "Other"],
    models: {
      "Custom Build": ["Gaming Rig", "Workstation", "Home / Office PC", "Other"],
      Dell: ["OptiPlex", "XPS Desktop", "Alienware Aurora", "Other"],
      HP: ["Pavilion Desktop", "Omen Desktop", "EliteDesk", "Other"],
      Lenovo: ["ThinkCentre", "IdeaCentre", "Legion Tower", "Other"],
      "Apple iMac": ["iMac M3", "iMac M1", "Older Intel iMac", "Mac Mini", "Mac Studio"],
      Asus: ["ROG Desktop", "ProArt", "Other"],
      Other: ["Tell us in the issue box"],
    },
  },
};

// 🔧 FORMSPREE CONFIG - Apna Form ID yahan paste karein
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xjgzqyre";

export function BookingProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <BookingCtx.Provider value={{ open: () => setOpen(true) }}>
      {children}
      <BookingModal open={open} onClose={() => setOpen(false)} />
    </BookingCtx.Provider>
  );
}

function BookingModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [step, setStep] = useState<"form" | "success">("form");
  const [device, setDevice] = useState<DeviceType>("Mobile");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [issue, setIssue] = useState("");
  
  // Formspree states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const brands = CATALOG[device].brands;
  const models = useMemo(() => (brand ? CATALOG[device].models[brand] ?? [] : []), [device, brand]);

  const reset = () => {
    setStep("form");
    setBrand("");
    setModel("");
    setName("");
    setPhone("");
    setEmail("");
    setIssue("");
    setSubmitError(null);
    onClose();
  };

  const handleDeviceChange = (d: DeviceType) => {
    setDevice(d);
    setBrand("");
    setModel("");
  };

  const handleBrandChange = (b: string) => {
    setBrand(b);
    setModel("");
  };

  // 📬 Formspree submit handler
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const formData = {
      device,
      brand: brand || "Not specified",
      model: model || "Not specified",
      name,
      phone,
      email,
      issue: issue || "Not specified",
      // Formspree special fields
      _replyto: email,
      _subject: `🔧 New Booking: ${device} Repair - ${name}`,
      _autoresponse: `Hi ${name}! 👋\n\nThanks for booking a repair with us. We'll call you within 5 minutes at ${phone} to confirm your slot.\n\n– Your Tech Team`,
    };

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStep("success");
      } else {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.errors?.general || "Submission failed");
      }
    } catch (error) {
      console.error("Formspree error:", error);
      setSubmitError(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4"
        >
          <motion.div onClick={reset} className="absolute inset-0 bg-black/70 backdrop-blur-md" />
          <motion.div
            initial={{ opacity: 0, scale: 0.85, rotateX: -20, y: 40 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, rotateX: 10, y: 20 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            style={{ transformPerspective: 1200 }}
            className="booking-modal-scroll relative w-full max-w-lg max-h-[92vh] overflow-y-auto overflow-x-hidden rounded-2xl border border-border bg-surface shadow-[var(--shadow-elevated)]"
          >
            <div className="absolute -top-32 -right-20 h-72 w-72 rounded-full bg-brand/40 blur-[100px] pointer-events-none" />
            <div className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-brand/20 blur-[100px] pointer-events-none" />
            <button
              onClick={reset}
              className="absolute top-4 right-4 z-10 h-9 w-9 rounded-full border border-border bg-background/50 backdrop-blur flex items-center justify-center hover:bg-surface-elevated hover:border-brand/50 transition"
            >
              <X className="h-4 w-4" />
            </button>

            {step === "form" ? (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleSubmit}
                className="relative p-6 sm:p-8 md:p-10"
              >
                <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-brand">
                  <span className="h-px w-8 bg-brand" />
                  Book a technician
                </div>
                <h3 className="mt-3 font-display text-2xl sm:text-3xl font-bold tracking-tight">
                  Tell us what's <span className="text-brand">broken.</span>
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  We'll call back within 5 minutes to confirm your slot.
                </p>

                {/* Error Message */}
                {submitError && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm"
                  >
                    ⚠️ {submitError}
                  </motion.div>
                )}

                <div className="mt-6">
                  <Label>Device type</Label>
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    {([
                      { id: "Mobile" as const, icon: Smartphone },
                      { id: "Laptop" as const, icon: Laptop },
                      { id: "PC" as const, icon: Monitor },
                    ]).map((d) => {
                      const active = device === d.id;
                      return (
                        <button
                          type="button"
                          key={d.id}
                          onClick={() => handleDeviceChange(d.id)}
                          className={`relative flex flex-col items-center gap-1.5 rounded-xl border px-3 py-3 text-sm transition-all ${
                            active ? "border-brand bg-brand/10 text-foreground" : "border-border bg-background hover:border-brand/40"
                          }`}
                        >
                          {active && (
                            <motion.span
                              layoutId="device-active"
                              className="absolute inset-0 rounded-xl ring-1 ring-brand/60 shadow-[var(--shadow-glow)]"
                              transition={{ type: "spring", stiffness: 400, damping: 30 }}
                            />
                          )}
                          <d.icon className="relative h-4 w-4" />
                          <span className="relative">{d.id}</span>
                        </button>
                      );
                    })}
                  </div>
                  {/* Hidden input for device */}
                  <input type="hidden" name="device" value={device} />
                </div>

                <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <SelectField
                    label={`${device} brand`}
                    value={brand}
                    onChange={handleBrandChange}
                    options={brands}
                    placeholder="Select brand"
                    name="brand"
                  />
                  <SelectField
                    label="Model"
                    value={model}
                    onChange={setModel}
                    options={models}
                    placeholder={brand ? "Select model" : "Pick a brand first"}
                    disabled={!brand}
                    name="model"
                  />
                </div>

                <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field 
                    icon={User} 
                    label="Full name" 
                    placeholder="Aman Sharma" 
                    value={name} 
                    onChange={setName} 
                    name="name"
                  />
                  <Field 
                    icon={Phone} 
                    label="Phone" 
                    placeholder="+91 99999 99999" 
                    type="tel" 
                    value={phone} 
                    onChange={setPhone}
                    name="phone"
                  />
                </div>
                
                <div className="mt-4">
                  <Field 
                    icon={Mail} 
                    label="Email" 
                    placeholder="you@example.com" 
                    type="email" 
                    value={email} 
                    onChange={setEmail}
                    name="email"
                  />
                </div>
                
                <div className="mt-4">
                  <Label>Describe the issue</Label>
                  <div className="mt-1.5 relative">
                    <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <textarea
                      required
                      rows={3}
                      name="issue"
                      value={issue}
                      onChange={(e) => setIssue(e.target.value)}
                      placeholder="Cracked display, won't charge, slow performance…"
                      className="w-full rounded-lg border border-border bg-background pl-10 pr-3 py-2.5 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition resize-none"
                    />
                  </div>
                </div>

                {/* Hidden Formspree fields */}
                <input type="hidden" name="_replyto" value={email} />
                <input type="hidden" name="_subject" value={`🔧 New Booking: ${device} Repair - ${name}`} />
                <input type="hidden" name="_autoresponse" value={`Hi ${name}! Thanks for booking. We'll call you within 5 minutes at ${phone}.`} />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group mt-8 w-full inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 font-medium text-brand-foreground hover:shadow-[var(--shadow-glow)] transition disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Request technician
                      <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </>
                  )}
                </button>
                <p className="mt-3 text-center text-xs text-muted-foreground font-mono">
                  No payment required · Free diagnosis on visit
                </p>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 380, damping: 26 }}
                className="relative p-8 sm:p-10 md:p-14 text-center"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 280, damping: 18, delay: 0.1 }}
                  className="mx-auto h-16 w-16 rounded-full bg-brand/15 flex items-center justify-center text-brand"
                >
                  <CheckCircle2 className="h-8 w-8" />
                </motion.div>
                <h3 className="mt-6 font-display text-2xl sm:text-3xl font-bold">Request received.</h3>
                <p className="mt-3 text-muted-foreground max-w-sm mx-auto text-sm sm:text-base">
                  Our team will call you in under 5 minutes to confirm your{" "}
                  <span className="text-foreground font-medium">
                    {[brand, model].filter(Boolean).join(" ") || device.toLowerCase()}
                  </span>{" "}
                  repair slot.
                </p>

                <div className="mt-6 mx-auto max-w-sm rounded-xl border border-border bg-background/40 p-4 text-left text-sm space-y-1.5">
                  <Row k="Device" v={device} />
                  {brand && <Row k="Brand" v={brand} />}
                  {model && <Row k="Model" v={model} />}
                  {name && <Row k="Name" v={name} />}
                  {phone && <Row k="Phone" v={phone} />}
                </div>

                <button
                  onClick={reset}
                  className="mt-8 inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-sm hover:bg-surface-elevated transition"
                >
                  Done
                </button>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-3">
      <span className="text-muted-foreground font-mono text-xs uppercase tracking-wider">{k}</span>
      <span className="text-foreground text-right truncate">{v}</span>
    </div>
  );
}

function Label({ children }: { children: ReactNode }) {
  return <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">{children}</label>;
}

function Field({
  icon: Icon, label, placeholder, type = "text", value, onChange, name,
}: {
  icon: typeof User; label: string; placeholder: string; type?: string;
  value: string; onChange: (v: string) => void; name: string;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <div className="mt-1.5 relative">
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          required
          type={type}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-lg border border-border bg-background pl-10 pr-3 py-2.5 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition"
        />
      </div>
    </div>
  );
}

function SelectField({
  label, value, onChange, options, placeholder, disabled, name,
}: {
  label: string; value: string; onChange: (v: string) => void;
  options: string[]; placeholder: string; disabled?: boolean; name: string;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <div className="mt-1.5 relative">
        <select
          required
          disabled={disabled}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="appearance-none w-full rounded-lg border border-border bg-background pl-3 pr-9 py-2.5 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <option value="" disabled>{placeholder}</option>
          {options.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      </div>
    </div>
  );
}