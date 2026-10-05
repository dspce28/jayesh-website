# Collecting testimonials

Only real quotes go on the site. Send this to past clients and collaborators
(for example Sakshi Chandraakar, Nru Films and Entertainment, the Waah Zindagi and
Bhanwar teams), then add replies to `testimonials` in `src/content/site.ts`.

---

Hi {name}, I'm putting together my new portfolio site and would love a line or two
from you about working together on {project}.

A few prompts if helpful:
- What did you need, and how did the film turn out?
- What was it like working with me (process, communication, timelines)?

Two to four sentences is perfect. Please also confirm how you'd like to be
credited (name, role, company). Thank you!

Jayesh

---

Entry format in `src/content/site.ts`:

```ts
export const testimonials = [
  { quote: "…", name: "Full name", role: "Role, Company", project: "Project name" },
];
```
