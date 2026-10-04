"use client";

import { useSyncExternalStore } from "react";

const fmtDate = new Intl.DateTimeFormat("en-IN", { weekday: "short", day: "numeric", month: "short", timeZone: "Asia/Kolkata" });
const fmtTime = new Intl.DateTimeFormat("en-IN", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Asia/Kolkata" });

function subscribe(cb: () => void) {
  const id = setInterval(cb, 10_000);
  return () => clearInterval(id);
}
const snapshot = () => {
  const d = new Date();
  return `${fmtDate.format(d)}|${fmtTime.format(d)}`;
};

// Local time in Ahmedabad, so visiting clients know when he's awake.
export default function Clock() {
  const value = useSyncExternalStore(subscribe, snapshot, () => "");
  const [date, time] = value ? value.split("|") : ["", ""];
  return (
    <div className="clock" aria-label={value ? `Ahmedabad time ${time}` : undefined}>
      <span>{date}</span>
      <span className="clock-time">{time ? `${time} IST` : " "}</span>
    </div>
  );
}
