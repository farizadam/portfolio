import { skillGroups } from '@/config/Skills';
import React from 'react';

import Container from '../common/Container';
import SectionHeading from '../common/SectionHeading';

export default function Skills() {
  return (
    <Container id="skills" className="py-10 sm:py-14">
      <SectionHeading subHeading="Stack" heading="What I work with" />

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {skillGroups.map((group) => (
          <div
            key={group.label}
            className="rounded-xl border border-border bg-card/50 p-5 transition-colors duration-300 hover:border-foreground/20"
          >
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="text-base font-bold">{group.label}</h3>
              <p className="text-xs text-muted-foreground">{group.description}</p>
            </div>
            <ul className="mt-4 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li
                  key={item.name}
                  className="tag-inner-shadow inline-flex items-center gap-2 rounded-md border border-border bg-background px-2.5 py-1.5 text-xs font-medium text-foreground/80 transition-colors hover:text-foreground"
                >
                  <span className="block size-4">{item.icon}</span>
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Container>
  );
}
