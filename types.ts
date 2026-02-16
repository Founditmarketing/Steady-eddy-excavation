import React from 'react';

export interface Service {
  id: string;
  title: string;
  description: string;
  details?: string[];
  icon: React.ReactNode;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
}