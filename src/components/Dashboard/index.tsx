'use client';
import Box from '@mui/material/Box';
import { useState } from 'react';
import dynamic from 'next/dynamic';

const Topbar = dynamic(() => import('./Topbar'), { ssr: false });
const Sidebar = dynamic(() => import('./Sidebar'), { ssr: false });
const Content = dynamic(() => import('./content'), { ssr: false });

const DashboarLayout = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <Box>
      <Topbar />
      <Sidebar setSelectedTab={setSelectedTab} selectedTab={selectedTab} />
      <Content selectedTab={selectedTab} />
    </Box>
  );
};

export default DashboarLayout;
