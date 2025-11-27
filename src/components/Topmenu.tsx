import React from "react";

interface TopmenuProps {
  className?: string;
}

const Topmenu: React.FC<TopmenuProps> = ({ className }) => {
  return (
    <div
      className={`w-full bg-[#202327] text-white p-4 z-10 ${
        className || "sticky top-0"
      }`}
    >
      Top Menu
    </div>
  );
};

export default Topmenu;
