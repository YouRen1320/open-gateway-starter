// These deliberately generic marks should be replaced with assets owned by the adopting project.
export function BrandMark({ size = 32 }) {
  return (
    <span className="brand-mark" style={{ "--brand-size": `${size}px` }} aria-hidden="true">
      O
    </span>
  );
}

export function ModelGlyph({ family }) {
  const label = { a: "A", b: "B", c: "C" }[family] || "·";
  return <span className={`model-glyph model-glyph--${family}`} aria-hidden="true">{label}</span>;
}
