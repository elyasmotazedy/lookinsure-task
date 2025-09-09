import { AppDispatch } from '@/store';
import { useDispatch } from 'react-redux';
import { fetchUsers, selectFilteredUsers, selectUsersLoading } from '@/store/slices/usersSlice';
import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { COUNTRY_CODE } from '@/lib/statics/country_code';
import { Avatar, CircularProgress, TextField } from '@mui/material';

import styles from '@/styles/dashboard/users.module.scss';
import { useTranslation } from 'react-i18next';
import { User } from '@/types/user';
import DetailsModal from './DetailsModal';
import { useAppSelector } from '@/store/hooks';

const Users = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [search, setSearch] = useState('');
  const users = useAppSelector(selectFilteredUsers(search));
  const loading = useAppSelector(selectUsersLoading);

  const [userDetails, setUserDetails] = useState<User | null>(null);
  const [open, setOpen] = useState(false);

  const { t } = useTranslation('common');
  useEffect(() => {
    dispatch(fetchUsers(100));
  }, [dispatch]);

  const handleOpenModal = (user: User) => {
    setUserDetails(user);
    setOpen(true);
  };

  return (
    <Box>
      <TextField
        id="search-users"
        label={t('search', { defaultValue: 'Search' })}
        variant="outlined"
        onChange={(e) => setSearch(e.target.value)}
        fullWidth
        value={search}
        sx={{ mb: 2 }}
      />
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={2}>
          {users.map((user) => (
            <Grid
              key={user.login.uuid}
              size={{ xs: 10, sm: 4, md: 4, lg: 3, xl: 3 }}
              sx={{ mx: 'auto' }}
            >
              <Card className={styles.userCard}>
                <CardMedia
                  className={styles.cardMedia}
                  image={user.picture.large}
                  title="green iguana"
                />
                <CardContent sx={{ position: 'relative' }}>
                  <Box className={styles.avatar}>
                    <Avatar alt={user.name.first + user.name.last} src={user.picture.medium} />
                  </Box>
                  <Typography variant="body2" component="div" sx={{ mt: 2, textWrap: 'nowrap' }}>
                    {user.name.first} {user.name.last}{' '}
                    <Typography component="span" variant="subtitle2">
                      ({user.nat} {COUNTRY_CODE[user.nat].emoji})
                    </Typography>
                  </Typography>
                  <Typography variant="body2" fontSize={10} sx={{ color: 'text.secondary' }}>
                    {user.email}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={() => handleOpenModal(user)}>
                    {t('show_more', { defaultValue: 'Show More Details' })}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
          <DetailsModal userDetails={userDetails} setOpen={setOpen} open={open} />
        </Grid>
      )}
    </Box>
  );
};

export default Users;
