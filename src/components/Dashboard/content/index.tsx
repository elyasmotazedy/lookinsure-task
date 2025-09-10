'use client';
import { useAppSelector } from '@/store/hooks';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import TabPanel from '../../common/TabPanel';
import { TABS_ITEMS } from '@/lib/statics/tabs';
import { FC } from 'react';
import { DRAWER_WIDTH } from '@/lib/statics/config';

interface Props {
  selectedTab: number;
}
const Content: FC<Props> = ({ selectedTab }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  const open = useAppSelector((state) => state.ui.sidebarOpen);

  return (
    <Box
      component="main"
      className="content"
      sx={{ marginTop: '64px', marginLeft: open && !matches ? `${DRAWER_WIDTH}px` : 0 }}
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
