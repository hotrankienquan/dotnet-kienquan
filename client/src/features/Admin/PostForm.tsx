import { FieldValues, useForm } from "react-hook-form";
import { Post } from "../../app/models/Post";
import { validationSchema } from "./postValidation";
import {yupResolver} from '@hookform/resolvers/yup'
import { useAppDispatch } from "../../app/store/configureStore";
import { useEffect, useMemo, useState } from "react";
import agent from "../../app/api/agent";
import { setPost } from "../post/postSlice";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import types from "@emotion/styled";
import { LoadingButton } from "@mui/lab";
import AppDropzone from "../../components/AppDropzone";
import AppSelectList from "../../components/AppSelectList";
import AppTextInput from "../../components/AppTextInput";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
interface Props {
  post?: Post;
  cancelEdit: () => void;
}
export default function PostForm({ post, cancelEdit }: Props) {
  const { control, reset, handleSubmit, watch, formState: { isDirty, isSubmitting }} = useForm();
  const watchFile = watch('file', null);
  const dispatch = useAppDispatch();
  const [content, setContent] = useState("");
  useEffect(() => {
    if (post && !watchFile && !isDirty) reset(post);
    return () => {
        if (watchFile) URL.revokeObjectURL(watchFile.preview);
    }
}, [post,reset, watchFile, isDirty])
    
    async function handleSubmitData(data: FieldValues) {
      console.log(content)
        console.log(data, "dong 32")
        data["content"] = content;
      try {
          let response: Post;
          if (post) {
              response = await agent.Admin.updatePost(data);
          }
          else {
              response = await agent.Admin.createPost(data);
          }
            dispatch(setPost(response));
            cancelEdit();
      } catch (error: any) {
          console.log(error || "");
      }
  }
  const modules = useMemo(
    () => ({
      toolbar: [
        ["bold", "italic", "underline", "strike"],
        ["blockquote"],
        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: "ordered" }, { list: "bullet" }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["link", "image"],
      ],
    //   imageUploader: {
    //     // imgbbAPI
    //     upload: async (file: string | Blob) => {
    //       const bodyFormData = new FormData();
    //       bodyFormData.append("image", file);
    //       const response = await axios({
    //         method: "post",
    //         url: imgbbAPI,
    //         data: bodyFormData,
    //         headers: {
    //           "Content-Type": "multipart/form-data",
    //         },
    //       });
    //       return response.data.data.url;
    //     },
    //   },
    }),
    []
    );
  return (
      <Box component={Paper} sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
              Post Details
          </Typography>
          <form onSubmit={handleSubmit(handleSubmitData)}>
              <Grid container spacing={3}>
                  <Grid item xs={12} sm={12}>
                      <AppTextInput control={control} name='title' label='Title' />
                  </Grid>
                 
                  <Grid item xs={12} sm={6}>
                      <AppTextInput type='number' control={control} name='status' label='Status' />
                  </Grid>
                  <Grid item xs={12}>
                      {/* <AppTextInput control={control} multiline={true} rows={4} name='content' label='Content' /> */}
                      <ReactQuill
                            modules={modules}
                            theme="snow"
                            value={content}
                            onChange={setContent}
                        />
                  </Grid>
                  <Grid item xs={12}>
                      <Box display='flex' justifyContent='space-between' alignItems='center'>
                          <AppDropzone control={control} name='file' />
                          {watchFile ? (
                              <img src={watchFile.preview} alt="preview" style={{ maxHeight: 200 }} />
                          ) : (
                              <img src={post?.pictureUrl} alt={post?.title} style={{ maxHeight: 200 }} />
                          )}
                      </Box>

                  </Grid>
              </Grid>
              <Box display='flex' justifyContent='space-between' sx={{ mt: 3 }}>
                  <Button onClick={cancelEdit} variant='contained' color='inherit'>Cancel</Button>
                  <LoadingButton loading={isSubmitting} type='submit' variant='contained' color='success'>Submit</LoadingButton>
              </Box>
          </form>
      </Box>
  )
}

