import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import adsService from "../Service/adsService";

const initialState = {
  ads: [],
  add: {},
  error: false,
  success: false,
  loading: false,
  message: null,
};

// Publish an user's ads
export const publishAds = createAsyncThunk(
  "ads/publish",
  async (ads, thunkAPI) => {
    const token = thunkAPI.getState().auth.admin.token;

    const data = await adsService.publishAds(ads, token);

    console.log(data.errors);
    // Check for errors
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);

// Get all photos
export const getAds = createAsyncThunk("ads/getall", async () => {
  const data = await adsService.getAds();

  return data;
});

// Get ads details
export const getAdsDetails = createAsyncThunk("ads/get", async (id) => {
  const data = await adsService.getAdsDetails(id);
  return data;
});

export const updateAds = createAsyncThunk(
  "ads/update",
  async (formData, thunkAPI) => {
    const token = thunkAPI.getState().auth.admin.token;
    const id = formData.get("id"); // Extrair o id do formData

    const data = await adsService.updateAds(formData, id, token);

    // Check for errors
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);

export const photoSlice = createSlice({
  name: "publish",
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(publishAds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(publishAds.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.add = action.payload;
        state.ads.unshift(state.ads);
        state.message = "Anúncio publicado com sucesso!";
      })
      .addCase(publishAds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.photo = null;
      })
      .addCase(getAds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAds.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.ads = action.payload;
      })
      .addCase(getAdsDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAdsDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.add = action.payload;
      })
      .addCase(updateAds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAds.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.images.map((add) => {
          if (add._id === action.payload.add._id) {
            return (add.title = action.payload.add.title);
          }
          return add;
        });

        state.message = action.payload.message;
      })
      .addCase(updateAds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.photo = null;
      });
  },
});

export const { resetMessage } = photoSlice.actions;
export default photoSlice.reducer;
