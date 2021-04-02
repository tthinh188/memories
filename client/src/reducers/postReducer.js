import { createSlice } from '@reduxjs/toolkit';

export const post = createSlice({
  name: 'post',
  initialState: {
    // title: '',
    // message: '',
    // tags: '',
    // selectedFile: ''
    post: null,
  },
  reducers: {
    selectPost: (state, action) => {
    //   state.title = action.payload.title;
    //   state.message = action.payload.message;
    //   state.tags = action.payload.tags;
    //   state.selectedFile = action.payload.selectedFile;
        state.post = action.payload;
    },
  },
});

export const { selectPost } = post.actions; // use for dispatch

export const selectOpenPost = state => state.post.post; // use for selector

export default post.reducer;
