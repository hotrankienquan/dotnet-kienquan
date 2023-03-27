import React, { useState } from 'react'
import usePosts from '../../app/hooks/usePosts';
import { Edit, Delete } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Box, Typography, Button, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import agent from '../../app/api/agent';
import { useAppDispatch } from '../../app/store/configureStore';
import AppPagination from '../../components/AppPagination';
import { removePost, setPageNumber } from '../post/postSlice';
import { Post } from '../../app/models/Post';
import PostForm from './PostForm';

const AdminPage = () => {
  const {posts, metaData} = usePosts();
  const dispatch = useAppDispatch();
  const [editMode, setEditMode] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [target, setTarget] = useState(0);

  function handleSelectPost(post: Post) {
      setSelectedPost(post);
      setEditMode(true);
  }

  function handleDeletePost(id: number) {
      setLoading(true);
      setTarget(id)
      agent.Admin.deletePost(id)
          .then(() => dispatch(removePost(id)))
          .catch(error => console.log(error))
          .finally(() => setLoading(false))
  }

  function cancelEdit() {
      if (selectedPost) setSelectedPost(undefined);
      setEditMode(false);
  }

  if (editMode) return <PostForm post={selectedPost} cancelEdit={cancelEdit} />

  return (
      <>
          <Box display='flex' justifyContent='space-between'>
              <Typography sx={{ p: 2 }} variant='h4'>Inventory</Typography>
              <Button onClick={() => setEditMode(true)} sx={{ m: 2 }} size='large' variant='contained'>Create</Button>
          </Box>
          <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                      <TableRow>
                          <TableCell>#</TableCell>
                          <TableCell align="left">Product</TableCell>
                          <TableCell align="right">Price</TableCell>
                          <TableCell align="center">Type</TableCell>
                          <TableCell align="center">Brand</TableCell>
                          <TableCell align="center">Quantity</TableCell>
                          <TableCell align="right"></TableCell>
                      </TableRow>
                  </TableHead>
                  <TableBody>
                      {posts.map((post: Post) => (
                          <TableRow
                              key={post.id}
                              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                              <TableCell component="th" scope="row">
                                  {post.id}
                              </TableCell>
                              <TableCell align="left">
                                  <Box display='flex' alignItems='center'>
                                      <img src={post.pictureUrl} alt={post.title} style={{ height: 50, marginRight: 20 }} />
                                      <span>{post.title}</span>
                                  </Box>
                              </TableCell>
                              <TableCell align="right">
                                  <Button onClick={() => handleSelectPost(post)} startIcon={<Edit />} />
                                  <LoadingButton 
                                      loading={loading && target === post.id} 
                                      onClick={() => handleDeletePost(post.id)} 
                                      startIcon={<Delete />} color='error' />
                              </TableCell>
                          </TableRow>
                      ))}
                  </TableBody>
              </Table>
          </TableContainer>
          {metaData && 
              <Box sx={{pt: 2}}>
                  <AppPagination 
                      metaData={metaData} 
                      onPageChange={(page: number) => dispatch(setPageNumber({pageNumber: page}))} />
              </Box>
          }
      </>
  )
}

export default AdminPage