export default function SectionHeading({ index, title }: { index: string; title: string }) {
  return (
    <h2 className="mb-10 flex items-baseline gap-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
      <span className="font-mono text-sm text-cyan-300">{index}</span>
      {title}
      <span className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
    </h2>
  );
}
