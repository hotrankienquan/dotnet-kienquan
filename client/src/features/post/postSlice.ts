import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import agent from "../../app/api/agent";
import { RootState } from "../../app/store/configureStore";
import { Post, PostParams } from "../../app/models/Post";
import { MetaData } from "../../app/models/pagination";

interface PostState {
    postsLoaded: boolean;
    status: string;
    postParams: PostParams;
    metaData: MetaData | null;
}
const postsAdapter = createEntityAdapter<Post>();
function getAxiosParams(postParams: PostParams) {
    const params = new URLSearchParams();
    params.append('pageNumber', postParams.pageNumber.toString());
    params.append('pageSize', postParams.pageSize.toString());
    params.append('orderBy', postParams.orderBy);
    if (postParams.searchTerm) params.append('searchTerm', postParams.searchTerm);
    
    return params;
}
// fetch dulieu vao trong kho redux
export const fetchPostsAsync = createAsyncThunk<Post[], void, {state: RootState}>(
    'posts/fetchPostsAsync',
    async (_, thunkAPI) => {
        const params = getAxiosParams(thunkAPI.getState().post.postParams)
        try {
            // return await agent.Post.list();
            var response = await agent.Post.list(params);
            thunkAPI.dispatch(setMetaData(response.metaData))
            return response.items;
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
function initParams(): PostParams {
    return {
        pageNumber: 1,
        pageSize: 6,
        orderBy: 'id'
        
    }
}
export const postSlice = createSlice({
    name: 'post',
    initialState: postsAdapter.getInitialState<PostState>({
        postsLoaded: false,
        status: 'idle',
        postParams: initParams(),
        metaData: null
    }),
    reducers: {
        setPostParams: (state, action) => {
            state.postsLoaded = false;
            state.postParams = {...state.postParams, ...action.payload, pageNumber: 1}
        },
        setPageNumber: (state, action) => {
            state.postsLoaded = false;
            state.postParams = {...state.postParams, ...action.payload}
        },
        setMetaData: (state, action) => {
            state.metaData = action.payload
        },
        resetPostParams: (state) => {
            state.postParams = initParams()
        }
    },
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

export const {setPostParams, resetPostParams, setMetaData, setPageNumber} = postSlice.actions;