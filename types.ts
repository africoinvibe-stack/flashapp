import { ReactNode } from 'react';

export interface NavItem {
  label: string;
  href: string;
}

export interface Feature {
  id: number;
  title: string;
  description: string;
  icon: ReactNode;
}

export interface Stat {
  label: string;
  value: string;
  description: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatar: string;
  content: string;
}
