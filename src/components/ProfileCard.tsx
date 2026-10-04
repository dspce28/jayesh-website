"use client";

import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { contact, portrait, projects, site, typingWords } from "@/content/site";
import { InstagramIcon, WhatsappIcon, YoutubeIcon } from "./icons";
import Typing from "./Typing";

export const PROJECT_EVENT = "jayesh:project";

// Sticky profile card. While a work card is in view it turns into that project's details.
export default function ProfileCard() {
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const on = (e: Event) => setActive((e as CustomEvent<number | null>).detail);
    window.addEventListener(PROJECT_EVENT, on);
    return () => window.removeEventListener(PROJECT_EVENT, on);
  }, []);

  const project = active === null ? null : projects[active];

  return (
    <aside className={`profile${project ? " is-project" : ""}`} aria-label="Profile">
      <div className="profile-media" aria-hidden>
        {portrait ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={portrait} alt="" />
        ) : (
          // No portrait yet: a slow black-and-white reel of stills from his films.
          <div className="reel">
            {projects
              .filter((p) => p.youtube)
              .slice(0, 5)
              .map((p, i) => (
                <span
                  key={p.youtube}
                  style={{ backgroundImage: `url('https://i.ytimg.com/vi/${p.youtube}/maxresdefault.jpg')`, "--i": i } as React.CSSProperties}
                />
              ))}
          </div>
        )}
      </div>

      <div className="profile-top">
        <a href="#top" className="logo" aria-label={site.name}>
          JA
        </a>
        <ul className="socials">
          {contact.instagram && (
            <li>
              <a href={`https://instagram.com/${contact.instagram}`} target="_blank" rel="noopener" aria-label="Instagram">
                <InstagramIcon />
              </a>
            </li>
          )}
          <li>
            <a href={contact.youtube} target="_blank" rel="noopener" aria-label="YouTube">
              <YoutubeIcon />
            </a>
          </li>
          <li>
            <a href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noopener" aria-label="WhatsApp">
              <WhatsappIcon />
            </a>
          </li>
        </ul>
      </div>

      <div className="availability" aria-hidden>
        <span className="dot" />
        Available for edits
      </div>

      {/* Default face: who he is */}
      <div className="profile-body face-default" aria-hidden={!!project}>
        <p className="availability-inline">
          <span className="dot" />
          Available for edits
        </p>
        <p className="hello">
          Hey, I&apos;m <Typing words={typingWords} />
        </p>
        <p>{site.intro}</p>
        <div className="profile-actions">
          <a className="icon-btn accent" href="#contact" aria-label="Contact" tabIndex={project ? -1 : 0}>
            <ArrowUpRight size={18} />
          </a>
          <a className="pill accent" href="#contact" tabIndex={project ? -1 : 0} data-magnetic>
            Send your footage
          </a>
          <a className="link" href="#work" tabIndex={project ? -1 : 0}>
            See my work
          </a>
        </div>
      </div>

      {/* Project face: shown while scrolling the work section */}
      <div className="profile-body face-project" aria-hidden={!project} aria-live="polite" key={active ?? "none"}>
        {project && (
          <>
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            <dl>
              <div>
                <dt>Year</dt>
                <dd>{project.year}</dd>
              </div>
              <div>
                <dt>Role</dt>
                <dd>{project.role}</dd>
              </div>
            </dl>
            <ul className="tags">
              {project.tags.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <div className="profile-actions">
              <a className="pill" href="#contact">
                Let&apos;s talk
              </a>
              <span className="counter">
                {String((active ?? 0) + 1).padStart(2, "0")} <span>/ {String(projects.length).padStart(2, "0")}</span>
              </span>
            </div>
          </>
        )}
      </div>
    </aside>
  );
}
