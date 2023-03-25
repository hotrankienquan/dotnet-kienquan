import React, { useEffect, useState } from 'react'
import { Post } from '../../app/models/Post'
import { Grid } from '@mui/material';
import PostCard from './PostCard';
import agent from '../../app/api/agent';
import LoadingComponent from '../../app/layout/LoadingComponent';

const Posts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    agent.Post.list()
      .then(posts => setPosts(posts))
      .catch(error => console.log(error))
      .finally(() => setLoading(false))
  }, [])
  if(loading ) return <LoadingComponent message='loading posts...'/>
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