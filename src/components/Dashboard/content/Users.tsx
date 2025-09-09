import { AppDispatch } from '@/store';
import { useDispatch } from 'react-redux';
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
import {
  Avatar,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Stack,
  TextField,
} from '@mui/material';

import styles from '@/styles/dashboard/users.module.scss';
import { useTranslation } from 'react-i18next';
import { User } from '@/types/user';
import DetailsModal from './DetailsModal';
import { useAppSelector } from '@/store/hooks';

const Users = () => {
  const { t } = useTranslation('common');

  const dispatch = useDispatch<AppDispatch>();
  const [search, setSearch] = useState('');
  const [country, setCountry] = useState('all');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [userDetails, setUserDetails] = useState<User | null>(null);
  const [open, setOpen] = useState(false);

  const users = useAppSelector(handleDataChange(search, country, page, pageSize));
  const totalUsers = useAppSelector(selectUsersCountBySearchAndCountry(search, country));

  const loading = useAppSelector(selectUsersLoading);
  const totalPages = Math.ceil(totalUsers / pageSize);

  useEffect(() => {
    dispatch(fetchUsers(100));
  }, [dispatch]);

  const handleOpenModal = (user: User) => {
    setUserDetails(user);
    setOpen(true);
  };

  return (
    <Box>
      <Stack flexWrap="nowrap" gap={2} direction="row">
        <TextField
          id="search-users"
          label={t('search', { defaultValue: 'Search' })}
          variant="outlined"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          sx={{ mb: 2 }}
        />
        <FormControl>
          <InputLabel id="select-country-label">
            {t('country', { defaultValue: 'country' })}
          </InputLabel>
          <Select
            labelId="select-country-label"
            id="select-country"
            value={country}
            label={t('country', { defaultValue: 'country' })}
            onChange={(event) => {
              setCountry(event.target.value);
              setPage(1);
            }}
            sx={{ minWidth: 200 }}
          >
            <MenuItem value="all">All</MenuItem>
            {Object.values(COUNTRIES).map((country) => (
              <MenuItem key={country.code} value={country.code}>
                {country.name} {country.emoji}
              </MenuItem>
            ))}
          </Select>
        </FormControl>{' '}
        <FormControl>
          <InputLabel id="per-page-label">{t('per_page', { defaultValue: 'Per page' })}</InputLabel>
          <Select
            labelId="per-page-label"
            id="per-page  "
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPage(1);
            }}
            label={t('per_page', { defaultValue: 'Per page' })}
            sx={{ minWidth: 100 }}
          >
            {[5, 10, 20, 50].map((size) => (
              <MenuItem key={size} value={size}>
                {size}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
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
      <Pagination
        count={totalPages}
        page={page}
        onChange={(_, value) => setPage(value)}
        color="primary"
      className={styles.pagination}
      />
    </Box>
  );
};

export default Users;
