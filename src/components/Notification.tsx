import React, { useEffect, useRef, useState } from "react";
import { Bell, X } from "lucide-react";

export default function Notification() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New message from John", time: "2 minutes ago" },
    { id: 2, message: "Your report is ready", time: "1 hour ago" },
    { id: 3, message: "Meeting scheduled for 3 PM", time: "3 hours ago" },
  ]);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const removeNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="inline-flex items-center justify-center p-2 focus:outline-none text-foreground rounded transition-colors cursor-pointer"
      >
        <div className="relative">
          <Bell size={22} />
          {notifications.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-400 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {notifications.length}
            </span>
          )}
        </div>
      </button>

      {open && (
        <div className="absolute right-0 mt-5 w-80 border border-gray-700 dark:bg-primary dark:text-zinc-100 rounded shadow-lg z-30 text-sm max-h-96 overflow-y-auto">
          <div className="sticky top-0 bg-primary px-4 py-3 border-b border-gray-700 flex items-center justify-between">
            <strong className="text-foreground">Notifications</strong>
            {notifications.length > 0 && (
              <button
                onClick={() => setNotifications([])}
                className="text-xs text-gray-400 hover:text-foreground transition-colors cursor-pointer"
              >
                Clear All
              </button>
            )}
          </div>

          {notifications.length > 0 ? (
            <ul className="py-1">
              {notifications.map((notif) => (
                <li
                  key={notif.id}
                  className="px-4 py-3 border-b border-gray-700 hover:bg-gray-700 transition-colors flex items-start justify-between gap-3 group"
                >
                  <div className="flex-1">
                    <p className="text-foreground">{notif.message}</p>
                    <span className="text-xs text-gray-400">{notif.time}</span>
                  </div>
                  <button
                    onClick={() => removeNotification(notif.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-foreground"
                  >
                    <X size={16} />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-4 py-8 text-center text-gray-400">
              No notifications
            </div>
          )}
        </div>
      )}
    </div>
  );
}
