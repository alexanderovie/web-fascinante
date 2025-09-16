import { NavigationItem } from '@/data/header';

export const getNavigationItems = (dict: any): NavigationItem[] => [
  {
    id: 'home',
    label: dict?.navigation?.home || 'Home',
    href: '/',
    hasDropdown: false,
  },
  {
    id: 'about',
    label: dict?.navigation?.about || 'About',
    href: '/about',
    hasDropdown: false,
  },
  {
    id: 'services',
    label: dict?.navigation?.services || 'Services',
    href: '/our-services-01',
    hasDropdown: false,
  },
  {
    id: 'blog',
    label: dict?.navigation?.blog || 'Blog',
    href: '/blog',
    hasDropdown: false,
  },
  {
    id: 'contact',
    label: dict?.navigation?.contact || 'Contact',
    href: '/contact-us',
    hasDropdown: false,
  },
];
