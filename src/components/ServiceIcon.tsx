import React from 'react';
import { Layers, Zap, Terminal, Globe, Mic, LucideProps } from 'lucide-react';

export const SERVICE_ICON_MAP: Record<string, React.ComponentType<LucideProps>> = {
  Terminal,
  Layers,
  Zap,
  Globe,
  Mic,
};

interface ServiceIconProps extends LucideProps {
  name: string;
}

export function ServiceIcon({ name, ...props }: ServiceIconProps) {
  const IconComponent = SERVICE_ICON_MAP[name];
  if (!IconComponent) return null;
  return <IconComponent {...props} />;
}
