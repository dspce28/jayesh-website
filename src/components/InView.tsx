"use client";

import { useEffect, useRef, useState } from "react";

// Adds "is-in" once the element scrolls into view (for CSS-driven entrances).
export default function InView({ children, className = "", as: Tag = "div" }: { children: React.ReactNode; className?: string; as?: "div" | "ul" }) {
  const ref = useRef<HTMLDivElement & HTMLUListElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -15% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag ref={ref} className={`${className}${inView ? " is-in" : ""}`}>
      {children}
    </Tag>
  );
}
