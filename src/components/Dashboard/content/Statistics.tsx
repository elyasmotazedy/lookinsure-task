import { useAppSelector } from '@/store/hooks';
import { selectUsersCountByCountry } from '@/store/slices/usersSlice';
import { BarChart } from '@mui/x-charts/BarChart';
import { Card, CardContent, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
const Statistics = () => {
  const data = useAppSelector(selectUsersCountByCountry);
  const { t } = useTranslation('common');
  if (!data.length) return null;
  return (
    <Card sx={{ mt: 4 }}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2 }}>
          {t('users_by_country', { defaultValue: 'Users by Country' })}
        </Typography>
        <BarChart
          dataset={data}
          xAxis={[{ dataKey: 'x', scaleType: 'band' }]}
          yAxis={[{ dataKey: 'y', scaleType: 'linear' }]}
          series={[{ dataKey: 'y', label: 'Users' }]}
          layout="vertical"
          height={400}
        />
      </CardContent>
    </Card>
  );
};

export default Statistics;
