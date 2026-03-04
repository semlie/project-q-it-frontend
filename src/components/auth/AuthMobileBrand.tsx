import { ReactNode } from 'react';

interface AuthMobileBrandProps {
  iconContainerClassName: string;
  icon: ReactNode;
  title?: string;
}

export default function AuthMobileBrand({
  iconContainerClassName,
  icon,
  title = 'Q-it',
}: AuthMobileBrandProps) {
  return (
    <div className="md:hidden flex flex-col items-center gap-4 mb-8">
      <div className={iconContainerClassName}>{icon}</div>
      <h1 className="text-3xl font-black text-gray-900 tracking-tighter">{title}</h1>
    </div>
  );
}
