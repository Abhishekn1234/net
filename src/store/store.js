// store.js
import { configureStore, createSlice } from '@reduxjs/toolkit';

// Define a slice for managing users
const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    addUser: (state, action) => {
      state.push(action.payload);
    },
    updateUser: (state, action) => {
      const { id, updatedUser } = action.payload;
      const userIndex = state.findIndex(user => user.id === id);
      if (userIndex !== -1) {
        state[userIndex] = updatedUser;
      }
    },
    deleteUser: (state, action) => {
      return state.filter(user => user.id !== action.payload);
    },
  },
});

// Create a Redux store with the users slice
const store = configureStore({
  reducer: {
    users: usersSlice.reducer,
  },
});

// Export the actions for easier usage in components
export const { addUser, updateUser, deleteUser } = usersSlice.actions;

export default store;
