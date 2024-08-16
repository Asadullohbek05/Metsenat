import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import request from "../server/request";
import { SponsorDetails } from "../types/sponsor";

export const fetchSponsorData = createAsyncThunk(
  "sponsorDetail/fetchSponsorData",
  async (id: number, { rejectWithValue }) => {
    try {
      const { data } = await request.get<SponsorDetails>(
        `/sponsor-detail/${id}`
      );
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue("Failed to fetch sponsor details");
    }
  }
);

export const updateSponsorData = createAsyncThunk(
  "sponsorDetail/updateSponsorData",
  async (
    {
      id,
      updatedSponsor,
    }: { id: number; updatedSponsor: Partial<SponsorDetails> },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await request.put<SponsorDetails>(
        `/sponsor-update/${id}/`,
        updatedSponsor
      );
      return data;
    } catch (error) {
      console.error("Error updating sponsor:", error);
      return rejectWithValue("Failed to update sponsor details");
    }
  }
);

interface SponsorDetailsState {
  sponsorDetails: SponsorDetails | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: SponsorDetailsState = {
  sponsorDetails: null,
  status: "idle",
  error: null,
};

const singleSponsorSlice = createSlice({
  name: "sponsorDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSponsorData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSponsorData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.sponsorDetails = action.payload;
      })
      .addCase(fetchSponsorData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(updateSponsorData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateSponsorData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.sponsorDetails = action.payload;
      })
      .addCase(updateSponsorData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export default singleSponsorSlice.reducer;
