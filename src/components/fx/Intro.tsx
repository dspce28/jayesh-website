// Film-leader countdown shown once per session (gated by the boot script in layout).
// Pure CSS so it starts before hydration; Effects lets a click or key skip it.
export default function Intro() {
  return (
    <div className="intro" aria-hidden>
      <div className="leader">
        <div className="leader-ring">
          <div className="leader-sweep" />
        </div>
        <span className="leader-cross h" />
        <span className="leader-cross v" />
        <div className="leader-nums">
          <span>3</span>
          <span>2</span>
          <span>1</span>
        </div>
      </div>
      <p className="intro-name">
        <span>Jayesh Adhikari</span>
        <span>Filmmaker · Film editor</span>
      </p>
    </div>
  );
}
