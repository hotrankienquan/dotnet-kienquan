import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PostImage from "../../components/post/PostImage";
import PostMeta from "../../components/post/PostMeta";
import AuthorBox from "../../components/author/AuthorBox";
import axios from "axios";
import { Post } from "../../app/models/Post";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import NotFound from "../../app/errors/NotFound";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchPostAsync, postsSelector } from "./postSlice";
const PostDetailsPageStyles = styled.div`
  padding-bottom: 100px;
  .post {
    &-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 40px;
      margin: 40px 0;
    }
    &-feature {
      width: 100%;
      max-width: 640px;
      height: 466px;
      border-radius: 20px;
    }
    &-heading {
      font-weight: bold;
      font-size: 36px;
      margin-bottom: 16px;
    }
    &-info {
      flex: 1;
    }
    &-content {
      max-width: 700px;
      margin: 80px auto;
    }
  }
  .author {
    margin-top: 40px;
    margin-bottom: 80px;
    display: flex;
    border-radius: 20px;
    background-color: ${(props) => props.theme.grayF3};
    &-image {
      width: 200px;
      height: 200px;
      flex-shrink: 0;
      border-radius: inherit;
    }
    &-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: inherit;
    }
    &-content {
      flex: 1;
      padding: 20px;
    }
    &-name {
      font-weight: bold;
      margin-bottom: 10px;
      font-size: 20px;
    }
    &-desc {
      font-size: 14px;
      line-height: 2;
    }
  }
  @media screen and (max-width: 1023.98px) {
    padding-bottom: 40px;
    .post {
      &-header {
        flex-direction: column;
      }
      &-feature {
        height: auto;
      }
      &-heading {
        font-size: 26px;
      }
      &-content {
        margin: 40px 0;
      }
    }
    .author {
      flex-direction: column;
      &-image {
        width: 100%;
        height: auto;
      }
    }
  }
`;

const PostDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch()
  const post = useAppSelector(state => postsSelector.selectById(state, id!))
  
  const {status} = useAppSelector(state => state.post)
  
  useEffect(() => {
    if (!post && id) {
      dispatch(fetchPostAsync(parseInt(id)));
    }
  }, [id, post,dispatch])

   
  useEffect(() => {
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [post]);
  if (status.includes('pending')) return <LoadingComponent message="loading post..."/>

  if (!post) return <NotFound />
  return (
    <PostDetailsPageStyles>
        <div className="container">
          <div className="post-header">
            <PostImage
              url={post.pictureUrl || ""}
              className="post-feature"
            ></PostImage>
            <div className="post-info">
              
            <h1 className="post-heading">{post.title || ""}</h1>
              <PostMeta></PostMeta>
              {/* Check if user role is ADMIN then can edit the post */}
              {/* {userInfo?.role === userRole.ADMIN && (
                <Link
                  to={`/manage/update-post?id=${postInfo.id}`}
                  className="inline-block px-4 py-2 mt-5 text-sm border border-gray-400 rounded-md"
                >
                  Edit post
                </Link>
              )} */}
            </div>
          </div>
          <div className="post-content">
            <div
              className="entry-content"
              // Prevent XSS Attack recommend from React Docs
              dangerouslySetInnerHTML={{
                __html: post?.content || "",
              }}
            ></div>
            <AuthorBox userId={""}></AuthorBox>
          </div>
        </div>
    </PostDetailsPageStyles>
  );
};

export default PostDetailsPage;