"use client";

import { useState } from "react";
import { contact, projectTypes } from "@/content/site";

export default function BriefForm() {
  const [status, setStatus] = useState("");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const get = (k: string) => String(form.get(k) ?? "").trim();
    const name = get("name");
    if (!name) {
      setStatus("Add your name so I know who to reply to.");
      e.currentTarget.querySelector<HTMLInputElement>("#name")?.focus();
      return;
    }
    if (contact.whatsapp.includes("X")) {
      setStatus("WhatsApp number is not set yet. Add it in src/content/site.ts.");
      return;
    }
    let text = `Hi Jayesh, I'm ${name}. I have a project that needs editing: ${get("type")}.`;
    if (get("deadline")) text += `\nDeadline: ${get("deadline")}.`;
    if (get("msg")) text += `\nAbout it: ${get("msg")}`;
    setStatus("");
    window.open(`https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
  }

  return (
    <form className="brief" onSubmit={onSubmit} noValidate>
      <div className="two">
        <div className="field">
          <label htmlFor="name">Your name</label>
          <input id="name" name="name" type="text" autoComplete="name" required />
        </div>
        <div className="field">
          <label htmlFor="type">Type of project</label>
          <select id="type" name="type">
            {projectTypes.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="field">
        <label htmlFor="deadline">When do you need it?</label>
        <input id="deadline" name="deadline" type="text" placeholder="For example, 15 November" />
      </div>
      <div className="field">
        <label htmlFor="msg">About the project</label>
        <textarea id="msg" name="msg" placeholder="Runtime, how much footage, where it will be released" />
      </div>
      <p className="status" role="status">
        {status}
      </p>
      <button className="pill accent" type="submit">
        Send on WhatsApp
      </button>
    </form>
  );
}
