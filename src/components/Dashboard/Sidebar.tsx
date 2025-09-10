'use client';
import Drawer from '@mui/material/Drawer';

import { useAppSelector } from '@/store/hooks';
import Tabs from '@mui/material/Tabs';
import { FC } from 'react';
import { a11yProps } from '@/lib/helper/a11yProps';
import Tab from '@mui/material/Tab';
import { TABS_ITEMS } from '@/lib/statics/tabs';
import { useTranslation } from 'react-i18next';
import { useMediaQuery, useTheme } from '@mui/material';
import { DRAWER_WIDTH } from '@/lib/statics/config';

interface Props {
  selectedTab: number;
  setSelectedTab: (index: number) => void;
}
const Sidebar: FC<Props> = ({ selectedTab, setSelectedTab }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  const open = useAppSelector((state) => state.ui.sidebarOpen);
  const { t, ready } = useTranslation('sidebar');
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };
  if (!ready) return null;
  return (
    <Drawer
      variant={matches ? 'temporary' : 'persistent'}
      anchor="left"
      open={open}
      sx={{ '& .MuiDrawer-paper': { width: DRAWER_WIDTH } }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={selectedTab}
        onChange={handleChange}
        aria-label="dashboard tabs"
        sx={{ borderRight: 1, borderColor: 'divider', mt: 10 }}
      >
        {TABS_ITEMS.map((item, index) => (
          <Tab
            key={index}
            label={t(item.label, { defaultValue: item.default })}
            {...a11yProps(index)}
          />
        ))}
      </Tabs>
    </Drawer>
  );
};

export default Sidebar;
