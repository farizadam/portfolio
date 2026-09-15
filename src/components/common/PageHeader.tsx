import React from 'react';

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export default function PageHeader({ eyebrow, title, description, children }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-6 border-b border-border pb-8 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
          {eyebrow}
        </p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">{title}</h1>
        {description && (
          <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground sm:text-lg">
            {description}
          </p>
        )}
      </div>
      {children && <div className="flex shrink-0 flex-wrap items-center gap-3">{children}</div>}
    </div>
  );
}
