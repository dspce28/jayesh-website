"use client";

import { useEffect, useState } from "react";

// Types each word, holds, deletes, moves on. Shows the first word, static, under reduced motion.
export default function Typing({ words }: { words: string[] }) {
  const [text, setText] = useState(words[0] ?? "");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let word = 0;
    let len = words[0].length;
    let deleting = true;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      const w = words[word];
      len += deleting ? -1 : 1;
      setText(w.slice(0, len));
      let delay = deleting ? 45 : 85;
      if (!deleting && len === w.length) {
        deleting = true;
        delay = 1800;
      } else if (deleting && len === 0) {
        deleting = false;
        word = (word + 1) % words.length;
        delay = 300;
      }
      timer = setTimeout(tick, delay);
    };
    timer = setTimeout(tick, 2200);
    return () => clearTimeout(timer);
  }, [words]);

  return (
    <span className="typing">
      <span className="sr-only">{words[0]}</span>
      <span aria-hidden>{text}</span>
      <span className="caret" aria-hidden />
    </span>
  );
}
