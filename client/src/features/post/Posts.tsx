import React, { useEffect, useState } from 'react'
import { Post } from '../../app/models/Post'
import { Grid } from '@mui/material';
import PostCard from './PostCard';
import agent from '../../app/api/agent';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { fetchPostsAsync, postsSelector } from './postSlice';

const Posts = () => {
  const posts = useAppSelector(postsSelector.selectAll);
  const dispatch = useAppDispatch();  
  const {postsLoaded,status} = useAppSelector(state=>state.post)
  useEffect(() => {
    if (!postsLoaded) {
      dispatch(fetchPostsAsync())
    }
  }, [postsLoaded,dispatch])
  if (status.includes('pending')) return <LoadingComponent message='loading posts...'/>
  return (
      <Grid container spacing={4}>
        {posts.map(post => (
            <Grid item xs={3} key={post.id}>
                <PostCard post={post} />
            </Grid>
        ))}
    </Grid>
  )
}

export default Posts