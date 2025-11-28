import React from "react";

interface TopmenuProps {
  className?: string;
  collapsed?: boolean;
  onToggle?: () => void;
}

const Topmenu: React.FC<TopmenuProps> = ({
  className,
  collapsed,
  onToggle,
}) => {
  const isFixed = (className || "").includes("fixed");
  // const sideMenuWidth = collapsed ? 150 : 250;

  const sizeClass = isFixed
    ? collapsed
      ? "w-[calc(100vw-150px)] left-[150px]"
      : "w-[calc(100vw-250px)] left-[250px]"
    : "w-full";

  return (
    <div
      className={`${sizeClass} bg-[#202327] text-white p-4 z-10 min-h-[52px] ${
        className || "sticky top-0"
      } flex items-center justify-between`}
    >
      {onToggle ? (
        <button
          aria-pressed={collapsed}
          aria-label={collapsed ? "Expand menu" : "Collapse menu"}
          onClick={onToggle}
          className="cursor-pointer ml-4 inline-flex items-center justify-center rounded px-2 py-1 text-sm bg-white/5 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20"
        >
          <span className="sr-only">
            {collapsed ? "Expand side menu" : "Collapse side menu"}
          </span>
          <span aria-hidden className="rotate-90">
            {collapsed ? "x" : "|||"}
          </span>
        </button>
      ) : null}
    </div>
  );
};

export default Topmenu;
