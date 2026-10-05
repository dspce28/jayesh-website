import { Fragment } from "react";
import { ArrowUpRight, Briefcase, Camera, CircleHelp, Clapperboard, ClipboardList, Film, FolderOpen, Layers, Mail, Phone, Send, Sparkles, UserRound, Wrench } from "lucide-react";
import BriefForm from "@/components/BriefForm";
import Clock from "@/components/Clock";
import Gallery from "@/components/Gallery";
import { InstagramIcon, WhatsappIcon, YoutubeIcon } from "@/components/icons";
import InView from "@/components/InView";
import MobileMenu from "@/components/MobileMenu";
import ProfileCard from "@/components/ProfileCard";
import RailNav from "@/components/RailNav";
import ServicesAccordion from "@/components/ServicesAccordion";
import Testimonials from "@/components/Testimonials";
import Timeline from "@/components/Timeline";
import WorkHighlights from "@/components/WorkHighlights";
import Cursor from "@/components/fx/Cursor";
import Effects from "@/components/fx/Effects";
import Intro from "@/components/fx/Intro";
import ScrollTimecode from "@/components/fx/ScrollTimecode";
import SceneLoader from "@/components/three/SceneLoader";
import { about, contact, faq, formats, journey, quote, site, stats, steps, tools, whatToSend, workedWith } from "@/content/site";

function Tag({ icon, children }: { icon: React.ReactNode; children: string }) {
  return (
    <p className="tag-pill" data-reveal>
      {icon}
      <span data-scramble>{children}</span>
    </p>
  );
}

// Hero headline, split into words so they can rise in one after another.
const HEADLINE: { w: string; hl?: "solid" | "soft" }[] = [
  { w: "From" },
  { w: "idea", hl: "soft" },
  { w: "to" },
  { w: "final cut.", hl: "solid" },
];

function Letters({ text, className }: { text: string; className?: string }) {
  return (
    <span className={className}>
      {text.split("").map((ch, i) => (
        <span key={i} className="letter" style={{ "--i": i } as React.CSSProperties}>
          {ch}
        </span>
      ))}
    </span>
  );
}

export default function Home() {
  return (
    <>
      <a className="skip" href="#contact">
        Skip to contact
      </a>
      <Intro />
      <SceneLoader />
      <ScrollTimecode />
      <Cursor />
      <Effects />

      <div className="shell">
        <ProfileCard />

        <main className="content">
          <header className="content-head">
            <div className="who">
              <span className="who-avatar" aria-hidden>
                JA
              </span>
              <span>
                <strong>{site.name}</strong>
                <span>{site.tagline}</span>
              </span>
            </div>
            <Clock />
          </header>

          {/* Hero */}
          <section id="top" className="hero">
            <h1 className="headline" data-reveal="words">
              {HEADLINE.map(({ w, hl }, i) => (
                <Fragment key={i}>
                  <span className="word" style={{ "--i": i } as React.CSSProperties}>
                    <span className="word-in">{hl ? <mark className={`hl-${hl}`}>{w}</mark> : w}</span>
                  </span>{" "}
                </Fragment>
              ))}
            </h1>
            <div data-reveal style={{ "--i": 6 } as React.CSSProperties}>
              <Timeline />
            </div>
            <ul className="stats" data-reveal>
              {stats.map((s, i) => (
                <li key={s.label} style={{ "--i": i } as React.CSSProperties}>
                  {s.count ? (
                    <strong data-count={s.count} data-from={0} data-suffix={s.suffix ?? ""}>
                      {s.count}
                      {s.suffix}
                    </strong>
                  ) : (
                    <strong>{s.value}</strong>
                  )}
                  <span>{s.label}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Formats marquee */}
          <section className="formats" aria-label="What I cut">
            <p className="formats-label">
              <Film size={16} aria-hidden /> What I cut
            </p>
            <div className="marquee">
              <ul>
                {[...formats, ...formats].map((f, i) => (
                  <li key={i} aria-hidden={i >= formats.length}>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <p className="formats-label worked">
              <Sparkles size={16} aria-hidden /> Worked with
            </p>
            <div className="marquee reverse">
              <ul>
                {[...workedWith, ...workedWith].map((n, i) => (
                  <li key={i} aria-hidden={i >= workedWith.length}>
                    {n}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* About */}
          <section id="about">
            <Tag icon={<UserRound size={14} aria-hidden />}>About</Tag>
            <h2 className="title" data-reveal>{about.heading}</h2>
            <div className="prose" data-reveal>
              {about.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <h3 className="subhead" data-reveal>Festivals, stage and screen</h3>
            <ul className="rows">
              {about.credits.map((c, i) => (
                <li key={c.title} data-reveal="row" style={{ "--i": i } as React.CSSProperties}>
                  <span>
                    <strong>{c.title}</strong>
                    <span>{c.note}</span>
                  </span>
                  <span className="rows-year">{c.year}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Journey */}
          <section id="journey">
            <Tag icon={<Briefcase size={14} aria-hidden />}>Training &amp; journey</Tag>
            <ol className="journey" data-reveal="line">
              {journey.map((j, i) => (
                <li key={j.title} data-reveal="row" style={{ "--i": i } as React.CSSProperties}>
                  <span className="journey-when">{j.period}</span>
                  <span className="journey-dot" aria-hidden />
                  <div>
                    <h3>{j.title}</h3>
                    <p>{j.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* Work */}
          <section id="work">
            <Tag icon={<Sparkles size={14} aria-hidden />}>Work highlights</Tag>
            <h2 className="title" data-reveal>
              Short films that travelled to festivals, and brand work that ships
            </h2>
            <WorkHighlights />
          </section>

          {/* Behind the scenes */}
          <section id="bts">
            <Tag icon={<Camera size={14} aria-hidden />}>Behind the scenes</Tag>
            <h2 className="title" data-reveal>
              On set, in the studio, at the timeline
            </h2>
            <div data-reveal>
              <Gallery />
            </div>
          </section>

          <Testimonials />

          {/* Services */}
          <section id="services">
            <Tag icon={<Layers size={14} aria-hidden />}>Services</Tag>
            <ServicesAccordion />
          </section>

          {/* First film */}
          <section className="first">
            <div className="first-card" data-reveal="zoom" data-tilt="3">
              <span className="work-glare" aria-hidden />
              <Clapperboard size={28} className="first-icon" aria-hidden />
              <h2 className="title">First film? Send it as it is.</h2>
              <p className="first-lede">
                Messy folders, unnamed clips, no clear shot list. That is normal. Share what you have and I will sort it out
                and tell you honestly what the film needs.
              </p>
              <ul className="send-list">
                {whatToSend.map((s) => (
                  <li key={s.title}>
                    <strong>{s.title}</strong>
                    <span>{s.body}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Tools */}
          <section id="tools">
            <Tag icon={<Wrench size={14} aria-hidden />}>Tools</Tag>
            <h2 className="title" data-reveal>The suite I cut, grade and mix in</h2>
            <InView as="ul" className="tools">
              {tools.map((t, i) => (
                <li key={t.name} style={{ "--i": i } as React.CSSProperties}>
                  <span className="tool-mark" style={{ color: t.color, background: t.bg }} aria-hidden>
                    {t.mark}
                  </span>
                  <span className="tool-name">
                    <strong>{t.name}</strong>
                    <span>{t.note}</span>
                  </span>
                  <span className="tool-bar" role="img" aria-label={`${t.level}%`}>
                    <span style={{ "--w": `${t.level}%` } as React.CSSProperties}>
                      <em>{t.level}%</em>
                    </span>
                  </span>
                </li>
              ))}
            </InView>
          </section>

          {/* Process */}
          <section className="process" aria-labelledby="process-title">
            <h2 className="title" id="process-title" data-reveal>
              How it works
            </h2>
            <ol className="steps">
              {steps.map((s, i) => (
                <li key={s.title} data-reveal="zoom" data-tilt="6" style={{ "--i": i } as React.CSSProperties}>
                  <span className="work-glare" aria-hidden />
                  <span className="step-no">{String(i + 1).padStart(2, "0")}</span>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </li>
              ))}
            </ol>
          </section>

          {/* FAQ */}
          <section id="faq">
            <Tag icon={<CircleHelp size={14} aria-hidden />}>Questions</Tag>
            <h2 className="title" data-reveal>Questions filmmakers ask</h2>
            <div className="faq" data-reveal>
              {faq.map((f) => (
                <details key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </section>

          {/* Contact */}
          <section id="contact">
            <Tag icon={<Send size={14} aria-hidden />}>Contact</Tag>
            <h2 className="title big" data-reveal>
              Have a film in mind? Send a short brief and it opens in WhatsApp, ready to go.
            </h2>
            <div data-reveal>
              <BriefForm />
            </div>
            <ul className="direct" data-reveal>
              <li>
                <a href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noopener">
                  <WhatsappIcon size={20} />
                  <span>
                    <small>WhatsApp</small>
                    {contact.phone}
                  </span>
                  <ArrowUpRight size={18} className="direct-go" aria-hidden />
                </a>
              </li>
              <li>
                <a href={`tel:${contact.phone.replace(/\s/g, "")}`}>
                  <Phone size={20} aria-hidden />
                  <span>
                    <small>Call</small>
                    {contact.phone}
                  </span>
                  <ArrowUpRight size={18} className="direct-go" aria-hidden />
                </a>
              </li>
              <li>
                <a href={`https://instagram.com/${contact.instagram}`} target="_blank" rel="noopener">
                  <InstagramIcon size={20} />
                  <span>
                    <small>Instagram</small>@{contact.instagram}
                  </span>
                  <ArrowUpRight size={18} className="direct-go" aria-hidden />
                </a>
              </li>
              <li>
                <a href={contact.youtube} target="_blank" rel="noopener">
                  <YoutubeIcon size={20} />
                  <span>
                    <small>YouTube</small>Jayesh Adhikari Films
                  </span>
                  <ArrowUpRight size={18} className="direct-go" aria-hidden />
                </a>
              </li>
              <li>
                <a href={contact.hireForm} target="_blank" rel="noopener">
                  <ClipboardList size={20} aria-hidden />
                  <span>
                    <small>Prefer a form?</small>Hire me form
                  </span>
                  <ArrowUpRight size={18} className="direct-go" aria-hidden />
                </a>
              </li>
              <li>
                <a href={contact.portfolio} target="_blank" rel="noopener">
                  <FolderOpen size={20} aria-hidden />
                  <span>
                    <small>Full portfolio</small>Google Drive folder
                  </span>
                  <ArrowUpRight size={18} className="direct-go" aria-hidden />
                </a>
              </li>
              {contact.email && (
                <li>
                  <a href={`mailto:${contact.email}`}>
                    <Mail size={20} aria-hidden />
                    <span>
                      <small>Email</small>
                      {contact.email}
                    </span>
                    <ArrowUpRight size={18} className="direct-go" aria-hidden />
                  </a>
                </li>
              )}
            </ul>
          </section>

          <section className="quote" aria-label="Motto">
            <blockquote data-reveal="words">
              <p>
                {`“${quote.text}”`.split(" ").map((w, i) => (
                  <Fragment key={i}>
                    <span className="word" style={{ "--i": i } as React.CSSProperties}>
                      <span className="word-in">{w}</span>
                    </span>{" "}
                  </Fragment>
                ))}
              </p>
              <footer>{quote.by}</footer>
            </blockquote>
          </section>

          <footer className="site-foot">
            <div className="foot-name" aria-hidden data-reveal="letters">
              <Letters text="Jayesh" />
              <Letters text="Adhikari" className="outline" />
            </div>
            <p>
              Filmmaker, theatre actor and film editor, Ahmedabad
              <br />© {new Date().getFullYear()} Jayesh Adhikari
            </p>
          </footer>
        </main>

        <RailNav />
      </div>
      <MobileMenu />
    </>
  );
}
