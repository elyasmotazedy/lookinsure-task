import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { PER_PAGE } from '@/lib/statics/tabs';
import { FC } from 'react';
import { COUNTRIES } from '@/lib/statics/country_code';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  setSearch,
  setCountry,
  setPageSize,
  selectFilters,
  setPage,
} from '@/store/slices/filtersSlice';
interface Props {
  loading: boolean;
}
const Filters: FC<Props> = ({ loading }) => {
  const { t } = useTranslation('common');
  const { search, country, pageSize } = useAppSelector(selectFilters);
  const dispatch = useAppDispatch();
  const theme = useTheme();

  const matches = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Stack
      flexWrap={matches ? 'wrap' : 'nowrap'}
      gap={matches ? 1 : 2}
      direction="row"
      sx={{ mb: 2 }}
    >
      <TextField
        id="search-users"
        label={t('search', { defaultValue: 'Search' })}
        variant="outlined"
        onChange={(e) => dispatch(setSearch(e.target.value))}
        value={search}
        disabled={loading}
        size="small"
      />
      <FormControl>
        <InputLabel id="select-country-label">
          {t('country', { defaultValue: 'Country' })}
        </InputLabel>
        <Select
          labelId="select-country-label"
          id="select-country"
          value={country}
          label={t('country', { defaultValue: 'Country' })}
          onChange={(event) => {
            dispatch(setCountry(event.target.value));
            dispatch(setPage(1));
          }}
          sx={{ minWidth: 200 }}
          disabled={loading}
          size="small"
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
          id="per-page"
          value={pageSize}
          onChange={(e) => {
            dispatch(setPageSize(Number(e.target.value)));
            dispatch(setPage(1));
          }}
          label={t('per_page', { defaultValue: 'Per page' })}
          sx={{ minWidth: 100 }}
          disabled={loading}
          size="small"
        >
          {PER_PAGE.map((size) => (
            <MenuItem key={size} value={size}>
              {size}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  );
};

export default Filters;
