import { useState, useEffect, useRef, useCallback } from 'react';
import { useQuery, QueryResult } from '@apollo/client';
import { getPosts } from '../constants/queries.ts';
import { PostList } from './PostList';
import { Loader } from './common/Loader';
import { ErrorMessage } from './common/ErrorMessage';
import { NoPostsMessage } from './common/NoPostMessage';

export interface Post {
  id: string;
  title: string;
  description: string;
  image: string;
  reactions: {
    count: number;
    reaction: string;
  }[];
}

interface PostsData {
  posts: {
    nodes: Post[];
    totalCount: number;
  };
}

export interface PostsVariables {
  limit: number;
  offset: number;
}

export const PostsComponent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const postsPerPage: number = 3;
  const previousPageRef = useRef<number>(1);

  const {
    data,
    loading,
    error,
    fetchMore,
  }: QueryResult<PostsData, PostsVariables> = useQuery(getPosts, {
    variables: { limit: currentPage * postsPerPage, offset: 0 },
  });

  const { posts: { nodes: posts = [] } = {} } = data ?? {};

  useEffect(() => {
    if (currentPage !== previousPageRef.current) {
      const newLimit = currentPage * postsPerPage;
      const newOffset = (currentPage - 1) * postsPerPage;
      fetchMore({
        variables: { limit: newLimit, offset: newOffset },
        updateQuery: (prev: PostsData, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return fetchMoreResult;
        },
      });
      previousPageRef.current = currentPage;
    }
  }, [currentPage, fetchMore]);

  const { totalCount = 0 } = data?.posts || { totalCount: 0 };

  const totalPages: number = Math.ceil(totalCount / postsPerPage);

  const loadPage = useCallback(
    (pageNumber: number): void => {
      setCurrentPage(pageNumber);
    },
    [setCurrentPage],
  );
  if (loading && !data) return <Loader />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!posts || posts.length === 0) return <NoPostsMessage />;

  const indexOfLastPost: number = currentPage * postsPerPage;
  const indexOfFirstPost: number = indexOfLastPost - postsPerPage;
  const currentPosts: Post[] = posts?.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <PostList
      posts={currentPosts}
      totalPages={totalPages}
      currentPage={currentPage}
      loadPage={loadPage}
    />
  );
};

export default PostsComponent;
