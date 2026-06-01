import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Wrench, Sparkles, Menu, X } from "lucide-react";
import { useBooking } from "./booking";
import logo from "@/assets/logo.png";

const links = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/contact", label: "Contact" },
];

export function Nav() {
  const { open } = useBooking();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        <Link to="/" className="flex items-center gap-2 shrink-0" aria-label="Tech Phono home">
          <img src={logo} alt="Tech Phono" className="h-8 sm:h-9 w-auto object-contain" />
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: true }}
              activeProps={{ className: "text-foreground" }}
              className="hover:text-foreground transition"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={open}
            className="group inline-flex items-center gap-2 rounded-full bg-brand px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-medium text-brand-foreground hover:shadow-[var(--shadow-glow)] transition-all"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span className="hidden xs:inline sm:inline">Book Service</span>
            <span className="xs:hidden sm:hidden">Book</span>
          </button>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden h-9 w-9 inline-flex items-center justify-center rounded-md border border-border text-foreground"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur">
          <nav className="px-4 py-4 flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setMenuOpen(false)}
                activeOptions={{ exact: true }}
                activeProps={{ className: "bg-surface text-foreground" }}
                className="px-3 py-2.5 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-surface transition"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border py-10 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
        <Link to="/" className="flex items-center gap-2" aria-label="Tech Phono home">
          <img src={logo} alt="Tech Phono" className="h-8 w-auto object-contain" />
        </Link>
        <div className="text-xs sm:text-sm text-muted-foreground font-mono">
          © {new Date().getFullYear()} Tech Phono. Door-to-door repair, done right.
        </div>
        <div className="flex flex-wrap gap-4 sm:gap-6 text-sm text-muted-foreground">
          <Link to="/shop" className="hover:text-foreground">Shop</Link>
          <Link to="/contact" className="hover:text-foreground">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
