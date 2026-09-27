import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative w-full overflow-hidden border-t border-white/10 bg-[#0C0D10]">
      {/* Subtle Glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(600px_120px_at_20%_-20%,rgba(163,230,53,0.08),transparent)]" />

      <div className="relative container mx-auto flex h-16 flex-col items-center justify-between gap-2 px-5 sm:flex-row">
        {/* LEFT: Logo */}
        <Link href="/" className="flex items-center gap-[10px]">
          <Image
            src={logo}
            alt="Fitlog"
            width={32}
            height={32}
            className="h-8 w-auto object-contain"
          />

          <span
            className="text-[22px] font-normal uppercase leading-[35px] tracking-[0.5px] text-[#E8EAEF]"
            style={{ fontFamily: "var(--font-oswald)" }}
          >
            Fitlog
          </span>
        </Link>

        {/* RIGHT: Copyright */}
        <p className="text-[15px] tracking-[0.3px] text-[#9CA3AF]">
          © {year} FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
};

export default Footer;