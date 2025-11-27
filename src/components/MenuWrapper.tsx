import Menu from "../components/Menu";
import Topmenu from "../components/Topmenu";
import menuData from "../data/menu.json";

export default function Menuwrapper() {
  const { orientation } = menuData;
  return (
    <div
      className={`flex font-sans h-screen w-screen ${
        orientation === "vertical" ? "flex-row" : "flex-col"
      }`}
    >
      <Topmenu
        className={orientation === "vertical" ? "fixed top-0" : "sticky top-0"}
      />
      <div
        className={
          orientation === "vertical"
            ? "fixed left-0 top-14 h-[calc(100vh-3rem)] bg-[#202327]"
            : "sticky top-14 w-screen bg-[#202327] border-t border-[#3b3f47]"
        }
      >
        <Menu />
      </div>
    </div>
  );
}
