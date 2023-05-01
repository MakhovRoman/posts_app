import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFetching } from '../hooks/useFetching';
import PostService from '../API/PostService';
import { Loader } from '../components/UI/Loader/Loader'
import { nanoid } from 'nanoid';

export const PostIdPage = () => {
  const params = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);

  const [fetchPostById, isLoading, error] = useFetching(async(id) => {
    const response = await PostService.getById(id);
    setPost(response.data);
  });
  const [fetchComments, isCommentsLoading, commentsError] = useFetching(async(id) => {
    const response = await PostService.getCommentsByPostId(id);
    setComments(response.data);
  });

  useEffect(() => {
    fetchPostById(params.id);
    fetchComments(params.id);
  }, [])

  return (
    <div>
      <h1>You open the post's page ID = {params.id}</h1>
      {isLoading
        ? <Loader />
        : <div>{post.id}. {post.title}</div>
      }
      <h1>Comments</h1>
      {isCommentsLoading
        ? <Loader />
        : <div>
          {comments.map(com =>
            <div style={{marginTop: 15}} key={nanoid()}>
              <h5>{com.email}</h5>
              <div>{com.body}</div>
            </div>
          )}
        </div>
      }
    </div>
  )
}
