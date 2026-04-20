import { ReactNode } from 'react';

interface BackgroundWrapperProps {
  children: ReactNode;
  type: 'home' | 'internal';
}

export default function BackgroundWrapper({ children, type }: BackgroundWrapperProps) {
  const bgClass =
    type === 'home'
      ? "bg-[url('/salvador_temp.png')] bg-cover bg-center bg-no-repeat"
      : "bg-[url('/folhas.png')] bg-cover bg-center bg-no-repeat";

  return (
    <div className={`grow w-full ${bgClass}`}>
      {children}
    </div>
  );
}