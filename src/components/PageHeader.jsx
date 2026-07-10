export function PageHeader({ eyebrow, title, description, badge }) {
  return (
    <header className="page-header container">
      <div className="eyebrow-row">
        <span className="eyebrow">{eyebrow}</span>
        {badge && <span className="badge badge--notice">{badge}</span>}
      </div>
      <h1>{title}</h1>
      <p>{description}</p>
    </header>
  );
}
