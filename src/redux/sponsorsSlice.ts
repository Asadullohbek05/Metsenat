import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import request from "../server/request";
import { Sponsor } from "../types/sponsors";

export const fetchSponsors = createAsyncThunk(
  "sponsors/fetchSponsors",
  async (
    { page, pageSize }: { page: number; pageSize: number },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await request.get<Sponsor>("/sponsor-list/", {
        params: { page_size: pageSize, page },
      });
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue("Failed to fetch sponsors");
    }
  }
);

interface SponsorState {
  sponsors: Sponsor | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: SponsorState = {
  sponsors: null,
  status: "idle",
  error: null,
};

const sponsorSlice = createSlice({
  name: "sponsors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSponsors.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSponsors.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.sponsors = action.payload;
      })
      .addCase(fetchSponsors.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export default sponsorSlice.reducer;
