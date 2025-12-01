import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { User, ChevronDown } from "lucide-react";
import profileData from "../data/profile.json";

export default function ProfileDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="inline-flex items-center gap-3 rounded px-2 py-1 bg-white/5 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20"
      >
        <User size={18} />

        <div className="flex flex-col text-left leading-tight">
          <span className="text-sm font-medium text-white">
            {(profileData as any).name || "User"}
          </span>
          <span className="text-xs text-white/70">
            {(profileData as any).designation || ""}
          </span>
        </div>

        <ChevronDown
          size={14}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-44 bg-white text-zinc-900 dark:bg-[#3b4655] dark:text-zinc-100 rounded shadow-lg z-30">
          <ul className="py-1">
            {profileData.items.map((it) => (
              <li key={it.label}>
                {it.label === "Logout" ? (
                  <button
                    onClick={() => {
                      setOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 dark:hover:text-red-400 cursor-pointer"
                  >
                    {it.label}
                  </button>
                ) : (
                  <Link
                    href={it.url}
                    className="block px-4 py-2 dark:hover:bg-[#4a586b]"
                    onClick={() => setOpen(false)}
                  >
                    {it.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
