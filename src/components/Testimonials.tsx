import { Quote } from "lucide-react";
import { testimonials } from "@/content/site";

// Real client quotes only; renders nothing until site.ts has some.
export default function Testimonials() {
  if (!testimonials.length) return null;
  return (
    <section id="testimonials">
      <p className="tag-pill" data-reveal>
        <Quote size={14} aria-hidden />
        <span data-scramble>Kind words</span>
      </p>
      <h2 className="title" data-reveal>
        What people say after the final cut
      </h2>
      <ul className="quotes">
        {testimonials.map((t, i) => (
          <li key={t.name} data-reveal="zoom" style={{ "--i": i } as React.CSSProperties}>
            <figure>
              <blockquote>“{t.quote}”</blockquote>
              <figcaption>
                <strong>{t.name}</strong>
                <span>
                  {t.role}
                  {t.project ? ` · ${t.project}` : ""}
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}
