'use client';
import Box from '@mui/material/Box';
import { useState } from 'react';
import Content from './content';
import Topbar from './Topbar';
import Sidebar from './Sidebar';

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
