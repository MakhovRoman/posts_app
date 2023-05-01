import React, { useEffect, useRef, useState } from 'react';
import { PostList } from 'components/PostList';
import { PostForm } from 'components/PostForm';
import { PostFilter } from 'components/PostFilter';
import { MyModal } from 'components/UI/MyModal/MyModal';
import { MyButton } from 'components/UI/button/MyButton';
import { usePosts } from 'hooks/usePosts';
import PostService from 'API/PostService';
import { Loader } from 'components/UI/Loader/Loader';
import { useFetching } from 'hooks/useFetching';
import { getPageCount } from 'utils/pages';
import { Pagination } from 'components/UI/pagination/Pagination';
import { useObserver } from 'hooks/useObserver';
import { MySelect } from 'components/UI/select/MySelect'

export const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({sort: '', query: ''});
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const lastElement = useRef();

  const [fetchPosts, isPostLoading, postError] = useFetching(async (limit, page) => {
    const response = await PostService.getAll(limit, page);
    setPosts([...posts, ...response.data]);
    const totalCount = response.headers['x-total-count'];
    setTotalPages(getPageCount(totalCount, limit));
  })

  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

  useObserver(lastElement, page < totalPages, isPostLoading, () => setPage(page + 1));

  useEffect(() => {
    fetchPosts(limit, page);
  }, [page, limit])

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  const changePage = (page) => {
    setPage(page);
  }

  return (
    <div className="App">
      <MyButton
        style={{marginTop: 30}}
        onClick={() => setModal(true)}
      >
        Open Modal Window
      </MyButton>
      <MyModal
        visible={modal}
        setVisible={setModal}
      >
        <PostForm create={createPost}/>
      </MyModal>
      <hr style={{margin: '15px'}} />
      <PostFilter
        filter={filter}
        setFilter={setFilter}
      />
      <MySelect
        value={limit}
        onChange={value => setLimit(value)}
        defaultValue='Elements on page'
        options={[
          {value: 5, name: '5'},
          {value: 10, name: '10'},
          {value: 15, name: '15'},
          {value: 20, name: '20'},
          {value: 25, name: '25'},
          {value: -1, name: 'show all'}
        ]}
      />
      {postError &&
        <h1>Error {postError}</h1>
      }
      <PostList
        posts={sortedAndSearchedPosts}
        remove={removePost}
        title='Posts about JS'
      />
      <div ref={lastElement} style={{height: 20, backgroundColor: 'red'}}></div>
            {isPostLoading &&
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 50
          }}
        >
          <Loader />
        </div>
      }
      <Pagination
        page={page}
        changePage={changePage}
        totalPages={totalPages}
      />
    </div>
  )
}
