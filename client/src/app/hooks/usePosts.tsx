import { useEffect } from "react";

import { useAppSelector, useAppDispatch } from "../store/configureStore";
import { postsSelector } from "../../features/post/postSlice";
import { fetchPostsAsync } from './../../features/post/postSlice';

export default function usePosts() {
    const posts = useAppSelector(postsSelector.selectAll);
    const { postsLoaded, metaData} = useAppSelector(state => state.post);
    const dispatch = useAppDispatch();

  useEffect(() => {
    if (!postsLoaded) dispatch(fetchPostsAsync());
  }, [postsLoaded, dispatch]);


    return {
      posts,
      postsLoaded,
      metaData
    }
}