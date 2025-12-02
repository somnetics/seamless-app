import React, { useState } from "react";
import Menu from "../components/Menu";
import Topmenu from "../components/Topmenu";
import menuData from "../data/menu.json";

export default function Menuwrapper() {
  const { orientation } = menuData;
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => setCollapsed((c) => !c);
  return (
    <div
      className={`flex font-sans h-screen w-screen ${
        orientation === "vertical" ? "flex-row" : "flex-col"
      }`}
    >
      <Topmenu
        className={orientation === "vertical" ? "fixed top-0" : "sticky top-0"}
        // only provide toggle/collapsed props when the layout is vertical
        onToggle={orientation === "vertical" ? toggleCollapsed : undefined}
        collapsed={orientation === "vertical" ? collapsed : undefined}
        showLogo={orientation === "horizontal"}
      />
      <div
        className={
          orientation === "vertical"
            ? `fixed left-0 top-0 h-screen bg-primary border-r border-background transition-all duration-500 ${
                collapsed ? "w-[150px]" : "w-[250px]"
              }`
            : "sticky top-13 w-screen bg-primary border-t border-background"
        }
      >
        <Menu collapsed={collapsed} />
      </div>
    </div>
  );
}
