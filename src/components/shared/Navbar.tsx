"use client";

import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "@/assets/logo.png";

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isWorkoutsActive =
    pathname === "/" || pathname.startsWith("/workouts");

  const isPlanActive = pathname.startsWith("/plan");

  const desktopLinkClass = (active: boolean) =>
    `flex items-center rounded-full px-5 py-2 text-[17.5px] font-normal uppercase leading-[35px] tracking-[0.5px] transition-colors ${
      active
        ? "bg-lime-400/10 text-lime-400"
        : "text-[#E8EAEF] hover:bg-white/10 hover:text-lime-400"
    }`;

  const mobileLinkClass = (active: boolean) =>
    `rounded-xl px-4 py-3 text-base font-normal uppercase tracking-[0.5px] transition-colors ${
      active
        ? "bg-white/10 text-white"
        : "text-[#E8EAEF] hover:bg-white/10"
    }`;

  return (
    <nav className="relative w-full overflow-hidden border-b border-white/10 bg-[#0C0D10]">
      {/* Subtle Glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(600px_120px_at_20%_-20%,rgba(163,230,53,0.08),transparent)]" />

      {/* Navbar Container */}
      <div className="container relative mx-auto flex h-16 items-center justify-between px-4 md:grid md:grid-cols-[1fr_auto_1fr] md:px-6">
        {/* LEFT */}
        <div className="flex items-center gap-2 justify-self-start md:gap-3">
          {/* Mobile Menu */}
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-[#E8EAEF] transition-all duration-200 hover:bg-white/10 hover:text-lime-400 md:hidden"
          >
            {isOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6L6 18" />
                <path d="M6 6L18 18" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="18" x2="20" y2="18" />
              </svg>
            )}
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-[10px]">
            <Image
              src={logo}
              alt="Fitlog"
              width={32}
              height={32}
              className="h-8 w-auto object-contain"
              priority
            />

            <span
              className="text-[22px] font-normal uppercase leading-[35px] tracking-[0.5px] text-[#E8EAEF] md:text-[25px]"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              Fitlog
            </span>
          </Link>
        </div>

        {/* CENTER MENU */}
        <div className="hidden items-center gap-2 justify-self-center md:flex">
          <Link
            href="/"
            className={desktopLinkClass(isWorkoutsActive)}
            style={{ fontFamily: "var(--font-oswald)" }}
          >
            Workouts
          </Link>

          <Link
            href="/plan"
            className={desktopLinkClass(isPlanActive)}
            style={{ fontFamily: "var(--font-oswald)" }}
          >
            My Plan
          </Link>
        </div>

        {/* RIGHT MENU */}
        <div className="flex items-center gap-3 justify-self-end sm:gap-4 md:gap-6">
          <Link
            href="/my-plan"
            aria-label="Today's plan"
            className="group flex items-center gap-2 rounded-md px-2 py-1.5 transition-colors hover:bg-white/5 md:px-3"
            style={{ fontFamily: "var(--font-oswald)" }}
          >
            <span className="text-[15px] font-normal uppercase leading-[35px] tracking-[0.5px] text-[#E8EAEF] transition-colors group-hover:text-lime-400">
              Plan
            </span>

            <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-lime-400 px-1.5 text-xs font-bold text-black">
              0
            </span>
          </Link>

          <Link
            href="/saved"
            aria-label="Saved workouts"
            className="group flex items-center gap-2 rounded-md px-2 py-1.5 transition-colors hover:bg-white/5 md:px-3"
            style={{ fontFamily: "var(--font-oswald)" }}
          >
            <span className="text-[15px] font-normal uppercase leading-[35px] tracking-[0.5px] text-[#E8EAEF] transition-colors group-hover:text-lime-400">
              Saved
            </span>

            <span className="flex h-6 min-w-6 items-center justify-center rounded-full border border-gray-500 px-1.5 text-xs font-bold text-gray-300 transition-all group-hover:border-lime-400 group-hover:text-lime-400">
              0
            </span>
          </Link>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="relative border-t border-white/10 px-4 pb-4 pt-3 md:hidden">
          <div className="container mx-auto flex flex-col gap-1 rounded-2xl bg-white/5 p-2">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className={mobileLinkClass(isWorkoutsActive)}
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              Workouts
            </Link>

            <Link
              href="/plan"
              onClick={() => setIsOpen(false)}
              className={mobileLinkClass(isPlanActive)}
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              My Plan
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;