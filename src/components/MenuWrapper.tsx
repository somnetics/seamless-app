import Image from "next/image";
import Menu from "../components/Menu";
import menuData from "../data/menu.json";

export default function Menuwrapper() {
  const { orientation } = menuData;
  return (
    <div className={`flex items-top justify-start font-sans h-auto w-screen`}>
      <div
        className={
          orientation === "vertical"
            ? "flex h-screen bg-[#313a46]"
            : "flex h-auto w-screen bg-[#313a46]"
        }
      >
        <Menu />
      </div>
    </div>
  );
}
