import React, { useState } from 'react';
import { MyInput } from './UI/input/MyInput';
import { MyButton } from './UI/button/MyButton';
import { nanoid } from 'nanoid';

export const PostForm = ({create}) => {
  const [post, setPost] = useState({title: '', body: ''});

  const addNewPost = (e) => {
    e.preventDefault();

    const newPost = {
      ...post,
      id: nanoid()
    };

    create(newPost);
    setPost({title: '', body: ''});
  };

  return (
    <form>
      <MyInput
        type="text"
        placeholder='Post title'
        value={post.title}
        onChange={e => setPost({...post, title: e.target.value})}
      />
      <MyInput
        type="text"
        placeholder='Post description'
        value={post.body}
        onChange={e => setPost({...post, body: e.target.value})}
      />
      <MyButton
        onClick={addNewPost}
        disabled={(post.title.length && post.body.length) ? false : true}
      >
        Create post
      </MyButton>
    </form>
  )
}
