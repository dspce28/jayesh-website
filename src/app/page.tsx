import Nav from "@/components/Nav";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import SceneLoader from "@/components/three/SceneLoader";
import { profile } from "@/content/profile";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="top" className="relative">
        {/* Hero */}
        <section className="relative flex min-h-svh items-center overflow-hidden">
          <div className="absolute inset-0 -z-0" aria-hidden>
            <SceneLoader />
          </div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--background)]" />
          <div className="pointer-events-none relative z-10 mx-auto w-full max-w-5xl px-4 sm:px-6">
            <Reveal>
              <p className="mb-4 font-mono text-sm text-cyan-300">Hi, my name is</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="text-5xl font-bold tracking-tight text-white sm:text-7xl md:text-8xl">
                {profile.name}
                <span className="text-gradient">.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-4 text-2xl font-medium text-white/70 sm:text-4xl">{profile.role}</p>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
                {profile.tagline}
              </p>
            </Reveal>
            <Reveal delay={0.4}>
              <div className="pointer-events-auto mt-10 flex flex-wrap gap-4">
                <a href="#projects" className="btn-primary">
                  View work
                </a>
                {profile.resumeUrl ? (
                  <a href={profile.resumeUrl} className="btn-ghost" target="_blank" rel="noreferrer">
                    Résumé
                  </a>
                ) : (
                  <a href="#contact" className="btn-ghost">
                    Contact
                  </a>
                )}
              </div>
            </Reveal>
          </div>
          <a
            href="#about"
            aria-label="Scroll to about"
            className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-white/50 hover:text-white"
          >
            <span className="scroll-cue block h-10 w-6 rounded-full border border-current" />
          </a>
        </section>

        <div className="mx-auto max-w-5xl space-y-32 px-4 pb-24 sm:px-6">
          {/* About */}
          <section id="about" className="scroll-mt-28">
            <Reveal>
              <SectionHeading index="01" title="About" />
            </Reveal>
            <div className="grid gap-10 md:grid-cols-[1.4fr_1fr]">
              <Reveal className="space-y-5 text-lg leading-relaxed text-white/70">
                {profile.about.map((p) => (
                  <p key={p}>{p}</p>
                ))}
                <p className="font-mono text-sm text-white/40">📍 {profile.location}</p>
              </Reveal>
              <Reveal delay={0.15} className="grid grid-cols-3 gap-3 md:grid-cols-1">
                {profile.stats.map((s) => (
                  <div key={s.label} className="card p-5">
                    <div className="truncate text-2xl font-bold text-gradient sm:text-3xl">{s.value}</div>
                    <div className="mt-1 text-sm text-white/50">{s.label}</div>
                  </div>
                ))}
              </Reveal>
            </div>
          </section>

          {/* Skills */}
          <section id="skills" className="scroll-mt-28">
            <Reveal>
              <SectionHeading index="02" title="Skills" />
            </Reveal>
            <div className="grid gap-5 md:grid-cols-3">
              {profile.skills.map((g, i) => (
                <Reveal key={g.group} delay={i * 0.1} className="card p-6">
                  <h3 className="mb-4 font-mono text-sm uppercase tracking-widest text-cyan-300">
                    {g.group}
                  </h3>
                  <ul className="flex flex-wrap gap-2">
                    {g.items.map((s, j) => (
                      <li key={`${s}-${j}`} className="chip">
                        {s}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>
          </section>

          {/* Experience */}
          <section id="experience" className="scroll-mt-28">
            <Reveal>
              <SectionHeading index="03" title="Experience" />
            </Reveal>
            <ol className="relative space-y-10 border-l border-white/10 pl-8">
              {profile.experience.map((e, i) => (
                <Reveal key={`${e.org}-${i}`} delay={i * 0.1}>
                  <li className="relative">
                    <span className="absolute -left-[37px] top-1.5 h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_16px_#22d3ee]" />
                    <p className="font-mono text-xs text-white/40">{e.period}</p>
                    <h3 className="mt-1 text-xl font-semibold text-white">
                      {e.title} <span className="text-white/50">· {e.org}</span>
                    </h3>
                    <p className="mt-2 max-w-2xl text-white/60">{e.summary}</p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </section>

          {/* Projects */}
          <section id="projects" className="scroll-mt-28">
            <Reveal>
              <SectionHeading index="04" title="Projects" />
            </Reveal>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {profile.projects.map((p, i) => {
                const body = (
                  <>
                    <div className="mb-4 h-32 rounded-lg bg-gradient-to-br from-indigo-500/30 via-fuchsia-500/10 to-cyan-400/30" />
                    <h3 className="text-lg font-semibold text-white">{p.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/60">{p.description}</p>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {p.tags.map((t, j) => (
                        <li key={`${t}-${j}`} className="chip text-xs">
                          {t}
                        </li>
                      ))}
                    </ul>
                  </>
                );
                return (
                  <Reveal key={`${p.title}-${i}`} delay={i * 0.1}>
                    {p.href ? (
                      <a href={p.href} target="_blank" rel="noreferrer" className="card card-hover block h-full p-5">
                        {body}
                      </a>
                    ) : (
                      <div className="card card-hover h-full p-5">{body}</div>
                    )}
                  </Reveal>
                );
              })}
            </div>
          </section>

          {/* Contact */}
          <section id="contact" className="scroll-mt-28 text-center">
            <Reveal>
              <p className="font-mono text-sm text-cyan-300">05 · What&apos;s next?</p>
              <h2 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-6xl">
                Let&apos;s build something<span className="text-gradient">.</span>
              </h2>
              <p className="mx-auto mt-6 max-w-lg text-white/60">
                Have a project, a role, or just want to say hello? My inbox is open.
              </p>
              <a href={`mailto:${profile.email}`} className="btn-primary mt-10 inline-block">
                {profile.email}
              </a>
              <ul className="mt-10 flex justify-center gap-6 text-sm text-white/50">
                {profile.socials.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noreferrer" className="hover:text-white">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </section>
        </div>

        <footer className="border-t border-white/5 py-8 text-center font-mono text-xs text-white/30">
          © {new Date().getFullYear()} {profile.name}
        </footer>
      </main>
    </>
  );
}
