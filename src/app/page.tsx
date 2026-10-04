import { Briefcase, CircleHelp, Clapperboard, Film, Layers, Mail, Send, Sparkles, UserRound, Wrench } from "lucide-react";
import BriefForm from "@/components/BriefForm";
import Clock from "@/components/Clock";
import InView from "@/components/InView";
import ProfileCard from "@/components/ProfileCard";
import RailNav from "@/components/RailNav";
import ServicesAccordion from "@/components/ServicesAccordion";
import Timeline from "@/components/Timeline";
import WorkHighlights from "@/components/WorkHighlights";
import SceneLoader from "@/components/three/SceneLoader";
import { about, contact, faq, formats, journey, quote, site, stats, steps, tools, whatToSend } from "@/content/site";

function Tag({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <p className="tag-pill">
      {icon}
      {children}
    </p>
  );
}

export default function Home() {
  return (
    <>
      <a className="skip" href="#contact">
        Skip to contact
      </a>
      <SceneLoader />

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
            <h1>
              I cut <mark className="hl-solid">short films</mark> <mark className="hl-soft">&amp; ad films</mark> that people
              remember
            </h1>
            <Timeline />
            <ul className="stats">
              {stats.map((s) => (
                <li key={s.label}>
                  <strong>{s.value}</strong>
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
          </section>

          {/* About */}
          <section id="about">
            <Tag icon={<UserRound size={14} aria-hidden />}>About</Tag>
            <h2 className="title">{about.heading}</h2>
            <div className="prose">
              {about.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <h3 className="subhead">Stage and screen</h3>
            <ul className="rows">
              {about.credits.map((c) => (
                <li key={c.title}>
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
            <ol className="journey">
              {journey.map((j) => (
                <li key={j.title}>
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
            <WorkHighlights />
          </section>

          {/* Services */}
          <section id="services">
            <Tag icon={<Layers size={14} aria-hidden />}>Services</Tag>
            <ServicesAccordion />
          </section>

          {/* First film */}
          <section className="first">
            <div className="first-card">
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
            <h2 className="title">The suite I cut, grade and mix in</h2>
            <InView as="ul" className="tools">
              {tools.map((t) => (
                <li key={t.name}>
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
            <h2 className="title" id="process-title">
              How it works
            </h2>
            <ol className="steps">
              {steps.map((s, i) => (
                <li key={s.title}>
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
            <h2 className="title">Questions filmmakers ask</h2>
            <div className="faq">
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
            <h2 className="title big">
              Have footage waiting? Send me a short brief and it opens in WhatsApp, ready to go.
            </h2>
            <BriefForm />
            <a className="contact-mail" href={`mailto:${contact.email}`}>
              <Mail size={18} aria-hidden /> {contact.email}
            </a>
          </section>

          <section className="quote" aria-label="Motto">
            <blockquote>
              <p>“{quote.text}”</p>
              <footer>{quote.by}</footer>
            </blockquote>
          </section>

          <footer className="site-foot">
            <div className="foot-name" aria-hidden>
              <span>Jayesh</span>
              <span className="outline">Adhikari</span>
            </div>
            <p>
              Filmmaker and film editor, Ahmedabad
              <br />© {new Date().getFullYear()} Jayesh Adhikari
            </p>
          </footer>
        </main>

        <RailNav />
      </div>
    </>
  );
}
