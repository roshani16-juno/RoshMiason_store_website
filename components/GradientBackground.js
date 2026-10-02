export default function GradientBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]">
      <div className="blob absolute -left-24 top-10 h-96 w-96 rounded-full bg-fuchsia-500/40 blur-[110px]" />
      <div className="blob blob-delay absolute right-0 top-1/3 h-[28rem] w-[28rem] rounded-full bg-amber-400/30 blur-[120px]" />
      <div className="blob absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-indigo-500/40 blur-[110px]" />
    </div>
  );
}