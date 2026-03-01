export type DashboardTabItem = {
  id: string;
  label: string;
  icon: React.ReactNode;
};

export type DashboardStatItem = {
  label: string;
  value: string;
  icon: React.ReactNode;
  color: string;
};

export type UserInfoRow = {
  label: string;
  value: string | number;
};
