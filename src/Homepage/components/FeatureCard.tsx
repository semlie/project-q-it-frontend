type FeatureCardProps = {
  title: string;
  text?: string;
  circleClassName: string;
  icon: React.ReactNode;
};

export default function FeatureCard({ title, text, circleClassName, icon }: FeatureCardProps) {
  return (
    <div className="feature-card">
      <div className={`icon-circle ${circleClassName}`}>{icon}</div>
      <h3 className="feature-title">{title}</h3>
      <p className="feature-text">{text || ''}</p>
    </div>
  );
}
