import React, { ReactNode } from "react";

interface AuroraBackgroundProps {
  children: ReactNode;
}

export const AuroraBackground = ({ children }: AuroraBackgroundProps) => {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-zinc-50 dark:bg-zinc-900 transition-bg">
      {/* Aurora effect */}
      <div className="pointer-events-none absolute -inset-0 z-0">
        <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[80vh] rounded-full bg-gradient-to-tr from-blue-400 via-indigo-400 to-purple-400 opacity-30 blur-3xl animate-aurora-move" />
        <div className="absolute left-1/4 top-2/3 w-[60vw] h-[40vh] rounded-full bg-gradient-to-br from-pink-400 via-purple-400 to-blue-400 opacity-20 blur-2xl animate-aurora-move2" />
      </div>
      {/* Content */}
      <div className="relative z-10">{children}</div>
    </main>
  );
};
