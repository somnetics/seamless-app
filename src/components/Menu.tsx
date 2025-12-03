import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
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

type MenuItem = {
  url: string;
  label: string;
  icon?: string;
  submenu?: Array<{ url: string; label: string }>;
};

interface MenuProps {
  collapsed?: boolean;
  className?: string;
}

export type MenuHandle = {
  closeSubmenusImmediate: () => void;
};

const getIconComponent = (iconName?: string) => {
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
      return Home;
  }
};

const Menu = forwardRef<MenuHandle, MenuProps>(
  ({ collapsed = false, className }, ref) => {
    const { orientation = "vertical", items = [] as MenuItem[] } =
      (menuData as any) || {};
    const isVertical = orientation === "vertical";

    const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
    const [disableSubmenuTransition, setDisableSubmenuTransition] =
      useState(false);
    const submenuContainerRef = useRef<HTMLDivElement | null>(null);
    const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});

    useImperativeHandle(ref, () => ({
      closeSubmenusImmediate: () => {
        if (!openSubmenu) return;
        setDisableSubmenuTransition(true);
        setOpenSubmenu(null);
        setTimeout(() => setDisableSubmenuTransition(false), 50);
      },
    }));

    useEffect(() => {
      if (collapsed) setOpenSubmenu(null);
    }, [collapsed]);

    const toggleSubmenu = (url: string) =>
      setOpenSubmenu((s) => (s === url ? null : url));

    const handleMouseEnter = (url: string) => {
      if (isVertical && collapsed) setOpenSubmenu(url);
    };
    const handleMouseLeave = () => {
      if (isVertical && collapsed) setOpenSubmenu(null);
    };

    const collapsedWidthClass = isVertical
      ? collapsed
        ? "w-[80px]"
        : "w-[250px]"
      : "w-full";

    const verticalScroll = isVertical
      ? collapsed
        ? "overflow-visible h-auto"
        : "overflow-y-auto h-[calc(100vh)]"
      : "";

    function SubmenuPortal({
      anchorEl,
      items,
      disableTransition,
    }: {
      anchorEl: HTMLButtonElement | null | undefined;
      items: Array<{ url: string; label: string }> | undefined;
      disableTransition?: boolean;
    }) {
      const [rect, setRect] = useState<DOMRect | null>(null);

      useEffect(() => {
        if (!anchorEl) return;
        const update = () => {
          try {
            const r = anchorEl.getBoundingClientRect();
            setRect(r);
          } catch (e) {}
        };
        update();
        window.addEventListener("scroll", update, true);
        window.addEventListener("resize", update);
        return () => {
          window.removeEventListener("scroll", update, true);
          window.removeEventListener("resize", update);
        };
      }, [anchorEl]);

      if (!rect || !items || typeof document === "undefined") return null;

      const style: React.CSSProperties = {
        position: "fixed",
        left: rect.right,
        top: rect.top,
        width: 224,
        zIndex: 9999,
      };

      const cls =
        "bg-background text-foreground rounded shadow-lg border border-gray-700 dark:bg-primary dark:text-zinc-100" +
        (disableTransition ? "transition-none" : "transition-all duration-200");

      return createPortal(
        <div style={style} className={cls}>
          {items.map((s) => (
            <Link
              key={s.url}
              href={s.url}
              className="block px-4 py-2 hover:text-grayEDEDED"
            >
              {s.label}
            </Link>
          ))}
        </div>,
        document.body
      );
    }

    return (
      <aside
        className={twMerge(
          "bg-primary text-md text-foreground transition-all duration-500",
          collapsedWidthClass,
          verticalScroll,
          className
        )}
      >
        {isVertical && (
          <div className="sticky top-0 z-20 px-4 py-4 flex items-center h-19 justify-center bg-primary">
            {collapsed ? (
              <strong>LOGO</strong>
            ) : (
              <strong className="text-lg">LOGO</strong>
            )}
          </div>
        )}

        <nav
          className={
            isVertical
              ? collapsed
                ? "px-2 py-2 space-y-3 h-auto overflow-visible"
                : "px-2 py-2 space-y-3"
              : "flex items-center space-x-2 px-4"
          }
        >
          {items.map((item: MenuItem) => {
            const Icon = getIconComponent(item.icon);
            const hasSub =
              Array.isArray(item.submenu) && item.submenu.length > 0;
            const isActive = openSubmenu === item.url;

            if (isVertical && collapsed) {
              return (
                <div
                  key={item.url}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(item.url)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    ref={(el) => {
                      buttonRefs.current[item.url] = el;
                    }}
                    title={item.label}
                    className={`w-full flex items-center justify-center p-3 rounded hover:bg-muted cursor-pointer text-foreground hover:text-grayEDEDED transition-all duration-300 ${
                      isActive ? "bg-muted text-grayEDEDED" : ""
                    }`}
                    onClick={() =>
                      hasSub ? toggleSubmenu(item.url) : undefined
                    }
                  >
                    <Icon size={20} />
                  </button>

                  {hasSub && openSubmenu === item.url && (
                    <SubmenuPortal
                      anchorEl={buttonRefs.current[item.url]}
                      items={item.submenu}
                      disableTransition={disableSubmenuTransition}
                    />
                  )}
                </div>
              );
            }

            if (isVertical && !collapsed) {
              return (
                <div key={item.url}>
                  <div
                    className={`flex items-center justify-between px-3 py-2 rounded hover:text-grayEDEDED cursor-pointer transition-all duration-300 ${
                      isActive ? "bg-muted text-grayEDEDED" : ""
                    }`}
                    onClick={() =>
                      hasSub ? toggleSubmenu(item.url) : undefined
                    }
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={18} />
                      <span>{item.label}</span>
                    </div>
                    {hasSub && (
                      <ChevronRight
                        size={16}
                        className={
                          openSubmenu === item.url
                            ? "rotate-90 transition-transform"
                            : "transition-transform"
                        }
                      />
                    )}
                  </div>

                  {hasSub && (
                    <div
                      className={
                        (disableSubmenuTransition
                          ? "transition-none "
                          : "transition-all duration-300 ") +
                        (openSubmenu === item.url
                          ? "max-h-96 opacity-100"
                          : "max-h-0 opacity-0 overflow-hidden") +
                        " pl-8"
                      }
                    >
                      {item.submenu!.map((s) => (
                        <Link
                          key={s.url}
                          href={s.url}
                          className="block px-3 py-2 hover:text-grayEDEDED rounded"
                        >
                          {s.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            // horizontal/default
            return (
              <div key={item.url} className="relative">
                <div
                  className={`flex items-center gap-2 px-2 py-2 rounded hover:bg-muted cursor-pointer ${
                    isActive ? "bg-muted text-grayEDEDED" : ""
                  }`}
                  onClick={() => (hasSub ? toggleSubmenu(item.url) : undefined)}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                  {hasSub && (
                    <ChevronDown
                      size={14}
                      className={
                        openSubmenu === item.url
                          ? "rotate-180 transition-transform ml-1"
                          : "transition-transform ml-1"
                      }
                    />
                  )}
                </div>

                {hasSub && openSubmenu === item.url && (
                  <div
                    className={
                      "absolute left-0 top-full mt-1 w-48 bg-background text-foreground rounded shadow-lg z-40 " +
                      (disableSubmenuTransition
                        ? "transition-none"
                        : "transition-all duration-200")
                    }
                  >
                    {item.submenu!.map((s) => (
                      <Link
                        key={s.url}
                        href={s.url}
                        className="block px-4 py-2 hover:bg-muted"
                      >
                        {s.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </aside>
    );
  }
);

Menu.displayName = "Menu";
export default Menu;
