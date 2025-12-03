import React, { useState, useRef } from "react";
import Menu from "../components/Menu";
import Topmenu from "../components/Topmenu";
import menuData from "../data/menu.json";

export default function Menuwrapper() {
  const { orientation } = menuData;
  const [collapsed, setCollapsed] = useState(false);
  const menuRef = useRef<any>(null);

  const toggleCollapsed = () => {
    // when collapsing, first request the Menu to close submenus immediately
    if (!collapsed) {
      menuRef.current?.closeSubmenusImmediate?.();
      setCollapsed(true);
      return;
    }
    setCollapsed(false);
  };
  return (
    <div
      className={`flex font-sans h-screen w-screen shadow-r-md ${
        orientation === "vertical" ? "flex-row" : "flex-col"
      }`}
    >
      <Topmenu
        className={orientation === "vertical" ? "fixed top-0" : "sticky top-0"}
        onToggle={orientation === "vertical" ? toggleCollapsed : undefined}
        collapsed={orientation === "vertical" ? collapsed : undefined}
        showLogo={orientation === "horizontal"}
      />
      <div
        className={
          orientation === "vertical"
            ? `sticky left-0 top-0 h-screen bg-primary border-r border-background transition-all duration-500 ${
                collapsed ? "w-[80px]" : "w-[250px]"
              }`
            : "sticky top-13 w-screen bg-primary border-t border-background px-2"
        }
      >
        <Menu ref={menuRef} collapsed={collapsed} />
      </div>
    </div>
  );
}
