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
    <div>
      <h2 className="text-2xl font-bold tracking-tight">{heading}</h2>
    </div>
  );
}
