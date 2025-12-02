import React, { useState } from "react";
import { cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import Link from "next/link";
import {
  ChevronDown,
  ChevronRight,
  Home,
  Info,
  Mail,
  Briefcase,
  BookOpen,
  HelpCircle,
  Settings,
  Layout,
  MessageCircle,
  CheckSquare,
} from "lucide-react";
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

const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case "Home":
      return Home;
    case "Info":
      return Info;
    case "Mail":
      return Mail;
    case "Briefcase":
      return Briefcase;
    case "BookOpen":
      return BookOpen;
    case "HelpCircle":
      return HelpCircle;
    case "Settings":
      return Settings;
    case "Layout":
      return Layout;
    case "MessageCircle":
      return MessageCircle;
    case "CheckSquare":
      return CheckSquare;
    default:
      return Home; // Default to Home icon if not found
  }
};

interface MenuProps extends React.HTMLAttributes<HTMLElement> {
  collapsed?: boolean;
}

const Menu = ({ className, collapsed }: MenuProps) => {
  const { orientation, items } = menuData;
  const isVertical = orientation === "vertical";
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

  const widthClass = isVertical ? (collapsed ? "w-[80px]" : "w-[250px]") : "";
  const verticalScrollClass = isVertical
    ? "overflow-y-auto h-[calc(100vh-3rem-60px)]"
    : "";

  return (
    <>
      {isVertical ? (
        <div className="w-full flex items-center justify-start px-4 min-h-[76px]">
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
                    <button
                      title={isVertical && collapsed ? item.label : undefined}
                      className={`px-4 py-2 text-foreground hover:text-grayEDEDED transition cursor-pointer text-md ${
                        openSubmenu === item.url ? "text-grayEDEDED" : ""
                      } ${
                        isVertical && collapsed
                          ? "flex justify-center items-center"
                          : "flex items-center"
                      }`}
                    >
                      {item.icon && getIconComponent(item.icon) && (
                        <span
                          className={`${isVertical && collapsed ? "" : "mr-2"}`}
                        >
                          {React.createElement(getIconComponent(item.icon), {
                            size: 20,
                          })}
                        </span>
                      )}
                      {/* hide label when vertical + collapsed */}
                      {!(isVertical && collapsed) && <span>{item.label}</span>}
                      <ChevronDown
                        className={`ml-1 transition-transform ${
                          openSubmenu === item.url ? "rotate-180" : ""
                        }`}
                        size={16}
                      />
                    </button>
                    {openSubmenu === item.url && (
                      <div className="absolute left-0 pl-0 top-full mt-0 w-48 shadow-lg opacity-100 visible transition-all duration-200 z-10 border border-primary">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.url}
                            href={subItem.url}
                            className="block px-4 py-2 text-foreground hover:text-grayEDEDED transition text-md"
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.url}
                    title={isVertical && collapsed ? item.label : undefined}
                    className={`px-4 py-2 transition block text-md text-foreground hover:text-grayEDEDED ${
                      isVertical && collapsed
                        ? "flex justify-center items-center"
                        : "flex items-center"
                    }`}
                  >
                    {item.icon && (
                      <span
                        className={`${isVertical && collapsed ? "" : "mr-2"}`}
                      >
                        {React.createElement(getIconComponent(item.icon), {
                          size: 20,
                        })}
                      </span>
                    )}
                    {!(isVertical && collapsed) && item.label}
                  </Link>
                )}
              </>
            ) : (
              <>
                {item.submenu ? (
                  <>
                    <button
                      title={isVertical && collapsed ? item.label : undefined}
                      onClick={() => toggleSubmenu(item.url)}
                      className={`px-4 py-2 text-foreground hover:text-grayEDEDED transition text-left w-full cursor-pointer text-md ${
                        openSubmenu === item.url ? "text-grayEDEDED" : ""
                      } ${
                        isVertical && collapsed
                          ? "flex justify-center items-center"
                          : "flex justify-between items-center"
                      }`}
                    >
                      <div className="flex items-center">
                        {item.icon && (
                          <span
                            className={`${
                              isVertical && collapsed ? "" : "mr-2"
                            }`}
                          >
                            {React.createElement(getIconComponent(item.icon), {
                              size: 20,
                            })}
                          </span>
                        )}
                        {!(isVertical && collapsed) && (
                          <span>{item.label}</span>
                        )}
                      </div>
                      {!(isVertical && collapsed) && (
                        <ChevronRight
                          className={`transition-transform ${
                            openSubmenu === item.url ? "rotate-90" : ""
                          }`}
                          size={16}
                        />
                      )}
                    </button>
                    <div
                      className={`w-full z-10 pl-4 transition-all duration-1000 ${
                        openSubmenu === item.url
                          ? "max-h-96 opacity-100"
                          : "max-h-0 opacity-0 overflow-hidden"
                      }`}
                    >
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.url}
                          href={subItem.url}
                          className={`block px-4 py-2 text-foreground hover:text-grayEDEDED transition text-md ${
                            isVertical && collapsed ? "pl-3 text-center" : ""
                          }`}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.url}
                    title={isVertical && collapsed ? item.label : undefined}
                    className={`px-4 py-2 text-foreground hover:text-grayEDEDED transition text-md ${
                      isVertical && collapsed
                        ? "flex justify-center items-center"
                        : "flex items-center"
                    }`}
                  >
                    {item.icon && (
                      <span
                        className={`${isVertical && collapsed ? "" : "mr-2"}`}
                      >
                        {React.createElement(getIconComponent(item.icon), {
                          size: 20,
                        })}
                      </span>
                    )}
                    {!(isVertical && collapsed) && item.label}
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
