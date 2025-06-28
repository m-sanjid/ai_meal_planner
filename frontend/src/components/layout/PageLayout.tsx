import { ReactNode } from "react";

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
}

export const PageLayout = ({ children, className = "" }: PageLayoutProps) => {
  return (
    <div className={`min-h-screen ${className}`}>
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  );
};
