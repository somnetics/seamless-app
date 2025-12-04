import React from "react";
import { Menu as MenuIcon, X as XIcon } from "lucide-react";
import Notification from "./Notification";
import ProfileDropdown from "./ProfileDropdown";

interface TopmenuProps {
  className?: string;
  collapsed?: boolean;
  onToggle?: () => void;
  showLogo?: boolean;
}

const Topmenu: React.FC<TopmenuProps> = ({
  className,
  collapsed,
  onToggle,
  showLogo,
}) => {
  const isFixed = (className || "").includes("fixed");
  // const sideMenuWidth = collapsed ? 150 : 250;

  const sizeClass = isFixed
    ? collapsed
      ? "w-[calc(100vw-80px)] left-[80px]"
      : "w-[calc(100vw-250px)] left-[250px]"
    : "w-full";

  return (
    <div
      className={`${sizeClass} bg-primary text-white px-4 z-10 min-h-[52px] ${
        className || "sticky top-0"
      } flex items-center justify-between transition-all duration-500 shadow-md`}
    >
      {isFixed ? (
        <div className="flex items-center">
          {onToggle ? (
            <button
              aria-pressed={collapsed}
              aria-label={collapsed ? "Expand menu" : "Collapse menu"}
              onClick={onToggle}
              className="cursor-pointer mr-4 inline-flex items-center justify-center rounded px-2 py-1 text-sm focus:outline-none"
            >
              <span className="sr-only">
                {collapsed ? "Expand side menu" : "Collapse side menu"}
              </span>
              <span aria-hidden className="inline-flex items-center">
                {collapsed ? (
                  <MenuIcon
                    className="transition-all text-foreground hover:text-grayEDEDED"
                    size={22}
                  />
                ) : (
                  <MenuIcon
                    className="transition-all text-foreground hover:text-grayEDEDED"
                    size={22}
                  />
                )}
              </span>
            </button>
          ) : null}

          {showLogo ? (
            <div className="text-sm font-bold px-2">
              <b>LOGO</b>
            </div>
          ) : null}
        </div>
      ) : (
        <>
          <div className="flex items-center">
            {showLogo ? (
              <div className="text-sm font-bold px-2">
                <b>LOGO</b>
              </div>
            ) : null}
          </div>

          {onToggle ? (
            <button
              aria-pressed={collapsed}
              aria-label={collapsed ? "Expand menu" : "Collapse menu"}
              onClick={onToggle}
              className="cursor-pointer ml-4 inline-flex items-center justify-center rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-white/20"
            >
              <span className="sr-only">
                {collapsed ? "Expand side menu" : "Collapse side menu"}
              </span>
              <span aria-hidden className="inline-flex items-center">
                {collapsed ? (
                  <MenuIcon className="transition-transform" size={18} />
                ) : (
                  <MenuIcon className="transition-transform" size={18} />
                )}
              </span>
            </button>
          ) : null}
          <Notification />
          <ProfileDropdown />
        </>
      )}
      {!isFixed ? null : (
        <div className="flex items-center gap-4">
          <Notification />
          <ProfileDropdown />
        </div>
      )}
    </div>
  );
};

export default Topmenu;
