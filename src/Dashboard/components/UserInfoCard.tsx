import { UserInfoRow } from './types';

type UserInfoCardProps = {
  title: string;
  avatarText: string;
  userName: string;
  userImageUrl?: string;
  rows: UserInfoRow[];
};

export default function UserInfoCard({
  title,
  avatarText,
  userName,
  userImageUrl,
  rows,
}: UserInfoCardProps) {
  return (
    <div className="user-info-card">
      <div className="user-info-card-header">
        <h2 className="section-title">{title}</h2>
      </div>
      <div className="user-info-content">
        <div className="user-info-image-section">
          {userImageUrl && userImageUrl !== 'string' ? (
            <img src={userImageUrl} alt={userName} className="user-profile-image" />
          ) : (
            <div className="user-profile-placeholder">{avatarText}</div>
          )}
        </div>
        <div className="user-info-details">
          {rows.map((row) => (
            <div className="user-info-row" key={row.label}>
              <div className="user-info-label">{row.label}:</div>
              <div className="user-info-value">{row.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
