import {
  fetchUsers,
  handleDataChange,
  selectUsersCountBySearchAndCountry,
  selectUsersLoading,
} from '@/store/slices/usersSlice';
import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { COUNTRIES } from '@/lib/statics/country_code';
import { Avatar, Container, Pagination } from '@mui/material';

import styles from '@/styles/dashboard/users.module.scss';
import { useTranslation } from 'react-i18next';
import { User } from '@/types/user';
import DetailsModal from '../DetailsModal';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import UserLoading from './UserLoading';
import Filters from './Filters';
import { selectFilters, setPage } from '@/store/slices/filtersSlice';

const Users = () => {
  const { t } = useTranslation('common');
  const dispatch = useAppDispatch();
  const { search, country, page, pageSize } = useAppSelector(selectFilters);
  const users = useAppSelector(handleDataChange(search, country, page, pageSize));
  const totalUsers = useAppSelector(selectUsersCountBySearchAndCountry(search, country));
  const loading = useAppSelector(selectUsersLoading);

  const totalPages = Math.ceil(totalUsers / pageSize);

  const [userDetails, setUserDetails] = useState<User | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchUsers(100));
  }, [dispatch]);

  const handleOpenModal = (user: User) => {
    setUserDetails(user);
    setOpen(true);
  };
  return (
    <Container>
      <Filters loading={loading} />
      {loading ? (
        <UserLoading />
      ) : (
        <Grid container spacing={2}>
          {users.map((user) => (
            <Grid key={user.login.uuid} size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 3 }}>
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
                    <Typography component="span" variant="overline" fontSize={10}>
                      ({COUNTRIES[user.nat].name} {COUNTRIES[user.nat].emoji})
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
      {!loading && (
        <Pagination
          count={totalPages}
          page={page}
          onChange={(_, value) => dispatch(setPage(value))}
          color="primary"
          className={styles.pagination}
        />
      )}
    </Container>
  );
};

export default Users;
