import React from 'react';

export default function Container({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`animate-fade-in-blur mx-auto w-full max-w-4xl px-5 sm:px-8 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
