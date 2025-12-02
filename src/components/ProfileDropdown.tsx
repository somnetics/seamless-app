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
        className="inline-flex items-center gap-3 px-2 py-1 focus:outline-none text-foreground"
      >
        <User size={22} />

        <div className="flex flex-col text-left leading-tight">
          <span className="text-sm font-medium text-foreground">
            {(profileData as any).name || "User"}
          </span>
          <span className="text-xs">
            {(profileData as any).designation || ""}
          </span>
        </div>

        <ChevronDown
          size={14}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-5 w-44 border border-gray-700 dark:bg-primary dark:text-zinc-100 rounded shadow-lg z-30 text-sm">
          <ul className="py-1">
            {profileData.items.map((it) => (
              <li key={it.label}>
                {it.label === "Logout" ? (
                  <button
                    onClick={() => {
                      setOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 dark:hover:text-red-400 cursor-pointer text-foreground"
                  >
                    {it.label}
                  </button>
                ) : (
                  <Link
                    href={it.url}
                    className="block px-4 py-2 dark:hover:bg-gray-700 cursor-pointer text-foreground"
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
