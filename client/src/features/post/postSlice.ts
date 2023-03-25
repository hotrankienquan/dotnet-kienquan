import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import agent from "../../app/api/agent";
import { RootState } from "../../app/store/configureStore";
import { Post } from "../../app/models/Post";

const postsAdapter = createEntityAdapter<Post>();

// fetch dulieu vao trong kho redux
export const fetchPostsAsync = createAsyncThunk<Post[]>(
    'posts/fetchPostsAsync',
    async (_, thunkAPI) => {
        try {
            return await agent.Post.list();
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
)

export const fetchPostAsync = createAsyncThunk<Post, number>(
    'post/fetchPostAsync',
    async (postId, thunkAPI) => {
        try {
            const post = await agent.Post.details(postId);
            return post;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
)

export const postSlice = createSlice({
    name: 'post',
    initialState: postsAdapter.getInitialState({
        postsLoaded: false,
        status: 'idle'
    }),
    reducers: {},
    extraReducers: (builder => {
        builder.addCase(fetchPostsAsync.pending, (state, action) => {
            state.status = 'pendingfetchproducts'
        });
        builder.addCase(fetchPostsAsync.fulfilled, (state, action) => {
            postsAdapter.setAll(state, action.payload);
            state.status = 'idle';
            state.postsLoaded = true;
        });
        builder.addCase(fetchPostsAsync.rejected, (state, action) => {
            console.log(action.payload);
            state.status = 'idle';
        });
        builder.addCase(fetchPostAsync.pending, (state) => {
            state.status = 'pendingfetchproduct (single)';
        });
        builder.addCase(fetchPostAsync.fulfilled, (state, action) => {
            postsAdapter.upsertOne(state, action.payload);
            state.status = 'idle';
        });
        builder.addCase(fetchPostAsync.rejected, (state, action) => {
            console.log(action);
            state.status = 'idle';
        });
    })
})

export const postsSelector = postsAdapter.getSelectors((state: RootState) => state.post);