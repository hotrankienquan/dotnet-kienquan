import React, { useEffect, useState } from 'react'
import { Post } from '../../app/models/Post'
import { Grid } from '@mui/material';
import PostCard from './PostCard';

const Posts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    fetch('http://localhost:5099/api/Post')
      .then(res => res.json())
      .then(data => setPosts(data))
    
    // .then(res=>res.json()) vì đây là 1 readable stream nên cần phải chuyển sang dạng Promise, res.json() là 1 trong số những hàm đó


  }, [])
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