import React from 'react';

interface SectionHeadingProps {
  subHeading: string;
  heading: string;
}

export default function SectionHeading({
  subHeading,
  heading,
}: SectionHeadingProps) {
  return (
    <div className="space-y-1">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
        {subHeading}
      </p>
      <h2 className="text-2xl font-bold tracking-tight">{heading}</h2>
    </div>
  );
}
