interface SectionDividerProps {
  className?: string;
  number?: string;
  label?: string;
  accent?: "gold" | "teal";
}

export default function SectionDivider({
  className = "",
  number,
  label,
  accent = "gold",
}: SectionDividerProps) {
  const labelled = Boolean(number && label);
  const color = accent === "teal" ? "#769D8D" : "#CD8641";

  return (
    <div className={`flex items-center w-full px-10 md:px-20 py-10 ${className}`}>
      <div
        className="flex-1 h-px"
        style={{ background: `linear-gradient(to right, transparent, ${color} 60%)`, opacity: 0.35 }}
      />
      {labelled ? (
        <div className="flex items-baseline gap-3 mx-5">
          <span
            className="font-playfair text-xs md:text-sm font-medium tabular-nums"
            style={{ color }}
          >
            {number}
          </span>
          <span className="text-[0.3rem] md:text-[0.4rem]" style={{ color, opacity: 0.7 }}>/</span>
          <span className="text-cream/70 text-[0.55rem] md:text-[0.6rem] uppercase tracking-[0.45em]">
            {label}
          </span>
        </div>
      ) : (
        <div className="flex items-center gap-2 mx-4">
          <div className="w-1 h-1 rounded-full opacity-55" style={{ backgroundColor: color }} />
          <div
            className="w-2.5 h-2.5 rotate-45 border"
            style={{ borderColor: color, opacity: 0.75 }}
          />
          <div className="w-1 h-1 rounded-full opacity-55" style={{ backgroundColor: color }} />
        </div>
      )}
      <div
        className="flex-1 h-px"
        style={{ background: `linear-gradient(to left, transparent, ${color} 60%)`, opacity: 0.35 }}
      />
    </div>
  );
}
