import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index';
import { User } from '@/types/user';
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
export default usersSlice.reducer;
