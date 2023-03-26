import React, { useEffect, useState } from 'react'
import { Post } from '../../app/models/Post'
import { Grid, Paper } from '@mui/material';
import PostCard from './PostCard';
import agent from '../../app/api/agent';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { fetchPostsAsync, postsSelector, setPageNumber, setPostParams } from './postSlice';
import Search from './PostSearch';
import RadioButtonGroup from '../../components/RadioButtonGroup';
import AppPagination from '../../components/AppPagination';
const sortOptions = [
  { value: 'id', label: 'id' },
]
const Posts = () => {
  const posts = useAppSelector(postsSelector.selectAll);
  console.log(posts)
  const dispatch = useAppDispatch();  

  const { postsLoaded, status ,postParams, metaData} = useAppSelector(state => state.post);


  useEffect(() => {
    if (!postsLoaded) {
      dispatch(fetchPostsAsync())
    }
  }, [postsLoaded, dispatch])
  if (status.includes('pending')) return <LoadingComponent message='loading posts...'/>
  return (
    //   <Grid container spacing={4}>
    //     {posts.map(post => (
    //         <Grid item xs={3} key={post.id}>
    //             <PostCard post={post} />
    //         </Grid>
    //     ))}
    // </Grid>
    <Grid container columnSpacing={4}>
            <Grid item xs={3} className='grid-search' >
                <Paper sx={{ mb: 2 }}>
                    <Search />
                </Paper>
            </Grid>
            <Grid container spacing={4}>
                      {posts.map(post => (
                  <Grid item xs={3} key={post.id}>
                    <PostCard post={post} />
                  </Grid>
              ))}
            </Grid>
            <Grid item xs={3} />
            <Grid item xs={9} sx={{mb: 2}}>
                {metaData &&
                <AppPagination 
                    metaData={metaData} 
                    onPageChange={(page: number) => dispatch(setPageNumber({pageNumber: page}))} 
                />}
            </Grid>
        </Grid>
  )
}

export default Posts