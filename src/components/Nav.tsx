import { profile } from "@/content/profile";

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const initials = profile.name
    .split(" ")
    .map((w) => w[0])
    .join("");
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4">
      <nav className="mx-auto mt-4 flex max-w-5xl items-center justify-between rounded-full border border-white/10 bg-black/30 px-5 py-3 backdrop-blur-md">
        <a href="#top" className="font-mono text-sm font-semibold tracking-widest text-white">
          {initials}
        </a>
        <ul className="hidden gap-6 text-sm text-white/70 sm:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="transition-colors hover:text-white">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          className="rounded-full bg-white px-4 py-1.5 text-sm font-medium text-black transition hover:bg-cyan-200"
        >
          Say hi
        </a>
      </nav>
    </header>
  );
}
