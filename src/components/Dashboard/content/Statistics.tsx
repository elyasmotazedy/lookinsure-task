import { useAppSelector } from '@/store/hooks';
import { selectUsersCountByCountry } from '@/store/slices/usersSlice';
import { BarChart } from '@mui/x-charts/BarChart';
import { Card, CardContent, Typography } from '@mui/material';
const Statistics = () => {
  const data = useAppSelector(selectUsersCountByCountry);

  if (!data.length) return null;
  return (
    <Card sx={{ mt: 4 }}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Users by Country
        </Typography>
        <BarChart
          dataset={data}
          yAxis={[{ scaleType: 'band', dataKey: 'label' }]}
          series={[{ dataKey: 'value', label: 'Users' }]}
          layout="horizontal"
          height={400}
        />
      </CardContent>
    </Card>
  );
};

export default Statistics;
