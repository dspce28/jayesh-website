import BriefForm from "@/components/BriefForm";
import Timeline from "@/components/Timeline";
import SceneLoader from "@/components/three/SceneLoader";
import { about, contact, faq, services, site, steps, whatToSend, work } from "@/content/site";

export default function Home() {
  return (
    <>
      <a className="skip" href="#contact">
        Skip to contact
      </a>

      <div className="top" id="top">
        <SceneLoader />
        <header className="site-head">
          <div className="wrap">
            <a className="brand" href="#top">
              {site.name}
              <small>{site.tagline}</small>
            </a>
            <nav className="nav" aria-label="Main">
              <a href="#work">Work</a>
              <a href="#about">About</a>
              <a href="#services">Services</a>
              <a href="#process">How it works</a>
              <a href="#faq">Questions</a>
              <a className="btn btn-solid" href="#contact">
                Send your footage
              </a>
            </nav>
          </div>
        </header>

        <div className="hero">
          <div className="wrap">
            <h1>
              Shoot aapka.
              <br />
              Edit mera.
            </h1>
            <p className="lede">
              I&apos;m Jayesh Adhikari, a filmmaker and film editor. I edit short films, ad films and brand videos for
              filmmakers who want their footage to feel like the film they imagined.
            </p>
            <div className="actions">
              <a className="btn btn-solid" href="#contact">
                Send your footage
              </a>
              <a className="btn btn-line" href="#work">
                See my work
              </a>
            </div>
            <Timeline />
          </div>
        </div>
      </div>

      <main>
        <section id="work">
          <div className="wrap">
            <div className="section-head">
              <h2>Selected work</h2>
              <p>Short films, ad films and brand videos I have edited. Tap a row to watch.</p>
            </div>
            <div className="list">
              {work.map((w) => {
                const inner = (
                  <>
                    <span
                      className="thumb"
                      aria-hidden
                      style={w.thumb ? { backgroundImage: `url('${w.thumb}')` } : undefined}
                    />
                    <span>
                      <span className="row-title">{w.title}</span>
                      <span className="row-type">{w.type}</span>
                    </span>
                    <span className="row-len">{w.length}</span>
                    <span className="row-role">{w.role}</span>
                  </>
                );
                return w.href ? (
                  <a key={w.title} className="row" href={w.href} target="_blank" rel="noopener">
                    {inner}
                  </a>
                ) : (
                  <div key={w.title} className="row">
                    {inner}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="about" id="about">
          <div className="wrap">
            <div>
              <h2>{about.heading}</h2>
              {about.body.map((p) => (
                <p className="lede" key={p}>
                  {p}
                </p>
              ))}
              <ul className="roles" aria-label="Roles">
                {about.roles.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </div>
            <div className="credits">
              <h3>Stage and screen</h3>
              <ol>
                {about.credits.map((c) => (
                  <li key={c.title}>
                    <span className="yr">{c.year}</span>
                    <span>
                      <b>{c.title}</b>
                      <span>{c.note}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="services" id="services">
          <div className="wrap">
            <div className="intro">
              <h2>What I edit</h2>
              <p>
                Whatever the size of your project, you get one editor who is also a filmmaker and understands what you
                were trying to shoot.
              </p>
            </div>
            <div>
              {services.map((s) => (
                <div className="svc" key={s.title}>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="first">
          <div className="wrap">
            <div>
              <h2>First film? Send it as it is.</h2>
              <p className="lede">
                Messy folders, unnamed clips, no clear shot list. That is normal. Share what you have and I will sort it
                out and tell you honestly what the film needs.
              </p>
              <p style={{ marginTop: 28 }}>
                <a className="btn btn-paper" href="#contact">
                  Tell me about your film
                </a>
              </p>
            </div>
            <div className="send">
              <h3>What to send</h3>
              <ul>
                {whatToSend.map((s) => (
                  <li key={s.title}>
                    <b>{s.title}</b>
                    <span>{s.body}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="process">
          <div className="wrap">
            <div className="section-head">
              <h2>How it works</h2>
              <p>Four steps from raw footage to a film you can release.</p>
            </div>
            <div className="steps">
              {steps.map((s, i) => (
                <div className="step" key={s.title}>
                  <div className="step-no">{i + 1}</div>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="faq" id="faq">
          <div className="wrap">
            <h2>Questions filmmakers ask</h2>
            <div>
              {faq.map((f) => (
                <details key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="contact" id="contact">
          <div className="wrap">
            <div>
              <h2>Tell me about your film</h2>
              <p className="lede">
                Fill in the short brief and it opens in WhatsApp, ready to send. I reply with questions or a quote.
              </p>
              <ul className="direct">
                <li>
                  <span>WhatsApp</span>
                  <a href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noopener">
                    Message me
                  </a>
                </li>
                <li>
                  <span>Email</span>
                  <a href={`mailto:${contact.email}`}>{contact.email}</a>
                </li>
                <li>
                  <span>Instagram</span>
                  <a href={`https://instagram.com/${contact.instagram}`} target="_blank" rel="noopener">
                    @{contact.instagram}
                  </a>
                </li>
              </ul>
            </div>
            <BriefForm />
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap">
          <span>Jayesh Adhikari, filmmaker and film editor, Ahmedabad</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </footer>
    </>
  );
}
