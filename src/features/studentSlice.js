import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  { id: '1', name: 'Ragani Kumari', email: 'rk1234@example.com', course: 'Computer Science' },
  { id: '2', name: 'Kashish kumari', email: 'kashish1234@example.com', course: 'AI & ML' },
];

const studentSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    addStudent: (state, action) => {
      state.push({
        id: Date.now().toString(),
        ...action.payload,
      });
    },
    updateStudent: (state, action) => {
      const { id, name, email, course } = action.payload;
      const existingStudent = state.find((s) => s.id === id);
      if (existingStudent) {
        existingStudent.name = name;
        existingStudent.email = email;
        existingStudent.course = course;
      }
    },
    deleteStudent: (state, action) => {
      return state.filter((s) => s.id !== action.payload);
    },
  },
});

export const { addStudent, updateStudent, deleteStudent } = studentSlice.actions;
export default studentSlice.reducer;