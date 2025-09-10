import Statistics from '@/components/dashboard/content/Statistics';
import Users from '@/components/dashboard/content/Users';

export const TABS_ITEMS = [
  { label: 'users', slug: '#users', Component: () => <Users />, default: 'Users' },
  {
    label: 'statistics',
    slug: '#statistics',
    Component: () => <Statistics />,
    default: 'Statistics',
  },
];
