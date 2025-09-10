import { Box, Card, CardActions, CardContent, Grid, Skeleton } from '@mui/material';
import styles from '@/styles/dashboard/users.module.scss';

const UserLoading = () => {
  return (
    <Grid container spacing={2}>
      {[...Array(4).keys()].map((item) => (
        <Grid key={item} size={{ xs: 10, sm: 4, md: 4, lg: 3, xl: 3 }} sx={{ mx: 'auto' }}>
          <Card className={styles.userCard}>
            <Skeleton variant="rectangular" height={130} />
            <CardContent sx={{ position: 'relative', py: 1 }}>
              <Box className={styles.avatar}>
                <Skeleton variant="circular" width={80} height={80} />
              </Box>
            </CardContent>
            <CardContent>
              <Box display="flex" alignItems="center">
                <Skeleton variant="text" width="80%" />
              </Box>
              <Skeleton variant="text" width="60%" />
            </CardContent>
            <CardActions>
              <Skeleton variant="rectangular" width={150} height={30} />
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default UserLoading;
