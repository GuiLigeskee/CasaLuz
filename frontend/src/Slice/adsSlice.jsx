import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import adsService from "../Service/adsService";

const initialState = {
  ads: [],
  add: {},
  error: false,
  success: false,
  loading: false,
  message: null,
  page: 1,
  hasMore: true,
};

// Publish an user's ads
export const publishAds = createAsyncThunk(
  "ads/publish",
  async (ads, thunkAPI) => {
    const token = thunkAPI.getState().auth.admin.token;

    const data = await adsService.publishAds(ads, token);

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
    const id = formData.get("id");

    const data = await adsService.updateAds(formData, id, token);

    // Check for errors
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);

export const deleteAdd = createAsyncThunk(
  "photo/delete",
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.admin.token;

    const data = await adsService.deleteAdd(id, token);

    console.log(data.errors);
    // Check for errors
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);

export const getAdsFilters = createAsyncThunk(
  "ads/getAds",
  async ({ filters, page, limit }, thunkAPI) => {
    try {
      const params = { ...filters, page, limit };
      const data = await adsService.searchAds(params);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const adsSlice = createSlice({
  name: "ads",
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = null;
    },
    fetchAdsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchAdsSuccess(state, action) {
      state.loading = false;
      state.ads = action.payload;
    },
    fetchAdsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    resetAds: (state) => {
      state.ads = [];
      state.page = 1;
      state.hasMore = true;
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
        state.ads.map((add) => {
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
        state.add = null;
      })
      .addCase(deleteAdd.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAdd.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;

        state.ads = state.ads.filter((add) => {
          return add._id !== action.payload.id;
        });

        state.message = action.payload.message;
      })
      .addCase(deleteAdd.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.add = null;
      })
      .addCase(getAdsFilters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAdsFilters.fulfilled, (state, action) => {
        state.loading = false;
        state.ads =
          action.meta.arg.page === 1
            ? action.payload
            : [...state.ads, ...action.payload];
        state.hasMore = action.payload.length === action.meta.arg.limit;
      })
      .addCase(getAdsFilters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  resetMessage,
  fetchAdsStart,
  fetchAdsSuccess,
  fetchAdsFailure,
  setPage,
  resetAds,
} = adsSlice.actions;
export default adsSlice.reducer;
