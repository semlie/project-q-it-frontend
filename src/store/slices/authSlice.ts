import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getSession, removeSession, setSession } from '../../auth/auth.utils';
import { loginByToken, login } from '../../services/auth.service';
import { UserType } from '../../types/userType';

interface AuthState {
  user: UserType | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: getSession(),
  isLoading: true,
  isAuthenticated: false,
  error: null,
};

export const checkAuth = createAsyncThunk(
  'auth/checkAuth',
  async (_, { rejectWithValue }) => {
    try {
      const token = getSession();
      if (!token) {
        return rejectWithValue('No token found');
      }
      const user = await loginByToken(token);
      return { user, token };
    } catch (error) {
      removeSession();
      return rejectWithValue('Invalid token');
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: { userEmail: string; userPassword: string }, { rejectWithValue }) => {
    try {
      const response = await login(credentials);
      setSession(response);
      const user = await loginByToken(response);
      return { user, token: response };
    } catch (error) {
      return rejectWithValue('Login failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      removeSession();
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    updateUser: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, updateUser, clearError } = authSlice.actions;
export default authSlice.reducer;
