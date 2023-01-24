import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Student from '../../app/models/Student';
import { RootState } from '../../app/store';
import { getStudents, addStudent, getStudentsGrade, addGrade, getSpecificStudentGrade, archiveStudent } from './studentAPI';

export interface StudentState {
  students: Student[]
  specificStudent: Student[]
  update: boolean
  archived: boolean

};

const initialState: StudentState = {
  students: [],
  specificStudent: [],
  update: false,
  archived: false

};

export const archiveStudentAsync = createAsyncThunk(
  'Student/archiveStudent',
  async (semail: string) => {
    const response = await archiveStudent(semail);
    return response;
  }
);

export const getStudentsAsync = createAsyncThunk(
  'Student/getStudents',
  async () => {

    const response = await getStudents();

    return response;
  }
);

export const getStudentsGradeAsync = createAsyncThunk(
  'Student/getStudentsGrade',
  async () => {

    const response = await getStudentsGrade();

    return response;
  }
);

export const getSpecificStudentGradeAsync = createAsyncThunk(
  'Student/getSpecificStudentGrade',
  async (semail: string) => {
    console.log(semail)
    const response = await getSpecificStudentGrade(semail);

    return response;
  }
);
export const addStudentAsync = createAsyncThunk(
  'Student/addStudent',
  async (stud: Student) => {

    const response = await addStudent(stud);

    return response;
  }
);



export const addGradeAsync = createAsyncThunk(
  'Student/addGrade',
  async (stud: Student) => {
    console.log(stud)
    const response = await addGrade(stud);

    return response;
  }
);



export const StudentSlice = createSlice({
  name: 'Student',
  initialState,
  reducers: {

  },

  extraReducers: (builder) => {
    builder

      .addCase(getStudentsAsync.fulfilled, (state, action) => {
        state.students = action.payload.data
      }).addCase(addStudentAsync.fulfilled, (state, action) => {
        console.log(action.payload.data)
        state.students.push(action.payload.data)
      }).addCase(getStudentsGradeAsync.fulfilled, (state, action) => {
        state.students = action.payload.data
      }).addCase(getSpecificStudentGradeAsync.fulfilled, (state, action) => {
        console.log(action.payload.data)
        state.specificStudent = action.payload.data
      })
      .addCase(addGradeAsync.fulfilled, (state, action) => {
        console.log(action.payload)
        state.update = !state.update

      })
      // archive addCase doesn't work
      .addCase(archiveStudentAsync.fulfilled, (state, action) => {
        console.log(action.payload.data)
        const { semail } = action.payload;
        state.students = state.students.map(student => student.semail !== semail ? student : {...student, archived: true});
      })

  },


});

export const selectStudents = (state: RootState) => state.Student.students;
export const selectSpecificStudents = (state: RootState) => state.Student.specificStudent;
export const selectUpdate = (state: RootState) => state.Student.update;
export default StudentSlice.reducer;
