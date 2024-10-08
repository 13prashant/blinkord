import React from 'react';
import { useWindowSize } from '@/lib/hooks/use-window-size';
import { HeroSmall } from './hero-small';
import { HeroLarge } from './hero-large';
import { HeroBase } from './hero-base'

export function ResponsiveConnectDiscordScreen({ onConnect }: { onConnect: () => void }) {

  const { width } = useWindowSize();

  if (width === undefined) {
    return null;
  }

  if (width <= 1200) {
    return <HeroSmall onConnect={onConnect} />;
  } else if (width <= 1800) {
    return <HeroBase onConnect={onConnect} />;
  } else {
    return <HeroLarge onConnect={onConnect} />;
  }
};

