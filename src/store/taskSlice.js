import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  taskList: [],
  filter: 'All',
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.taskList.push(action.payload);
    },
    toggleCompletion: (state, action) => {
      const task = state.taskList[action.payload];
      if (task) {
        task.completed = !task.completed;
      }
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { addTask, toggleCompletion, setFilter } = taskSlice.actions;
export default taskSlice.reducer;
