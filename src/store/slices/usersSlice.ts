import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index';
import { User } from '@/types/user';
import { COUNTRIES } from '@/lib/statics/country_code';
// Async thunk to fetch users
export const fetchUsers = createAsyncThunk('users/fetchUsers', async (count: number = 100) => {
  const res = await fetch(`https://randomuser.me/api/?results=${count}`);
  const data = await res.json();
  return data.results; // only results array
});

interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export const selectAllUsers = (state: RootState) => state.users.users;
export const selectUsersLoading = (state: RootState) => state.users.loading;
export const selectUsersError = (state: RootState) => state.users.error;

export const selectFilteredUsers = (query: string) => (state: RootState) => {
  const users = state.users.users;
  if (!query) return users;

  return users.filter(
    (u) =>
      u.name.first.toLowerCase().includes(query.toLowerCase()) ||
      u.name.last.toLowerCase().includes(query.toLowerCase()) ||
      u.email.toLowerCase().includes(query.toLowerCase())
  );
};

export const selectUsersByCountry = (country?: string) => (state: RootState) => {
  const users = state.users.users;
  if (!country) return users;

  return users.filter((u) => u.location.country.toLowerCase() === country.toLowerCase());
};

export const handleDataChange =
  (query: string, country: string, page: number, pageSize: number) => (state: RootState) => {
    const users = state.users.users;

    const filtered = users.filter((user) => {
      const fullName = `${user.name.first} ${user.name.last}`.toLowerCase();
      const email = user.email.toLowerCase();
      const matchesSearch =
        !query || fullName.includes(query.toLowerCase()) || email.includes(query.toLowerCase());

      const matchesCountry = !country || user.nat.toLowerCase() === country.toLowerCase();
      return matchesSearch && matchesCountry;
    });

    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    return filtered.slice(start, end);
  };

export const selectUsersCountBySearchAndCountry =
  (query: string, country: string) => (state: RootState) => {
    const users = state.users.users;

    return users.filter((user) => {
      const fullName = `${user.name.first} ${user.name.last}`.toLowerCase();
      const email = user.email.toLowerCase();
      const matchesSearch =
        !query || fullName.includes(query.toLowerCase()) || email.includes(query.toLowerCase());

      const matchesCountry = !country || user.nat.toLowerCase() === country.toLowerCase();
      return matchesSearch && matchesCountry;
    }).length;
  };

export const selectUsersCountByCountry = (state: RootState) => {
  const counts: Record<string, number> = {};

  state.users.users.forEach((user) => {
    const code = user.nat;
    counts[code] = (counts[code] || 0) + 1;
  });

  return Object.entries(counts).map(([code, count]) => ({
    id: code,
    label: `${COUNTRIES[code]?.emoji || ''} ${COUNTRIES[code]?.name || code}`,
    value: count,
  }));
};

export default usersSlice.reducer;
