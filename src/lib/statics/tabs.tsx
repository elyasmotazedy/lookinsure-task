import Users from '@/components/dashboard/content/Users';

export const TABS_ITEMS = [
  { label: 'users', path: '/', Component: () => <Users />, default: 'Users' },
  // { label: 'users', path: '/orders', Component: () => <Box>Orders</Box> },
  // { label: 'users', path: '/products', Component: () => <Box>Products</Box> },
  // { label: 'users', path: '/customers', Component: () => <Users /> },
];
