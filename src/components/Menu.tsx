import React, { useState } from "react";
import { cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import Link from "next/link";
import menuData from "../data/menu.json";

const menuVariants = cva("flex", {
  variants: {
    orientation: {
      horizontal: "flex-row space-x-4",
      vertical: "flex-col space-y-2",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

const Menu = ({ className }: React.HTMLAttributes<HTMLElement>) => {
  const { orientation, items } = menuData;
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const toggleSubmenu = (url: string) => {
    setOpenSubmenu(openSubmenu === url ? null : url);
  };

  return (
    <nav
      className={twMerge(
        menuVariants({
          orientation: orientation as "horizontal" | "vertical",
        }),
        className
      )}
    >
      {items.map((item) => (
        <div
          key={item.url}
          className={
            orientation === "horizontal" ? "relative group" : "relative"
          }
        >
          {orientation === "horizontal" ? (
            <>
              <Link href={item.url} className="px-4 py-2 transition block">
                {item.label}
              </Link>
              {item.submenu && (
                <div className="absolute left-0 pl-4 top-full mt-1 w-48 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                  {item.submenu.map((subItem) => (
                    <Link
                      key={subItem.url}
                      href={subItem.url}
                      className="block px-4 py-2 hover:text-gray-400 transition"
                    >
                      {subItem.label}
                    </Link>
                  ))}
                </div>
              )}
            </>
          ) : (
            <>
              <button
                onClick={() => toggleSubmenu(item.url)}
                className="px-4 py-2 hover:text-gray-400 transition block text-left w-full cursor-pointer"
              >
                {item.label}
              </button>
              {item.submenu && openSubmenu === item.url && (
                <div className="w-full rounded-md shadow-lg z-10 pl-4">
                  {item.submenu.map((subItem) => (
                    <Link
                      key={subItem.url}
                      href={subItem.url}
                      className="block px-4 py-2 hover:text-gray-400 transition"
                    >
                      {subItem.label}
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Menu;
