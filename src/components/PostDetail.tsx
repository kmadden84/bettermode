import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { getPost } from '../constants/queries';
import fieldKeys from '../constants/fieldKeys';
import { Loader } from './common/Loader';
import { ErrorMessage } from './common/ErrorMessage';
import { NoPostsMessage } from './common/NoPostMessage';

interface Field {
  key: string;
  relationEntities?: {
    medias?: Array<{
      urls?: {
        full?: string;
      };
    }>;
  };
}

interface Post {
  title: string;
  description: string;
  fields?: Field[];
}

interface PostData {
  post: Post;
}

const PostDetail: React.FC = () => {
  const { id = '' } = useParams<{ id: string }>();
  const { data, loading, error } = useQuery<PostData, { id: string }>(getPost, {
    variables: { id },
  });

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!data || !data.post) return <NoPostsMessage />;

  const { post }: PostData = data;
  const coverImage: Field | undefined = post?.fields?.find(
    (field: Field) => field?.key === fieldKeys.COVER_IMAGE,
  );
  const imageUrl: string | undefined =
    coverImage?.relationEntities?.medias?.[0]?.urls?.full;

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      {imageUrl && (
        <img
          className="w-full h-64 object-cover rounded-lg mb-3"
          src={imageUrl}
          alt={post?.title}
        />
      )}
      <h1 className="text-3xl font-bold mb-3">{post?.title}</h1>
      <p className="text-gray-700">{post?.description}</p>
    </div>
  );
};

export default PostDetail;
