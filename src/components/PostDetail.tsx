import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { getPost } from '../constants/queries';
import fieldKeys from '../constants/fieldKeys';

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
      variables: { id } 
    });
    

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!data || !data.post) return <NotFoundMessage />;

  const { post }: PostData = data;
  const coverImage: Field | undefined = post?.fields?.find((field: Field) => field.key === fieldKeys.COVER_IMAGE);
  const imageUrl: string | undefined = coverImage?.relationEntities?.medias?.[0]?.urls?.full;

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      {imageUrl && <img className="w-full h-64 object-cover rounded-lg mb-3" src={imageUrl} alt={post.title} />}
      <h1 className="text-3xl font-bold mb-3">{post.title}</h1>
      <p className="text-gray-700">{post.description}</p>
    </div>
  );
};

const Loader: React.FC = () => (
  <div className="flex justify-center items-center h-40">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

const ErrorMessage: React.FC<{ message: string }> = ({ message }) => (
  <div className="text-red-500 text-center p-4">Error: {message}</div>
);

const NotFoundMessage: React.FC = () => (
  <div className="text-gray-500 text-center p-4">Post not found.</div>
);

export default PostDetail;