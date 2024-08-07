import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Post } from './PostsComponent';
import { addReaction, removeReaction, getPosts } from '../constants/queries';
import { useMutation, useApolloClient } from '@apollo/client';

interface PostListProps {
  posts: Post[];
  totalPages: number;
  currentPage: number;
  loadPage: (page: number) => void;
}

interface Reaction {
  count: number;
  reaction: string;
}

type AddReactionVariables = {
  input: { reaction: string };
  postId: string;
};

type RemoveReactionVariables = {
  reaction: string;
  postId: string;
};

type ReactionMutationResult = {
  success: boolean;
};

export const PostList: React.FC<PostListProps> = ({
  posts = [],
  totalPages,
  currentPage = 1,
  loadPage = () => {},
}) => {
  const client = useApolloClient();

  const [addReactionMutation] = useMutation<
    ReactionMutationResult,
    AddReactionVariables
  >(addReaction);
  const [removeReactionMutation] = useMutation<
    ReactionMutationResult,
    RemoveReactionVariables
  >(removeReaction);

  const [activeReactions, setActiveReactions] = useState<{
    [key: string]: boolean;
  }>({});

  const handleClick = async (
    id: string,
    reactions: Reaction[],
  ): Promise<void> => {
    try {
      const hasActiveReaction = reactions.some((r) => r.count > 0);

      // remove the reaction
      if (hasActiveReaction) {
        await removeReactionMutation({
          variables: { reaction: '+1', postId: id },
        });

        //update state for the thumbs-down icon
        setActiveReactions((prev) => ({ ...prev, [id]: true }));

        // of no existing reaction, add the reaction
      } else {
        await addReactionMutation({
          variables: { input: { reaction: '+1' }, postId: id },
        });
        //update state for the thumbs-up icon
        setActiveReactions((prev) => ({ ...prev, [id]: false }));
      }

      // update the UI by refetching the posts
      await client.refetchQueries({
        include: [getPosts],
      });
    } catch (err) {
      console.error('Error handling reaction:', err);
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row sm:flex-wrap sm:justify-between gap-4 mb-8">
        {posts?.map(({ title, description, id, reactions }: Post) => (
          <div
            key={id}
            className="flex-1 flex-shrink-0 sm:basis-1/3 bg-gray-800 rounded-lg shadow-md overflow-hidden p-4"
          >
            <h2 className="text-xl font-bold text-white mb-2">{title}</h2>
            <p className="text-gray-300 text-sm mb-4">{description}</p>
            <Link
              to={`/post/${id}`}
              className="inline-block bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-600 transition-colors"
            >
              Read more
            </Link>
            <button
              data-testid={`reaction-button-${id}`}
              aria-label="Like"
              className="shrink-0 w-full h-full hover:cursor-pointer rounded-md"
              style={{
                backgroundImage:
                  'url(https://podders-uccbycyx.bettermode.io/icons/line/thumbs-up.svg)',
                backgroundSize: 'cover',
                backgroundColor: 'white',
                display: 'block',
                width: '50px',
                height: '50px',
                transform: 'rotate(0deg)',
                transition: 'transform 0.3s ease-in-out',
              }}
            />
            {reactions?.map(({ count, reaction }) => (
              <span key={reaction}>{count}</span>
            ))}
          </div>
        ))}
      </div>
      {/* Pagination */}
      <div className="flex flex-wrap justify-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1)?.map((number) => (
          <button
            key={number}
            onClick={() => loadPage(number)}
            className={`px-3 py-1 border rounded-md text-sm font-medium transition-colors
              ${
                currentPage === number
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'bg-white text-blue-500 border-blue-500 hover:bg-blue-100'
              }`}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PostList;
