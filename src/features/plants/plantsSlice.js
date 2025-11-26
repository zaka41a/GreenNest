import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { plantsAPI } from '../../services/api';

const initialState = {
  plants: [],
  plant: null,
  categories: [],
  isLoading: false,
  isError: false,
  message: '',
};

// Get all plants
export const getPlants = createAsyncThunk('plants/getAll', async (params, thunkAPI) => {
  try {
    const response = await plantsAPI.getAll(params);
    return response.data.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    return thunkAPI.rejectWithValue(message);
  }
});

// Get single plant
export const getPlant = createAsyncThunk('plants/getOne', async (id, thunkAPI) => {
  try {
    const response = await plantsAPI.getOne(id);
    return response.data.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    return thunkAPI.rejectWithValue(message);
  }
});

// Create plant (admin)
export const createPlant = createAsyncThunk('plants/create', async (plantData, thunkAPI) => {
  try {
    const response = await plantsAPI.create(plantData);
    return response.data.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    return thunkAPI.rejectWithValue(message);
  }
});

// Update plant (admin)
export const updatePlant = createAsyncThunk('plants/update', async ({ id, data }, thunkAPI) => {
  try {
    const response = await plantsAPI.update(id, data);
    return response.data.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    return thunkAPI.rejectWithValue(message);
  }
});

// Delete plant (admin)
export const deletePlant = createAsyncThunk('plants/delete', async (id, thunkAPI) => {
  try {
    await plantsAPI.delete(id);
    return id;
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    return thunkAPI.rejectWithValue(message);
  }
});

// Get categories
export const getCategories = createAsyncThunk('plants/getCategories', async (_, thunkAPI) => {
  try {
    const response = await plantsAPI.getCategories();
    return response.data.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    return thunkAPI.rejectWithValue(message);
  }
});

const plantsSlice = createSlice({
  name: 'plants',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPlants.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPlants.fulfilled, (state, action) => {
        state.isLoading = false;
        state.plants = action.payload;
      })
      .addCase(getPlants.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getPlant.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPlant.fulfilled, (state, action) => {
        state.isLoading = false;
        state.plant = action.payload;
      })
      .addCase(getPlant.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createPlant.fulfilled, (state, action) => {
        state.plants.push(action.payload);
      })
      .addCase(updatePlant.fulfilled, (state, action) => {
        state.plants = state.plants.map((p) =>
          p.id === action.payload.id ? action.payload : p
        );
      })
      .addCase(deletePlant.fulfilled, (state, action) => {
        state.plants = state.plants.filter((p) => p.id !== action.payload);
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      });
  },
});

export const { reset } = plantsSlice.actions;
export default plantsSlice.reducer;
