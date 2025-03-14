// Created by Raihan Patel
// Types for the Slovak Education Center website

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  responsibilities: string[];
}

export interface Event {
  title: string;
  date: string;
  description: string;
  image?: string;
}

export interface NavigationItem {
  title: string;
  path: string;
  icon?: string;
}