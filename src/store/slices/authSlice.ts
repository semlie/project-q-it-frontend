/**
 * Slice לניהול אימות ב-Redux
 * מכיל את המצב והפעולות לאימות משתמשים
 */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getSession, removeSession, setSession } from '../../auth/auth.utils';
import { loginByToken, login } from '../../services/auth.service';
import { UserType } from '../../types/userType';

/**
 * ממשק מצב האימות
 */
interface AuthState {
  user: UserType | null;           // פרטי המשתמש
  token: string | null;            // טוקן ה-JWT
  isLoading: boolean;               // האם יש טעינה
  isAuthenticated: boolean;        // האם המשתמש מאומת
  error: string | null;            // הודעת שגיאה
}

/**
 * מצב התחלתי - בודק אם יש טוקן שמור
 */
const initialState: AuthState = {
  user: null,
  token: getSession(),
  isLoading: true,
  isAuthenticated: false,
  error: null,
};

/**
 * בדיקת אימות - מאמת את הטוקן הקיים ב-localStorage
 */
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

/**
 * התחברות - שולח פרטי התחברות ושומר את הטוקן
 */
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

/**
 * Slice לאימות עם reducers ו-extraReducers
 */
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    /**
     * התנתקות - מסיר את הטוקן ומאפס את המצב
     */
    logout: (state) => {
      removeSession();
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    /**
     * עדכון פרטי משתמש במצב
     */
    updateUser: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload;
    },
    /**
     * ניקוי שגיאה
     */
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // בדיקת אימות בהמתנה
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      // בדיקת אימות הצליחה
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      // בדיקת אימות נכשלה
      .addCase(checkAuth.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
      })
      // התחברות בהמתנה
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      // התחברות הצליחה
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      // התחברות נכשלה
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, updateUser, clearError } = authSlice.actions;
export default authSlice.reducer;
