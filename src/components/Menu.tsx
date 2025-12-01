import React, { useState } from "react";
import { cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
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

interface MenuProps extends React.HTMLAttributes<HTMLElement> {
  collapsed?: boolean;
}

const Menu = ({ className, collapsed }: MenuProps) => {
  const { orientation, items } = menuData;
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const toggleSubmenu = (url: string) => {
    setOpenSubmenu(openSubmenu === url ? null : url);
  };

  const handleMouseEnter = (url: string) => {
    if (orientation === "horizontal") {
      setOpenSubmenu(url);
    }
  };

  const handleMouseLeave = () => {
    if (orientation === "horizontal") {
      setOpenSubmenu(null);
    }
  };

  const widthClass =
    orientation === "vertical" ? (collapsed ? "w-[150px]" : "w-[250px]") : "";
  const verticalScrollClass =
    orientation === "vertical"
      ? "overflow-y-auto h-[calc(100vh-3rem-60px)]"
      : "";

  return (
    <>
      {orientation === "vertical" ? (
        <div className="w-full flex items-center justify-start px-4 min-h-[60px]">
          <b>LOGO</b>
        </div>
      ) : null}
      <nav
        className={twMerge(
          menuVariants({
            orientation: orientation as "horizontal" | "vertical",
          }),
          widthClass,
          verticalScrollClass,
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
                {item.submenu ? (
                  <div
                    onMouseEnter={() => handleMouseEnter(item.url)}
                    onMouseLeave={handleMouseLeave}
                    className="relative"
                  >
                    <button className="px-4 py-2 hover:text-gray-400 transition cursor-pointer flex items-center">
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`ml-1 transition-transform ${
                          openSubmenu === item.url ? "rotate-180" : ""
                        }`}
                        size={16}
                      />
                    </button>
                    {openSubmenu === item.url && (
                      <div className="absolute left-0 pl-0 top-full mt-0 w-48 shadow-lg opacity-100 visible transition-all duration-200 z-10 bg-[#2c2f35]">
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
                  </div>
                ) : (
                  <Link href={item.url} className="px-4 py-2 transition block">
                    {item.label}
                  </Link>
                )}
              </>
            ) : (
              <>
                {item.submenu ? (
                  <>
                    <button
                      onClick={() => toggleSubmenu(item.url)}
                      className="px-4 py-2 hover:text-gray-400 transition text-left w-full cursor-pointer flex justify-between items-center"
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`transition-transform ${
                          openSubmenu === item.url ? "rotate-180" : ""
                        }`}
                        size={16}
                      />
                    </button>
                    <div
                      className={`w-full bg-[#2c2f35] z-10 pl-4 transition-all duration-300 ${
                        openSubmenu === item.url
                          ? "max-h-96 opacity-100"
                          : "max-h-0 opacity-0 overflow-hidden"
                      }`}
                    >
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
                  </>
                ) : (
                  <Link
                    href={item.url}
                    className="px-4 py-2 hover:text-gray-400 transition block"
                  >
                    {item.label}
                  </Link>
                )}
              </>
            )}
          </div>
        ))}
      </nav>
    </>
  );
};

export default Menu;
