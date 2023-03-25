import React, { useEffect, useState } from 'react'
import { Post } from '../../app/models/Post'
import { Grid } from '@mui/material';

const Catalog = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    fetch('http://localhost:5099/api/Post')
      .then(res => res.json())
      .then(data => setPosts(data))
    
    // .then(res=>res.json()) vì đây là 1 readable stream nên cần phải chuyển sang dạng Promise, res.json() là 1 trong số những hàm đó


  }, [])
  return (
    <div>
      <Grid container spacing={4}>
        {posts.map(post => (
          <Grid item xs={3} key={post.id}>
              {post.description}
            </Grid>
          ))}
      </Grid>
    </div>
  )
}

export default Catalog