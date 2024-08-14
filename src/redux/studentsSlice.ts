import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import request from "../server/request";
import { SponsorsResponse } from "../types";

export const fetchStudents = createAsyncThunk(
  "students/fetchStudents",
  async (
    { page, pageSize }: { page: number; pageSize: number },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await request.get<SponsorsResponse>("/student-list/", {
        params: { page_size: pageSize, page },
      });
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue("Failed to fetch students");
    }
  }
);

interface StudentState {
  students: SponsorsResponse | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: StudentState = {
  students: null,
  status: "idle",
  error: null,
};

const studentsSlice = createSlice({
  name: "students",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.students = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export default studentsSlice.reducer;
