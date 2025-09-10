'use client';
import { useAppSelector } from '@/store/hooks';
import { Box } from '@mui/material';
import TabPanel from '../../common/TabPanel';
import { TABS_ITEMS } from '@/lib/statics/tabs';
import { FC } from 'react';

interface Props {
  selectedTab: number;
}
const Content: FC<Props> = ({ selectedTab }) => {
  const open = useAppSelector((state) => state.ui.sidebarOpen);
  const drawerWidth = 240;
  return (
    <Box
      component="main"
      className="content"
      sx={{ marginTop: '64px', marginLeft: open ? `${drawerWidth}px` : 0 }}
    >
      {TABS_ITEMS.map((item, index) => (
        <TabPanel key={item.label} value={selectedTab} index={index}>
          <item.Component />
        </TabPanel>
      ))}
    </Box>
  );
};

export default Content;
